import React, { useState } from "react";
import DoctorModal from "../../components/DoctorModal";

import styles from "./PatientProfile.module.css";

import magnifying from "../../assets/magnifying-glass.svg";

const PatientProfile: React.FC = () => {
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const handleShowDoctorModal = () => setShowDoctorModal(true);
  const handleCloseDoctorModal = () => setShowDoctorModal(false);

  return (
    <div className={styles.patientProfilePage}>
      <div className={styles.patientProfileTitle}>
        <h3>Patient Profile</h3>
        <hr></hr>
      </div>
      <div className={styles.patientName}>
        <h3>*Patient Name*</h3>
        <hr></hr>
      </div>
      <div className={styles.patientProfileContainer}>
        <div className={styles.generalInfo}>
          <h3>General Information</h3>
          <hr></hr>
          <div className={styles.generalInfoFields}>
            <label>
              <p>Last Name:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>First Name:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>DOB:</p>
              <input type="date"></input>
            </label>
            <label>
              <p>Phone Number:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Address:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Primary Doctor:</p>
              <div className={styles.searchImg}>
                <input type="text"></input>
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
              <input type="text"></input>
            </label>
            <hr></hr>
            <div className={styles.GeneralButtonContainer}>
              <button type="submit">Edit Information</button>
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
                <p>Bin:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>PCN:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>Person Code:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>ID Number:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>Group Number:</p>
                <input type="text"></input>
              </label>
              <hr></hr>
            </div>
          </div>
          <div className={styles.prescriptions}>
            <h3>Prescriptions</h3>
            <hr></hr>
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
