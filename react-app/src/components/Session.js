import React, { useContext, useEffect, useState, useRef } from 'react'
import {useParams} from 'react-router-dom'
import VoteButton from './VoteButton'
import { authContext } from '../contexts/Auth'
import { getSession } from '../models/session'
import { getVotes } from '../models/vote'
import RegisterModal from './RegisterModal';
import Cookies from 'universal-cookie';

export const SessionContext = React.createContext()

export function Session() {
    const sessionId = useParams().session_id
    const [sessionData, setSessionData] = useState({})
    const [votes, setVotes] = useState([])
    const [registerModal, setRegisterModal] = useState({ show: false })
    
    const { accessToken, refreshToken, setAccessToken, getUsernameFromLS } = useContext(authContext)

    useEffect(() => {
        if (username === null) {
            setRegisterModal({ show: true })
        }
    }, [])

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

    useEffect(() => {
        if (accessToken === undefined) return
        getVotes({
            sessionId,
            accessToken,            
            refreshToken,
            setAccessTokenFunction: setAccessToken
        }).then((sessionVotes) => {
            setVotes(sessionVotes)
        })
    }, [sessionId, accessToken, refreshToken, setAccessToken])

    const sessionContextValue = {
        sessionData
    }



    return (
        <SessionContext.Provider value={sessionContextValue}>
            <div>
                {sessionData && <p>{sessionData.sessionid}</p>}
                {sessionData && <p>{sessionData.hostid}</p>}
                {sessionData && <p>{sessionData.password}</p>}
                <VoteButton voteValue={1}/>
                <VoteButton voteValue={2}/>
                <VoteButton voteValue={3}/>
                <VoteButton voteValue={5}/>
                <VoteButton voteValue={8}/>
            </div>
            <ol>
                {votes && votes.map((vote) => {
                    return (
                        <li key={vote.voteid}>
                            voteId: {vote.voteid} <br></br>
                            userId: {vote.userid} <br></br>
                            voteValue: {vote.votevalue} 
                        </li>
                    )
                })}
            </ol>
            { registerModal.show && <RegisterModal setRegisterModal={setRegisterModal}/>}
        </SessionContext.Provider>
    )
}
