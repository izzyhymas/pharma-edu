import React from "react";
import { Button, Modal } from "react-bootstrap";

import styles from "./PatientModal.module.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const PatientModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className={styles.PatientModalContent}>
      <Modal.Header closeButton className={styles.PatientModalHeader}>
        <Modal.Title>Patient Search</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.PatientModalBody}>
        <label>
          <p>First Name:</p>
          <input type="text"></input>
        </label>
        <label>
            <p>Last Name:</p>
            <input type="text"></input>
        </label>
        <label>
            <p>DOB:</p>
            <input type="date"></input>
        </label>
      </Modal.Body>
      <Modal.Footer className={styles.PatientModalFooter}>
        <Button variant="secondary" onClick={handleClose} className={styles.PatientSelectButton}>
          Select Patient
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientModal;
