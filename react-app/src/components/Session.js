import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

export default function Session() {
    const sessionId = useParams().session_id
    const [sessionData, setSessionData] = useState({})

    useEffect(() => {
        getSession(sessionId)
    }, [])

    async function getSession(sessionId) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const selectedSession = await fetch(`http://localhost:4000/session/${sessionId}`, requestOptions)
        const jsonData = await selectedSession.json()
        setSessionData(jsonData)
    }

    return (
        <div>
            <p>{sessionData.sessionid}</p>
            <p>{sessionData.hostid}</p>
            <p>{sessionData.password}</p>
        </div>
    )
}
