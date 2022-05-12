// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// const fetch = require('node-fetch')
const axios = require('axios')
const router = express.Router()

//Fetches all the movies currently playing
router.get('/:apiKey', (req,res,next) => {
    const apiKey = req.params.apiKey
    console.log(req.params.apiKey,'apikey')
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
    // fetch(url)
        .then((response)=>{
            res.status(201).json(response.data)
        })
        .catch(next)
})


module.exports = router
