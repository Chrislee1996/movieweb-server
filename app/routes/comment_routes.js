// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Topic = require('../models/topic')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.post('/comments/:topicId', (req, res, next) => {
    const comment = req.body.comment
    const topicId = req.params.topicId
    Topic.findById(topicId)
        .then(handle404)
            .then((topic) => {
                topic.comments.push(comment)
                return topic.save()
            })
            .then(topic => res.status(201).json({ topic: topic }))
            // catch errors and send to the handler
            .catch(next)
    })

router.patch('/comments/:topicId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    const commentId = req.params.commentId
    const topicId = req.params.topicId
    Topic.findById(topicId)
        .then(handle404)
        .then(topic => {
            const theComment = topic.comments.id(commentId)
            // requireOwnership(req, course)
            theComment.set(req.body.comment)

            return topic.save()
        })
            .then(() => res.sendStatus(204))
            .catch(next)
        
    })

router.delete('/comments/:topicId/:commentId', requireToken, (req, res, next) => {
    // saving both ids to variables for easy ref later
    const commentId = req.params.commentId
    const topicId = req.params.topicId
    // find the product in the db
    Topic.findById(topicId)
        // if product not found throw 404
        .then(handle404)
        .then(topic => {
            // get the specific subdocument by its id
            const theComment = topic.comments.id(commentId)
            // requireOwnership(req, course)
            // call remove on the review we got on the line above requireOwnership
            theComment.remove()
            // return the saved product
            return topic.save()
        })
        // send 204 no content
        .then(() => res.sendStatus(204))
        .catch(next)

    })

module.exports = router
