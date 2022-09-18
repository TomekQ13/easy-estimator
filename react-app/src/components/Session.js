import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import VoteButton from './VoteButton'
import { authContext, getUsernameFromLS } from '../contexts/Auth'
import { getSession } from '../models/session'
import { getVotes } from '../models/vote'
import { websocketContext } from '../contexts/Websocket'
import ResetVotesBtn from './ResetVotesBtn'

export const SessionContext = React.createContext()

export function Session() {
    const sessionId = useParams().session_id
    const [sessionData, setSessionData] = useState({})
    const [votes, setVotes] = useState([])
    const [websocket, setWebsocket] = useState()    
    
    const { username, accessToken, refreshToken, setAccessToken, setRegisterModal } = useContext(authContext)
    const { makeWebsocket } = useContext(websocketContext)

    useEffect(async () => {
        if (username === undefined) return
        const ws = await makeWebsocket(username)
        ws.onmessage = (messageString) => {        
            const message = JSON.parse(messageString.data)
            if (message.type === 'heartbeat') {
                ws.heartbeat()
            } else if (message.type === 'resetVoting') {
                setVotes([])
            } else if (message.type === 'vote') {
                if (message.vote.userid === username) return
                setVotes(prevVotes => {
                    const notThisUserVotes = prevVotes.filter(vote => vote.userid !== message.vote.userid)
                    return [...notThisUserVotes, message.vote]
                })
            }
        }
        setWebsocket(ws)
    }, [username]) 

    useEffect(() => {
        if (username === null || username === undefined) {
            setRegisterModal({ show: true })
        }
    }, [setRegisterModal, username])

    useEffect(() => {
        if (accessToken === undefined) return
        getSession({
            sessionId,
            accessToken,
            refreshToken,
            setAccessTokenFunction: setAccessToken
        }).then((sessionData) => {
            setSessionData(sessionData)
        })
    }, [sessionId, accessToken, refreshToken, setAccessToken])

    useEffect(async () => {
        if (accessToken === undefined) return
        getVotes({
            sessionId,
            accessToken,            
            refreshToken,
            setAccessTokenFunction: setAccessToken
        }).then((sessionVotes) => {
            setVotes(sessionVotes)
            console.log('setting votes to '+ sessionVotes)
        })
    }, [sessionId, accessToken, refreshToken, setAccessToken])

    const sessionContextValue = {
        sessionData
    }

    console.log(votes)
    return (
        <SessionContext.Provider value={sessionContextValue}>
            <div>
                {sessionData && <p>{sessionData.sessionid}</p>}
                {sessionData && <p>{sessionData.hostid}</p>}
                {sessionData && <p>{sessionData.password}</p>}
                <VoteButton voteValue={1} votes={votes} setVotes={setVotes} websocket={websocket}/>
                <VoteButton voteValue={2} votes={votes} setVotes={setVotes} websocket={websocket}/>
                <VoteButton voteValue={3} votes={votes} setVotes={setVotes} websocket={websocket}/>
                <VoteButton voteValue={5} votes={votes} setVotes={setVotes} websocket={websocket}/>
                <VoteButton voteValue={8} votes={votes} setVotes={setVotes} websocket={websocket}/>
            </div>
            <ResetVotesBtn setVotes={setVotes} websocket={websocket}/>
            <ol>
                {votes && votes.map((vote) => {
                    return (
                        <li key={vote.voteid}>
                            userId: {vote.userid} <br></br>
                            voteValue: {vote.votevalue} 
                        </li>
                    )
                })}
            </ol>
        </SessionContext.Provider>
    )
}
