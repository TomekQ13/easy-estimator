import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import VoteButton from './VoteButton'
import { authContext } from '../contexts/Auth'
import { getSession } from '../models/session'
import { getVotes } from '../models/vote'

export const SessionContext = React.createContext()

export function Session() {
    const sessionId = useParams().session_id
    const [sessionData, setSessionData] = useState({})
    const [votes, setVotes] = useState([])
    
    const { accessToken, refreshToken, setAccessToken } = useContext(authContext)

    useEffect(() => {
        getSession(sessionId).then((sessionData) => {
            setSessionData(sessionData)
        })
        getVotes({
            sessionId,
            accessToken,            
            refreshToken,
            setAccessTokenFunction: setAccessToken
        }).then((sessionVotes) => {
            setVotes(sessionVotes)
        })
    }, [sessionId])

    const sessionContextValue = {
        sessionData
    }



    return (
        <SessionContext.Provider value={sessionContextValue}>
            <div>
                <p>{sessionData.sessionid}</p>
                <p>{sessionData.hostid}</p>
                <p>{sessionData.password}</p>
                <VoteButton voteValue={1}/>
                <VoteButton voteValue={2}/>
                <VoteButton voteValue={3}/>
                <VoteButton voteValue={5}/>
                <VoteButton voteValue={8}/>
            </div>
            <ol>
                {votes.map((vote) => {
                    return (
                        <li key={vote.voteid}>
                            voteId: {vote.voteid} <br></br>
                            userId: {vote.userid} <br></br>
                            voteValue: {vote.votevalue} 
                        </li>
                    )
                })}
            </ol>
        </SessionContext.Provider>
    )
}
