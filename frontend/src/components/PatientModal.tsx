import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./PatientModal.module.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const PatientModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/patients");
        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const filterPatients = () => {
      const { firstName, lastName, dateOfBirth } = searchParams;
      const filtered = patients.filter(
        (patient) =>
          (firstName
            ? patient.first_name.toLowerCase().includes(firstName.toLowerCase())
            : true) &&
          (lastName
            ? patient.last_name.toLowerCase().includes(lastName.toLowerCase())
            : true) &&
          (dateOfBirth ? patient.date_of_birth === dateOfBirth : true)
      );
      setFilteredPatients(filtered);
    };

    filterPatients();
  }, [searchParams, patients]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handlePatientClick = (id: string) => {
    handleClose();
    navigate(`/patient/profile/${id}`);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={styles.PatientModalContent}
    >
      <Modal.Header closeButton className={styles.PatientModalHeader}>
        <Modal.Title>Patient Search</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.PatientModalBody}>
        <div className={styles.patientSeachField}>
          <label>
            <p>First Name:</p>
            <input
              type="text"
              name="firstName"
              value={searchParams.firstName}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            <p>Last Name:</p>
            <input
              type="text"
              name="lastName"
              value={searchParams.lastName}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            <p>DOB:</p>
            <input
              type="date"
              name="dateOfBirth"
              value={searchParams.dateOfBirth}
              onChange={handleChange}
            ></input>
          </label>
        </div>

        <div className={styles.patientSearchSep}></div>

        <div className={styles.patientDisplay}>
          <div className={styles.patients}>
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={styles.patientItem}
                onClick={() => handlePatientClick(patient.id)}
              >
                <p>
                  {patient.first_name} {patient.last_name}
                </p>
                <p>{patient.date_of_birth}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PatientModal;
