const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    if (typeof user !== 'object') return console.error('Payload for generating Access token must be an object')
    return jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

module.exports = { authenticateToken, generateAccessToken }