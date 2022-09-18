const client = require('../db.js')

async function getVotes(sessionId) {
    const resp = await client.query(`
        select
            vote_id as voteid,
            session_id as sessionid,
            user_id as userid,
            vote_value as votevalue
        from votes
        where session_id = $1
    `, [sessionId])
    if (resp.rows.length > 0) return resp.rows
    return undefined
}

async function getVote(sessionId, userId) {
    const resp = await client.query(`
        select
            vote_id as voteid,
            session_id as sessionid,
            user_id as userid,
            vote_value as votevalue
        from votes
        where session_id = $1
        and user_id = $2
    `, [sessionId, userId])
    if (resp.rows.length > 0) return resp.rows
    return undefined  
}

async function vote(voteId, sessionId, userId, voteValue) {
    const resp = await client.query(`
        insert into votes (vote_id, session_id, user_id, vote_value)
        values ($1, $2, $3, $4)
    `, [voteId, sessionId, userId, voteValue])
    return resp
}

async function updateVote(sessionId, userId, newVoteValue) {
    const resp = await client.query(`
        update votes
        set vote_value = $3
        where session_id = $1 and user_id = $2
    `, [sessionId, userId, newVoteValue])
    if (resp.rows.length > 0) return resp
    return new Error('Vote to update not found')
}

async function updateOrCreateVote(sessionId, voteId, userId, voteValue) {
    let resp
    if (await getVote(sessionId, userId) === undefined) {
        resp = await vote(voteId, sessionId, userId, voteValue)
    } else {
        resp = await updateVote(sessionId, userId, voteValue)
    }
    return resp
}   

async function deleteVote(voteId) {
    const resp = await client.query(`
        delete from votes
        where vote_id = $1
    `, [voteId])
    return resp
}

async function deleteVotes(sessionId) {
    const resp = await client.query(`
        delete from votes
        where session_id = $1
    `, [sessionId])
    return resp
}

module.exports = { getVotes, vote, updateOrCreateVote, deleteVote, deleteVotes }