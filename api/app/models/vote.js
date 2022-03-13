const client = require('../db.js')

async function getVotes(sessionId) {
    let resp = await client.query(`
        select vote_id, session_id, user_id, vote_value
        from votes
        where session_id = $1
    `, [sessionId])
    if (resp.rows) return resp.rows
    return undefined
}

async function vote(sessionId, voteId, userId, voteValue) {
    await client.query(`
        insert into votes (vote_id, session_id, user_id, vote_value)
        values ($1, $2, $3)
    `, [voteId, sessionId, userId, voteValue])
}

async function updateVote(sessionId, voteId, userId, voteValue) {
    await client.query(`
        update votes
        set vote_value = $4
        where sessionId = $1, voteId = $2, userId = $3
    `, [sessionId, voteId, userId, voteValue])
}

module.exports = { getVotes, vote, updateVote }