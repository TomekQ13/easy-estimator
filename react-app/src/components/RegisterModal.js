import React from "react";
import RegisterForm from "./RegisterForm";
import Modal from "react-bootstrap/Modal";

export default function RegisterModal({ setRegisterModal, registerModal }) {
    function handleCloseModal() {
        setRegisterModal({ show: false });
    }

    return (
        <Modal
            show={registerModal.show}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Enter username</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RegisterForm
                    handleCloseModal={handleCloseModal}
                    sessionId={registerModal.sessionId}
                />
            </Modal.Body>
        </Modal>
    );
}
