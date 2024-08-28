import React, { useEffect, useState } from "react";
import DoctorModal from "../../components/DoctorModal";
import { useParams } from "react-router-dom";

import styles from "./PatientProfile.module.css";

import magnifying from "../../assets/magnifying-glass.svg";

const PatientProfile: React.FC = () => {
  // Get patient ID from URL
  const { id } = useParams<{ id: string }>();
  // State to store patient data
  const [patient, setPatient] = useState<any>("");
  // State to edit patient data
  const [isEditing, setIsEditing] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const handleShowDoctorModal = () => setShowDoctorModal(true);
  const handleCloseDoctorModal = () => setShowDoctorModal(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/patients/${id}`);
        const data = await response.json();
        // Store fetched patient data
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    if (id) {
      // Fetch patient data when ID is available
      fetchPatient();
    }
  }, [id]);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      if (response.ok) {
        alert("Patient information updated successfully!");
      } else {
        alert("Failed to update patient information.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPatient((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.patientProfilePage}>
      <div className={styles.patientProfileTitle}>
        <h3>Patient Profile</h3>
        <hr></hr>
      </div>
      <div className={styles.patientName}>
        <h3>
          {patient.first_name} {patient.last_name}
        </h3>
        <hr></hr>
      </div>
      <div className={styles.patientProfileContainer}>
        <div className={styles.generalInfo}>
          <h3>General Information</h3>
          <hr></hr>
          <div className={styles.generalInfoFields}>
            <label>
              <p>First Name:</p>
              <input
                type="text"
                name="first_name"
                value={patient.first_name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Last Name:</p>
              <input
                type="text"
                name="last_name"
                value={patient.last_name || ""}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>DOB:</p>
              <input
                type="date"
                name="date_of_birth"
                value={patient.date_of_birth || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Street:</p>
              <input
                type="text"
                name="street"
                value={patient.street || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>City:</p>
              <input
                type="text"
                name="city"
                value={patient.city || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>State:</p>
              <input
                type="text"
                name="state"
                value={patient.state || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Zipcode:</p>
              <input
                type="text"
                name="zipcode"
                value={patient.zipcode || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Primary Doctor:</p>
              <div className={styles.searchImg}>
                <input
                  type="text"
                  name="primary_care_prescriber_id"
                  value={patient.primary_care_prescriber_id || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
                <img
                  src={magnifying}
                  alt="magnifying-glass"
                  className={styles.searchDoctor}
                  onClick={handleShowDoctorModal}
                ></img>
              </div>
            </label>
            <DoctorModal
              show={showDoctorModal}
              handleClose={handleCloseDoctorModal}
            ></DoctorModal>
            <label>
              <p>Allergies:</p>
              <input
                type="text"
                name="allergies"
                value={patient.allergies || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <hr></hr>
            <div className={styles.GeneralButtonContainer}>
              <button type="button" onClick={handleEditToggle}>
                {isEditing ? "Save Information" : "Edit Information"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.patientProfileSep}></div>

        <div className={styles.insuranceAndPrescriptions}>
          <div className={styles.insuranceInfo}>
            <h3>Insurance Information</h3>
            <hr></hr>
            <div className={styles.insuranceInfoFields}>
              <label>
                <p>Member ID:</p>
                <input
                  type="text"
                  name="member_id_number"
                  value={patient.member_id_number || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>Insurance Group Number:</p>
                <input
                  type="text"
                  name="insurance_group_number"
                  value={patient.insurance_group_number || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>BIN:</p>
                <input
                  type="text"
                  name="insurance_rx_bin"
                  value={patient.insurance_rx_bin || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>PCN:</p>
                <input
                  type="text"
                  name="insurance_rx_pcn"
                  value={patient.insurance_rx_pcn || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>Person Code:</p>
                <input
                  type="text"
                  name="insurance_person_code"
                  value={patient.insurance_person_code || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <hr></hr>
            </div>
          </div>
          <div className={styles.rxButtonContainer}>
            <button type="submit">New Rx</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
