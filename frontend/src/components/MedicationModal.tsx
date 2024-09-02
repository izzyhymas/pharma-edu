import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./MedicationModal.module.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const MedicationModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  const [medications, setMedications] = useState<any[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
    name: "",
    ndc: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/rx-items");
        const data = await response.json();
        setMedications(data);
        setFilteredMedications(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  useEffect(() => {
    const filterMedications = () => {
      const { name, ndc } = searchParams;
      const filtered = medications.filter(
        (medication) =>
          (name
            ? medication.name.toLowerCase().includes(name.toLowerCase())
            : true) &&
          (ndc
            ? medication.ndc.toLowerCase().includes(ndc.toLowerCase())
            : true)
      );
      setFilteredMedications(filtered);
    };

    filterMedications();
  }, [searchParams, medications]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleMedicationClick = (id: string) => {
    handleClose();
    navigate(`/rx-item/profile/${id}`);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={styles.MedicationModalContent}
    >
      <Modal.Header closeButton className={styles.MedicationModalHeader}>
        <Modal.Title>Search</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.MedicationModalBody}>
        <label>
          <p>Item:</p>
          <input
            type="text"
            name="name"
            value={searchParams.name}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          <p>NDC:</p>
          <input
            type="text"
            name="ndc"
            value={searchParams.ndc}
            onChange={handleChange}
          ></input>
        </label>

        <div className={styles.medicationSearchSep}></div>

        <div className={styles.medicationDisplay}>
          <div className={styles.medications}>
            {filteredMedications.map((medication) => (
              <div
                key={medication.id}
                className={styles.medicationItem}
                onClick={() => handleMedicationClick(medication.id)}
              >
                <p>{medication.name}</p>
                <p>{medication.ndc}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MedicationModal;
