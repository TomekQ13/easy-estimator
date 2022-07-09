import React, { useContext } from 'react'
import uuid from 'react-uuid'
import { SessionContext } from './Session'
import { authContext } from '../contexts/Auth'
import { makeApiCallFunction } from '../apiAccess/makeCall'

export default function VoteButton({voteValue}) {
    const { sessionData } = useContext(SessionContext)
    const { accessToken, refreshToken, setAccessToken } = useContext(authContext)
    
    function handleClick() {
        vote()
    }

    async function vote() {
        const voteFunction = makeApiCallFunction({
            url: `/vote/${sessionData.sessionid}`,
            method: 'POST',
            body: {
                sessionId: sessionData.sessionid,
                voteId: uuid(),
                userId: 'testUser',
                voteValue: voteValue
            },
            accessToken: accessToken,
            refreshToken: refreshToken,
            setAccessTokenFunction: setAccessToken
        })
        const resp = await voteFunction()
        const voteResponseData = await resp.json()
        
        return voteResponseData
    }

    return (
        <button onClick={handleClick}>
            {voteValue}
        </button>
    )
}
