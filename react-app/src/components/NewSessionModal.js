import React from 'react'
import Modal from './Modal'
import NewSessionForm from './NewSessionForm'

export default function NewSessionModal({ setNewSessionModal }) {

    function handleCloseModal() {
        setNewSessionModal({ show: false })
    }

    const modalContents = <>
        <NewSessionForm />
        <button onClick={handleCloseModal}>
            Close modal
        </button>
    </>
    return (
        <Modal modalContents={ modalContents }/>
    )
}