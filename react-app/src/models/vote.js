import { makeApiCallFunction } from '../apiAccess/makeCall'

export async function getVotes({ sessionId, accessToken, refreshToken, setAccessTokenFunction }) { 
    const resp = await makeApiCallFunction({
        method: 'GET',
        url: `/vote/${sessionId}`,
        accessToken,
        refreshToken,
        setAccessTokenFunction
    })()
    if (resp.status === 404) return []
    const data = await resp.json()
    return data
}