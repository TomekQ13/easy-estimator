import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import config from './../config.json'
import VoteButton from './VoteButton'

export const SessionContext = React.createContext()

export function Session() {
    const sessionId = useParams().session_id
    const [sessionData, setSessionData] = useState({})
    const [votes, setVotes] = useState([])

    useEffect(() => {
        getSession()
        getVotes()
    }, [])

    const sessionContextValue = {
        sessionData
    }


    async function getSession() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const selectedSession = await fetch(`${config.apiUrl}/session/${sessionId}`, requestOptions)
        const sessionJsonData = await selectedSession.json()
        setSessionData(sessionJsonData)
    }

    async function getVotes() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        let selectedVotes
        let votesJsonData
        try {
            selectedVotes = await fetch(`${config.apiUrl}/vote/${sessionId}`, requestOptions)
            votesJsonData = await selectedVotes.json()
        } catch (e) {
            setVotes([])
        }
        setVotes(votesJsonData)
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
