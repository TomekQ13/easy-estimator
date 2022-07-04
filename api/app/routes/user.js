const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { createUser, deleteUser, getUser } = require('../models/user')
const { addRefreshToken, getRefreshToken } = require('../models/refreshToken')
const { authenticateToken, generateAccessToken } = require('../auth')
const { v4: uuidv4 } = require('uuid');

router.post('/register', async (req, res) => {
    if (req.body.username === undefined) return res.status(400).send({ message: 'Username is missing' })
    if (await getUser(req.body.username) !== undefined) return res.status(400).send(
        { message: 'User with this username already exists' }
    )

    const userId = uuidv4()
    try {
        await createUser(userId, req.body.username)
    } catch (e) {
        console.error(e)
        return res.status(500).json({message: 'There has been an error. Please try again.'})
    }
    const user = {
        username: req.body.username,
        userId
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    
    try {
        await addRefreshToken(refreshToken, userId)
    } catch (e) {
        console.error(e)
        return res.status(500).send({ message: 'There was an error. Please try again.' })
    }

    return res.status(201).json({
        message: `User registered with id ${userId} and username ${req.body.username}`,
        accessToken: accessToken,
        refreshToken: refreshToken
    })
})



router.delete('/delete', authenticateToken, async (req, res) => {
    try {
        await deleteUser(req.body.userId)
    } catch (e) {
        console.error(e)

    }
})

router.post('login', (req, res) => {
    // There is currently no user login
    const userId = 'dummyId' // this should come from db

    const user = {
        username: req.body.username,
        userId: userId
    }

    const accessToken = generateAccessToken(user.username)
    res.json({ accessToken: accessToken })
})

router.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken === null) return res.status(403).send({ message: 'Refresh token is missing' })
    if (getRefreshToken(refreshToken) === null) res.status(401).send({ message: 'Refresh token is invalid' })
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: 'Refresh token is invalid' })
        const accessToken = generateAccessToken(user)
        res.json({ accessToken: accessToken })

    })
})

module.exports = router