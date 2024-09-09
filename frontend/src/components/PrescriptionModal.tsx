import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import styles from "./PrescriptionModal.module.css";

interface Prescription {
  rx_number: number;
  prescribed_date: string;
  rx_item_name: string;
  rx_item_strength: string;
  directions: string;
  quantity: number;
  refills: number;
  prescription_status: string;
  tech_initials: string;
  patient_id: number;
  prescriber_id: number;
}

interface PrescriptionModalProps {
  show: boolean;
  onHide: () => void;
  prescription: Prescription;
  onSave: (updatedPrescription: Prescription) => void;
  onDelete: (rx_number: number) => void;
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  show,
  onHide,
  prescription,
  onSave,
  onDelete,
}) => {
  const [editedPrescription, setEditedPrescription] =
    useState<Prescription>(prescription);

  useEffect(() => {
    setEditedPrescription(prescription);
  }, [prescription]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPrescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedPrescription);
    onHide();
  };

  const handleDelete = () => {
    onDelete(prescription.rx_number);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className={styles.prescriptionHeader}>
        <Modal.Title>Edit Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.prescriptionBody}>
        <Form>
          <Form.Group>
            <Form.Label>Date Prescribed:</Form.Label>
            <Form.Control
              type="date"
              name="prescribed_date"
              value={editedPrescription.prescribed_date}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Medication Name:</Form.Label>
            <Form.Control
              type="text"
              name="rx_item_name"
              value={editedPrescription.rx_item_name}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Strength:</Form.Label>
            <Form.Control
              type="text"
              name="rx_item_strength"
              value={editedPrescription.rx_item_strength}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Directions:</Form.Label>
            <Form.Control
              type="text"
              name="directions"
              value={editedPrescription.directions}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={editedPrescription.quantity}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Refills:</Form.Label>
            <Form.Control
              type="number"
              name="refills"
              value={editedPrescription.refills}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Control
              type="text"
              name="prescription_status"
              value={editedPrescription.prescription_status}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonContainer}>
          <button type="submit" onClick={handleSave}>
            Save Changes
          </button>
          <button type="submit" onClick={handleDelete}>
            Delete Prescription
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PrescriptionModal;
