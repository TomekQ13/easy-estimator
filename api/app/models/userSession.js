const client = require("../db.js");

async function getUsersInSession(sessionId) {
    const resp = await client.query(
        `
        select
            us.user_id,
            u.username
        from user_session us
        left join user u
        on u.user_id = us.user_id
        where session_id = $1
    `,
        [sessionId]
    );
    if (resp.rows.length > 0) return resp.rows;
    return [];
}

async function addUserSession(userId, sessionId) {
    const resp = await client.query(
        `
        insert into user_session (session_id, user_id)
        values ($1, $2)

    `,
        [sessionId, userId]
    );
}

async function deleteUserSession(userId, sessionId) {
    const resp = await client.query(
        `
        delete from user_session (session_id, user_id)
        where session_id = $1 and user_id = $2    
    
    `,
        [sessionId, userId]
    );
}

module.exports = { getUsersInSession, addUserSession, deleteUserSession };
