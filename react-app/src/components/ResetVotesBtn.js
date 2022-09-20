import React, { useContext } from 'react'
import { deleteVotes } from '../models/vote'
import { authContext } from '../contexts/Auth'
import { SessionContext } from './Session'
import Button from 'react-bootstrap/Button';


export default function ResetVotesBtn({ setVotes, websocket }) {
    const { accessToken, refreshToken, setAccessToken } = useContext(authContext)
    const { sessionData } = useContext(SessionContext)

    // this should be handled as just removing the votes components
    async function handleClick() {
        try {
            websocket.send(JSON.stringify({
                type: 'resetVoting'
            }))
            setVotes([])
            deleteVotes({ sessionId: sessionData.sessionid, accessToken, refreshToken, setAccessTokenFunction: setAccessToken })
        } catch (e) {
            console.error(e)
            console.error('There has been an error while deleting votes')
        }
        
    }
  
    return (
        <Button onClick={handleClick}>
            Reset voting
        </Button>
    )
}
