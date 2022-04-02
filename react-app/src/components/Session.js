import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import config from './../config.json'

export default function Session() {
    const sessionId = useParams().session_id
    const [sessionData, setSessionData] = useState({})
    const [votes, setVotes] = useState([])

    useEffect(() => {
        getSession(sessionId)
    }, [])

    async function getSession(sessionId) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const selectedSession = await fetch(`${config.apiUrl}/session/${sessionId}`, requestOptions)
        const sessionJsonData = await selectedSession.json()
        setSessionData(sessionJsonData)
    }

    async function getVotes(sessionId) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const selectedVotes = await fetch(`${config.apiUrl}/vote/${sessionId}`, requestOptions)
        const votesJsonData = await selectedVotes.json()
        setVotes(votesJsonData)
    }

    return (
        <div>
            <p>{sessionData.sessionid}</p>
            <p>{sessionData.hostid}</p>
            <p>{sessionData.password}</p>
            <p>{votes}</p>
        </div>
    )
}
