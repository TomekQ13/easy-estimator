const client = require('../db.js')

async function getRefreshTokens() {
    let resp
    try {
        resp = await client.query(`
        select token
        from refresh_tokens
        where valid = true
    `)
    } catch (e) {
        console.error(e)
        throw new Error('There was an error while fetching refresh tokens')
    }

    if (resp.rows.length === 0) return null
    return resp.rows
}

async function getRefreshToken(token) {
    let resp
    try {
        resp = await client.query(`
            select user_id
            from refresh_tokens
            where valid = true and token = $1
        `, [token])
    } catch (e) {
        console.error(e)
        throw new Error('There was na error while fetching the refresh token')
    }
    if (resp.rows.length === 0) return null
    return resp.rows[0]
}

async function addRefreshToken(token, userId) {
    if (token === undefined && typeof token !== 'string') {
        return console.error('Token must be provided to addRefreshToken') 
    }
    try {
        const resp = await client.query(`
        insert into refresh_tokens (token, user_id)
        values ($1, $2)
    `, [token, userId])
    } catch (e) {
        console.error(e)
        throw new Error('There was an error while adding refresh token to the db')
    }
}

module.exports = { getRefreshTokens, addRefreshToken, getRefreshToken }