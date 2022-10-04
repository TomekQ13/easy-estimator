import React from "react";
import Modal from "react-bootstrap/Modal";
import NewSessionForm from "./NewSessionForm";
import Button from "react-bootstrap/Button";

export default function NewSessionModal({
    setNewSessionModal,
    newSessionModal,
}) {
    function handleCloseModal() {
        setNewSessionModal({ show: false });
    }

    return (
        <Modal show={newSessionModal.show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Setup session password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewSessionForm handleCloseModal={handleCloseModal} />
            </Modal.Body>
        </Modal>
    );
}
