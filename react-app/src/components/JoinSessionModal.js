import React from 'react'

export default function JoinSessionModal({ setJoinSessionModal }) {

    function handleCloseModal() {
        setJoinSessionModal({ show: false })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form>
                    <label for="sessionId">Session ID</label>
                    <input id="sessionId" name="sessionId"></input>
                    <button>Join session</button>
                </form>
                <button onClick={handleCloseModal}>
                    Close modal
                </button>
            </div>

        </div>
    )
}