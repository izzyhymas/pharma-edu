import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Prescription {
  rx_number: number;
  patient_id: number;
  prescriber_id: number;
  prescribed_date: string;
  rx_item_id: number;
  directions: string;
  quantity: number;
  quantity_dispensed: number;
  refills: number;
  status: string;
  tech_initials: string;
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
  onDelete
}) => {
  const [editedPrescription, setEditedPrescription] = useState<Prescription>(prescription);

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
      <Modal.Header closeButton>
        <Modal.Title>Edit Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Rx Number</Form.Label>
            <Form.Control
              type="text"
              name="rx_number"
              value={editedPrescription.rx_number}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Prescribed Date</Form.Label>
            <Form.Control
              type="date"
              name="prescribed_date"
              value={editedPrescription.prescribed_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Directions</Form.Label>
            <Form.Control
              type="text"
              name="directions"
              value={editedPrescription.directions}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={editedPrescription.quantity}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity Dispensed</Form.Label>
            <Form.Control
              type="number"
              name="quantity_dispensed"
              value={editedPrescription.quantity_dispensed}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Refills</Form.Label>
            <Form.Control
              type="number"
              name="refills"
              value={editedPrescription.refills}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={editedPrescription.status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tech Initials</Form.Label>
            <Form.Control
              type="text"
              name="tech_initials"
              value={editedPrescription.tech_initials}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Prescription
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrescriptionModal;