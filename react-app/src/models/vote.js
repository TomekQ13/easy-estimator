import { makeApiCallFunction } from '../apiAccess/makeCall'

export async function getVotes(sessionId) { 
    const resp = await makeApiCallFunction({ method: 'GET', url: `/vote/${sessionId}`})()
    if (resp.status === 404) return []
    const data = await resp.json()
    return data
}