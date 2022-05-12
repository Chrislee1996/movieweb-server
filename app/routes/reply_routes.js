// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Topic = require('../models/topic')
const Comment = require('../models/comment')

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

router.post('/replies/:topicId/:commentId', (req, res, next) => {
    const reply = req.body.reply
    const topicId = req.params.topicId
    const commentId = req.params.commentId
    // const commentId = req.params.commentId
    Topic.findById(topicId)
        .then(handle404)
            .then((topic) => {
                // console.log(topic.comments.id(commentId).reply,'topic reviews')
                comments = topic.comments
                topic.comments.id(commentId).reply.push(reply)
                return topic.save()
            })
            .then(topic => res.status(201).json({ topic: topic }))
            // catch errors and send to the handler
            .catch(next)
        })


router.delete('/comments/:courseId/:reviewId/:commentId', requireToken,(req, res, next) => {
    const courseId = req.params.courseId
    const reviewId = req.params.reviewId
    const commentId = req.params.commentId
    Course.findById(courseId)
        // if product not found throw 404
        .then(handle404)
        .then(course => {
            console.log(courseId, 'here is my courseId')
            const theReview = course.reviews.id(reviewId)
            console.log(theReview)
            const theComment = theReview.comments.id(commentId)
            console.log(theComment,'here is theComment on line 42')
            // requireOwnership(req, review)
            theComment.remove()
            // return the saved product
            return course.save()
        })
        // send 204 no content
        .then(() => res.sendStatus(204))    
        .catch(next)
})

module.exports = router
