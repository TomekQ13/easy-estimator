const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('register', (req, res) => {

})

router.post('login', (req, res) => {
    // Authenticate the user
    const userId = 'dummyId' // this should come from db

    const user = {
        username: req.body.username,
        userId: userId
    }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })

})

module.exports = router