const client = require('../db.js')
const { uuid } = require('uuidv4');

async function getVotes(sessionId) {
    await client.query(`
        select vote_id, session_id, user_id, vote_value
        from votes
        where session_id = $1
    `, [sessionId])
}

async function vote(sessionId, userId, voteValue) {
    await client.query(`
        insert into votes (vote_id, session_id, user_id, vote_value)
        values ($1, $2, $3)
    `, [uuid(), sessionId, userId, voteValue])
}

module.exports = {getVotes, vote}