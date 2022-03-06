const client = require('../db.js')

async function getVotes(sessionId) {
    await client.query(`
        select vote_id, session_id, user_id, vote_value
        from votes
        where session_id = $1
    `, [sessionId])
}

