const client = require('../db.js')

async function getVotes(sessionId) {
    let resp = await client.query(`
        select vote_id, session_id, user_id, vote_value
        from votes
        where session_id = $1
    `, [sessionId])
    if (resp.rows.length > 0) return resp.rows
    return undefined
}

async function vote(sessionId, voteId, userId, voteValue) {
    let resp = await client.query(`
        insert into votes (vote_id, session_id, user_id, vote_value)
        values ($1, $2, $3, $4)
    `, [voteId, sessionId, userId, voteValue])
    return resp
}

async function updateVote(sessionId, voteId, userId, voteValue) {
    let resp = await client.query(`
        update votes
        set vote_value = $4
        where session_id = $1
            and vote_id = $2
            and user_id = $3
    `, [sessionId, voteId, userId, voteValue])
    return resp
}

async function deleteVote(voteId) {
    let resp = await client.query(`
        delete from votes
        where vote_id = $1
    `, [voteId])
    return resp
}

module.exports = { getVotes, vote, updateVote, deleteVote }