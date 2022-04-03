import React, { useContext } from 'react'
import uuid from 'react-uuid'
import { SessionContext } from './Session'
import config from '../config.json'

export default function VoteButton({voteValue}) {
    const { sessionData } = useContext(SessionContext)
    console.log(sessionData)
    
    function handleClick() {
        vote()
    }

    async function vote() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: sessionData.sessionid,
                voteId: uuid(),
                userId: 'testUser',
                voteValue: voteValue
            })
        }
        const voteRespone = await fetch(`${config.apiUrl}/vote/${sessionData.sessionid}`, requestOptions)
        const voteResponseData = await voteRespone.json()
        
        return voteResponseData
    }

    return (
        <button onClick={handleClick}>
            {voteValue}
        </button>
    )
}
