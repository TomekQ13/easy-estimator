import React from 'react'
import NewSessionForm from './NewSessionForm'

export default function NewSessionModal({ setNewSessionModal }) {

    function handleCloseModal() {
        setNewSessionModal({ show: false })
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <NewSessionForm />
                <button onClick={handleCloseModal}>
                    Close modal
                </button>
            </div>

        </div>
    )
}