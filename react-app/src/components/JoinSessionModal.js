import React from "react";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

export default function JoinSessionModal({
    setJoinSessionModal,
    joinSessionModal,
}) {
    function handleCloseModal() {
        setJoinSessionModal({ show: false });
    }

    return (
        <Modal show={joinSessionModal.show} onHide={handleCloseModal}>
            <Modal.Header>
                <Modal.Title>Insert Session ID</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            id="sessionId"
                            name="sessionId"
                            placeholder="Session ID"
                            autoFocus
                        ></Form.Control>
                    </Form.Group>
                    <div className="float-end">
                        <Button
                            type="submit"
                            variant="primary"
                            className="mx-2"
                        >
                            Join session
                        </Button>
                        <Button onClick={handleCloseModal} variant="secondary">
                            Close
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
