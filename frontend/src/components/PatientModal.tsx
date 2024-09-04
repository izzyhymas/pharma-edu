import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./PatientModal.module.css";


interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  allergies: string;
}

interface PatientModalProps {
  show: boolean;
  handleClose: () => void;
  onSelectPatient: (patient: {id: string, name: string, allergies: string}) => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ show, handleClose, onSelectPatient }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

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

  const handlePatientClick = (patient: Patient) => {
    onSelectPatient({
      id: patient.id,
      name: `${patient.first_name} ${patient.last_name}`,
      allergies: patient.allergies,
    });
    handleClose();
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
                onClick={() => handlePatientClick(patient)}
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
