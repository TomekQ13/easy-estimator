const client = require('../db.js')

async function getSession(sessionId) {
    let resp = await client.query(`
        select
            host_id,
            session_id,
            params as params
        from estimation_session
        where session_id = $1
    `, [sessionId])
    if (resp.rows.length > 0) return resp.rows[0]
    return undefined
}

async function createNewSession(sessionId, hostId, params) {
    let resp = await client.query(`
        insert into estimation_session (host_id, session_id, params)
        values ($1, $2, $3)        
    `, [hostId, sessionId, params])
    return resp
}

async function updateSession(sessionId, params) {
    let resp = await client.query(`
        update estimation_session
        set params = $1
        where session_id = $2
    `, [params, sessionId])
    return resp
}

async function deleteSession(sessionId) {
    let resp = await client.query(`
        delete from estimation_session
        where session_id = $1
    `, [sessionId])
    return resp
}



module.exports = { getSession, createNewSession, updateSession, deleteSession }