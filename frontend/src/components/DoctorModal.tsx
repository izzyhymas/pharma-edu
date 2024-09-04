import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./DoctorModal.module.css";

interface Prescriber {
  id: string;
  first_name: string;
  last_name: string;
  dea: string;
}

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  onSelectPrescriber: (prescriber: {
    id: string;
    name: string;
    dea: string;
  }) => void;
}

const DoctorModal: React.FC<ModalProps> = ({
  show,
  handleClose,
  onSelectPrescriber,
}) => {
  const [prescribers, setPrescribers] = useState<any[]>([]);
  const [filteredPrescribers, setFilteredPrescribers] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    dea: "",
  });

  useEffect(() => {
    const fetchPrescribers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/prescribers");
        const data = await response.json();
        setPrescribers(data);
        setFilteredPrescribers(data);
      } catch (error) {
        console.error("Error fetching prescribers:", error);
      }
    };

    fetchPrescribers();
  }, []);

  useEffect(() => {
    const filterPrescribers = () => {
      const { firstName, lastName, dea } = searchParams;
      const filtered = prescribers.filter(
        (prescriber) =>
          (firstName
            ? prescriber.first_name
                .toLowerCase()
                .includes(firstName.toLowerCase())
            : true) &&
          (lastName
            ? prescriber.last_name
                .toLowerCase()
                .includes(lastName.toLowerCase())
            : true) &&
          (dea
            ? prescriber.dea.toLowerCase().includes(dea.toLowerCase())
            : true)
      );
      setFilteredPrescribers(filtered);
    };

    filterPrescribers();
  }, [searchParams, prescribers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handlePrescriberClick = (prescriber: Prescriber) => {
    onSelectPrescriber({
      id: prescriber.id,
      name: `${prescriber.first_name} ${prescriber.last_name}`,
      dea: prescriber.dea,
    });
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={styles.DoctorModalContent}
    >
      <Modal.Header closeButton className={styles.DoctorModalHeader}>
        <Modal.Title>Prescriber Search</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.DoctorModalBody}>
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
          <p>DEA:</p>
          <input
            type="text"
            name="dea"
            value={searchParams.dea}
            onChange={handleChange}
          ></input>
        </label>

        <div className={styles.prescriberSearchSep}></div>

        <div className={styles.prescriberDisplay}>
          <div className={styles.prescribers}>
            {filteredPrescribers.map((prescriber) => (
              <div
                key={prescriber.id}
                className={styles.prescriberItem}
                onClick={() => handlePrescriberClick(prescriber)}
              >
                <p>
                  {prescriber.first_name} {prescriber.last_name}
                </p>
                <p>{prescriber.dea}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DoctorModal;
