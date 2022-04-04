const client = require('../db.js')

async function createUser(userId, username) {
    let resp = await client.query(`
        insert into users (user_id, username)
        values ($1, $2)
    `, [userId, username])
    return resp
}

async function deleteUser(userId) {
    let resp = await client.query(`
        delete from users
        where user_id = $1
    `, [userId])
    return resp
}