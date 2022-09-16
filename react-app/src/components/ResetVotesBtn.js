import React, { useContext } from 'react'
import { deleteVotes } from '../models/vote'
import { authContext } from '../contexts/Auth'
import { SessionContext } from './Session'


export default function ResetVotesBtn({ setVotes }) {
    const { accessToken, refreshToken, setAccessToken } = useContext(authContext)
    const { sessionData } = useContext(SessionContext)

    // this should be handled as just removing the votes components
    async function handleClick() {
        try {
            deleteVotes({ sessionId: sessionData.sessionid, accessToken, refreshToken, setAccessTokenFunction: setAccessToken })
            setVotes([])
        } catch (e) {
            console.error(e)
            console.error('There has been an error while deleting votes')
        }
        
    }
  
    return (
        <button onClick={handleClick}>
            Reset voting
        </button>
    )
}
