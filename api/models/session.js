const client = require('../db.js')

async function getSession(sessionId) {
    let resp = await client.query(`
        select host_id, session_id, params
        from estimation_session
        where session_id = $1
    `, [sessionId])
    return resp.rows[0]
}

async function createNewSession(sessionId, hostId, params) {
    await client.query(`
        insert into estimation_session (host_id, session_id, params)
        values ($1, $2, $3)
        
    `, [hostId, sessionId, params])
}



module.exports = { getSession, createNewSession }