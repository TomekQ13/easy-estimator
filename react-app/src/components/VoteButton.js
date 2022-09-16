import React, { useContext } from 'react'
import uuid from 'react-uuid'
import { SessionContext } from './Session'
import { authContext } from '../contexts/Auth'
import { makeApiCallFunction } from '../apiAccess/makeCall'

export default function VoteButton({voteValue, votes, setVotes}) {
    const { sessionData } = useContext(SessionContext)
    const { username, accessToken, refreshToken, setAccessToken } = useContext(authContext)
    
    function handleClick() {
        const voteBody = {
            sessionId: sessionData.sessionid,
            voteId: uuid(),
            userId: username,
            voteValue: voteValue
        }
        setVotes([...votes].push(voteBody))
        vote(voteBody)
    }

    async function vote(voteBody) {        
        if (username === undefined || username === null) return console.error('Username not found')
        const voteFunction = makeApiCallFunction({
            url: `/vote/${sessionData.sessionid}`,
            method: 'POST',
            body: voteBody,
            accessToken: accessToken,
            refreshToken: refreshToken,
            setAccessTokenFunction: setAccessToken
        })
        voteFunction()
        // const resp = await voteFunction()
        // const voteResponseData = await resp.json()
        
        // return voteResponseData
    }

    return (
        <button onClick={handleClick}>
            {voteValue}
        </button>
    )
}
