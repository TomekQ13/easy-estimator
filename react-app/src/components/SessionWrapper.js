import React from 'react'
import Websocket from '../contexts/Websocket'
import { Session } from './Session'

function SessionWrapper() {
  return (
    <Websocket>
        <Session />
    </Websocket>
  )
}

export default SessionWrapper
