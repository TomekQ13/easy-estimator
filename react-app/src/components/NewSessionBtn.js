import React from 'react'

export default function NewSessionBtn({ setNewSessionModal }) {

    function handleClick() {
        setNewSessionModal({ show: true })
    }

    return (
        <button onClick={handleClick}>
            New session
        </button>
    )
}