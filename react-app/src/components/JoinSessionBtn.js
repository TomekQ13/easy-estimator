import React from 'react'

export default function JoinSessionBtn({ setJoinSessionModal }) {

    function handleClick() {
        setJoinSessionModal({ show: true })
    }

    return (
        <button onClick={handleClick}>
            Join session
        </button>
    )
}