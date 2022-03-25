import React from 'react'
import {useParams} from 'react-router-dom'

export default function Session() {

    const sessionId = useParams().session_id

    return (
        <div>
            <p>{sessionId}</p>
        </div>
    )
}
