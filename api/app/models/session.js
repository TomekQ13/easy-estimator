const client = require("../db.js");
const { ParameterError } = require("../errors.js");

async function getSession(sessionId) {
    let resp = await client.query(
        `
        select
            session_id as sessionId,
            host_id as hostId,
            password,
            show_votes as ShowVotes,
            reset_voting as resetVoting,
            session_name as sessionName
        from estimation_session
        where session_id = $1
    `,
        [sessionId]
    );
    if (resp.rows.length > 0) return resp.rows[0];
    return undefined;
}

async function createNewSession(sessionId, hostId, password, params) {
    let resp = await client.query(
        `
        insert into estimation_session (session_id, host_id, password, params)
        values ($1, $2, $3, $4)        
    `,
        [sessionId, hostId, password, params]
    );
    return resp;
}

async function updateSession({ sessionId, parameter, newParameterValue }) {
    let resp;
    if (parameter === "showVotes" || parameter === "resetVoting") {
        resp = await client.query(
            `
            update estimation_session
            set ${parameter} = $2
            where session_id = $1
        `,
            [sessionId, newParameterValue]
        );
    } else {
        throw new ParameterError(
            `Specified parameter ${parameter} is not found in session or is not updateable.`
        );
    }

    return resp;
}

async function deleteSession(sessionId) {
    let resp = await client.query(
        `
        delete from estimation_session
        where session_id = $1
    `,
        [sessionId]
    );
    return resp;
}

module.exports = { getSession, createNewSession, updateSession, deleteSession };
