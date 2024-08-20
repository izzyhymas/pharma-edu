import React from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./DoctorModal.module.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const DoctorModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className={styles.DoctorModalContent}>
      <Modal.Header closeButton className={styles.DoctorModalHeader}>
        <Modal.Title>Doctor Search</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.DoctorModalBody}>
        <label>
          <p>First Name:</p>
          <input type="text"></input>
        </label>
        <label>
            <p>Last Name:</p>
            <input type="text"></input>
        </label>
        <label>
            <p>DEA:</p>
            <input type="text"></input>
        </label>
      </Modal.Body>
      <Modal.Footer className={styles.DoctorModalFooter}>
        <Button variant="secondary" onClick={handleClose} className={styles.DoctorSelectButton}>
          Select Doctor
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorModal;
