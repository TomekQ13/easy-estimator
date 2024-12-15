const client = require("../db.js");

async function createUser(userId, username) {
    let resp = await client.query(
        `
        insert into users (user_id, username)
        values ($1, $2)
    `,
        [userId, username]
    );
    return resp;
}

async function getUser(userId) {
    let resp = await client.query(
        `
        select user_id, username
        from users
        where user_id = $1
    `,
        [userId]
    );
    if (resp.rows.length > 0) return resp.rows[0];
    return null;
}

async function deleteUser(userId) {
    let resp = await client.query(
        `
        delete from users
        where user_id = $1
    `,
        [userId]
    );
    return resp;
}

module.exports = { createUser, getUser, deleteUser };
