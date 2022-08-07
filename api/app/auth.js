const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(403).json({message: 'Access Token is expired'})
        }
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    if (typeof user !== 'object') return console.error('Payload for generating Access token must be an object')
    const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*60*60 })
    console.log(accessToken)
    return accessToken
}

module.exports = { authenticateToken, generateAccessToken }