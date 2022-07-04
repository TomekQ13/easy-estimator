import { makeApiCallFunction } from '../apiAccess/makeCall'

export async function getSession(sessionId) { 
    const resp = await makeApiCallFunction({ method: 'GET', url: `/session/${sessionId}`})()
    if (resp === undefined) return 
    const data = await resp.json()
    return data
}

export async function createSession(sessionId, sessionPassword, params) {
    const resp = makeApiCallFunction({
        method: 'POST',
        url: `/session/${sessionId}`,
        body: {
            hostId: 'test',
            sessionPassword: sessionPassword,
            params: params
        }
    })()
    return resp
}