import React, { useState } from "react";
import styles from "./NewRx.module.css";
import PatientModal from "../components/PatientModal";
import DoctorModal from "../components/DoctorModal";
import MedicationModal from "../components/MedicationModal";

import magnifying from "../assets/magnifying-glass.svg";

const NewRx: React.FC = () => {
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  const handleShowPatientModal = () => setShowPatientModal(true);
  const handleClosePatientModal = () => setShowPatientModal(false);

  const handleShowDoctorModal = () => setShowDoctorModal(true);
  const handleCloseDoctorModal = () => setShowDoctorModal(false);

  const handleShowMedicationModal = () => setShowMedicationModal(true);
  const handleCloseMedicationModal = () => setShowMedicationModal(false);

  return (
    <div className={styles.rxContainer}>
      <div className={styles.rxTitle}>
        <h3>New Rx</h3>
        <hr />
      </div>

      <div className={styles.rxContent}>
        <div className={styles.rxInfo}>
          <div className={styles.rxSection}>
            <h3>Patient Name</h3>
            <hr />
            <label>
              <p>Name:</p>
              <div className={styles.inputWithIcon}>
                <input type="text" />
                <img
                  src={magnifying}
                  alt="magnifying-glass"
                  className={styles.icon}
                  onClick={handleShowPatientModal}
                ></img>
              </div>
            </label>
            <label>
              <p>DOB:</p>
              <div className={styles.dateIcon}>
                <input type="date" />
              </div>
            </label>
            <label>
              <p>Allergies:</p>
              <input type="text" />
            </label>
            <div className={styles.rxButtonContainer}></div>
            <PatientModal
              show={showPatientModal}
              handleClose={handleClosePatientModal}
            ></PatientModal>
          </div>
          <div className={styles.rxSection}>
            <hr />
            <h3>Doctor Name</h3>
            <hr />
            <label>
              <p>Name:</p>
              <div className={styles.inputWithIcon}>
                <input type="text" />
                <img
                  src={magnifying}
                  alt="magnifying-glass"
                  className={styles.icon}
                  onClick={handleShowDoctorModal}
                ></img>
              </div>
            </label>
            <label>
              <p>DEA:</p>
              <input type="text" />
            </label>
            <div className={styles.rxButtonContainer}>
              <DoctorModal
                show={showDoctorModal}
                handleClose={handleCloseDoctorModal}
              ></DoctorModal>
            </div>
          </div>
          <div className={styles.rxSection}>
            <hr />
            <h3>Date of Rx</h3>
            <hr />
            <label>
              <p>Date:</p>
              <div className={styles.dateIcon}>
                <input type="date" />
              </div>
            </label>
          </div>
          <div className={styles.rxSection}>
            <hr />
            <h3>Medication</h3>
            <hr />
            <label>
              <p>Medication:</p>
              <div className={styles.inputWithIcon}>
                <input type="text" />
                <img
                  src={magnifying}
                  alt="magnifying-glass"
                  className={styles.logo}
                  onClick={handleShowMedicationModal}
                ></img>
              </div>
            </label>
            <label>
              <p>Quantity:</p>
              <input type="number" />
            </label>
            <label>
              <p>Dispensed:</p>
              <input type="number" />
            </label>
            <label>
              <p>Refills:</p>
              <input type="number" />
            </label>
            <MedicationModal
              show={showMedicationModal}
              handleClose={handleCloseMedicationModal}
            ></MedicationModal>
            <div className={styles.rxButtonContainer}></div>
          </div>
          <div className={styles.rxSection}>
            <hr />
            <h3>Directions</h3>
            <hr />
            <label>
              <p>Directions:</p>
              <textarea />
            </label>
            <hr></hr>
          </div>
          <div className={styles.initials}>
            <label>
              <h4>Tech Initials</h4>
              <input type="text" />
            </label>
          </div>
        </div>

        <div className={styles.rxSeparator}></div>

        <div className={styles.label}>
          <h3>Print Label</h3>
          <hr />
          <div className={styles.rxButtonContainer}>
            <button type="submit">Continue to Label</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRx;
