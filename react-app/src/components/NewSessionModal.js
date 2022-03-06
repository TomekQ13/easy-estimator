import React from 'react'

export default function NewSessionModal({ setNewSessionModal }) {

    function handleCloseModal() {
        setNewSessionModal({ show: false })
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form>
                    <label for="sessionPassword">Session password</label>
                    <input id="sessionPassword" name="sessionPassword"></input>
                    <button>Create session</button>
                </form>
                <button onClick={handleCloseModal}>
                    Close modal
                </button>
            </div>

        </div>
    )
}