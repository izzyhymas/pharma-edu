import React from "react";
import { Button, Modal } from "react-bootstrap";

import styles from "./MedicationModal.module.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const MedicationModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className={styles.MedicationModalContent}>
      <Modal.Header closeButton className={styles.MedicationModalHeader}>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.MedicationModalBody}>
        <label>
          <p>Item:</p>
          <input type="text"></input>
        </label>
        <label>
          <p>Rx Number:</p>
          <input type="number"></input>
        </label>
      </Modal.Body>
      <Modal.Footer className={styles.MedicationModalFooter}>
        <Button variant="secondary" onClick={handleClose} className={styles.MedicationSelectButton}>Select Medication</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MedicationModal;
