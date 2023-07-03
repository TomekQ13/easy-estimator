const client = require("../db.js");

async function getUsersInSession(sessionId) {
    const resp = await client.query(
        `
        select
            us.user_id as userid,
            u.username,
            us.vote_value as votevalue
        from user_session us
        left join users u
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
        on conflict do nothing

    `,
        [sessionId, userId]
    );
    return resp;
}

async function deleteUserSession(userId, sessionId) {
    const resp = await client.query(
        `
        delete from user_session
        where session_id = $1 and user_id = $2    
    
    `,
        [sessionId, userId]
    );
    return resp;
}

async function vote(sessionId, userId, voteValue) {
    const resp = await client.query(
        `
        update user_session
        set vote_value = $3
        where session_id = $1 and user_id = $2
    
    `,
        [sessionId, userId, voteValue]
    );
    return resp;
}

async function deleteVotesFromSession(sessionId) {
    const resp = await client.query(
        `
        update user_session
        set vote_value = null
        where session_id = $1
    
    `,
        [sessionId]
    );
}

module.exports = {
    getUsersInSession,
    addUserSession,
    deleteUserSession,
    vote,
    deleteVotesFromSession,
};
