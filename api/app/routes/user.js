const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { createUser, deleteUser } = require('../models/user')

router.post('/register', async (req, res) => {
    try {
        await createUser(req.body.userId, req.body.username)
    } catch (e) {
        console.error(e)
        // res.status(500).json({message: 'There has been an error. Please try again.'})
    }
    const user = {
        username: req.body.username,
        userId: req.body.userId
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    return res.status(201).json({
        message: `User registered with id ${req.body.userId} and username ${req.body.username}`,
        accessToken: accessToken
    })
})

router.delete('/delete', async (req, res) => {
    try {
        await deleteUser(req.body.userId)
    } catch (e) {
        console.error(e)
        
    }
})

// router.post('login', (req, res) => {
//     // Authenticate the user
//     const userId = 'dummyId' // this should come from db

//     const user = {
//         username: req.body.username,
//         userId: userId
//     }

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({ accessToken: accessToken })

// })

module.exports = router