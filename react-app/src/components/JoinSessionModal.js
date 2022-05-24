import React from 'react'
import Modal from './Modal'

export default function JoinSessionModal({ setJoinSessionModal }) {

    function handleCloseModal() {
        setJoinSessionModal({ show: false })
    }

    const modalContents = <>
        <form>
            <label for="sessionId">Session ID</label>
            <input id="sessionId" name="sessionId"></input>
            <button>Join session</button>
        </form>
        <button onClick={handleCloseModal}>
            Close modal
        </button>
    </>

    return (
        <Modal modalContents={ modalContents }/>
    )
}