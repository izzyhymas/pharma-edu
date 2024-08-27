import React, { useEffect, useState } from "react";
import DoctorModal from "../../components/DoctorModal";
import { useParams } from "react-router-dom";

import styles from "./PatientProfile.module.css";

import magnifying from "../../assets/magnifying-glass.svg";

const PatientProfile: React.FC = () => {
  // Get patient ID from URL
  const { id } = useParams<{ id: string }>();
  // State to store patient data
  const [patient, setPatient] = useState<any>(null);
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
    setIsEditing((prev) => !prev);
  };

  if (!patient) return <p>Loading...</p>; // Show loading message if patient data is not yet available

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
              <input type="text" value={patient.first_name} readOnly={!isEditing}></input>
            </label>
            <label>
              <p>Last Name:</p>
              <input type="text" value={patient.last_name} readOnly={!isEditing}></input>
            </label>
            <label>
              <p>DOB:</p>
              <input type="date" value={patient.date_of_birth} readOnly={!isEditing}></input>
            </label>
            <label>
              <p>Street:</p>
              <input type="text" value={patient.street} readOnly={!isEditing}></input>
            </label>
            <label>
              <p>City:</p>
              <input type="text" value={patient.city} readOnly={!isEditing}></input>
            </label>
            <label>
              <p>State:</p>
              <input type="text" value={patient.state} readOnly={!isEditing}></input>
            </label>
            <label>
              <p>Zipcode:</p>
              <input type="text" value={patient.zipcode} readOnly={!isEditing}></input>
            </label>
            <label>
              <p>Primary Doctor:</p>
              <div className={styles.searchImg}>
                <input
                  type="text"
                  value={patient.primary_care_prescriber_id}
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
              <input type="text" value={patient.allergies} readOnly={!isEditing}></input>
            </label>
            <hr></hr>
            <div className={styles.GeneralButtonContainer}>
              <button type="submit" onClick={handleEditToggle}>{isEditing ? "Save Information" : "Edit Information"}</button>
              <button type="submit">Save Information</button>
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
                  value={patient.member_id_number}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>Insurance Group Number:</p>
                <input
                  type="text"
                  value={patient.insurance_group_number}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>BIN:</p>
                <input type="text" value={patient.bin} readOnly={!isEditing}></input>
              </label>
              <label>
                <p>PCN:</p>
                <input type="text" value={patient.pcn} readOnly={!isEditing}></input>
              </label>
              <label>
                <p>Person Code:</p>
                <input
                  type="text"
                  value={patient.insurance_person_code}
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
