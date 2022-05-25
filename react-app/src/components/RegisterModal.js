import React from 'react'
import RegisterForm from './RegisterForm'
import Modal from './Modal'

export default function RegisterModal({ setRegisterModal }) {
    function handleCloseModal() {
        setRegisterModal({ show: false })
    }

    const modalContents = <>
        <RegisterForm handleCloseModal={ handleCloseModal }/>
        <button onClick={handleCloseModal}>
            Close modal
        </button>
    </>

    return (
        <Modal modalContents={ modalContents }/>
    )
}
