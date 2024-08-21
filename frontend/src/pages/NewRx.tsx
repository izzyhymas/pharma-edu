import { useState } from "react";
import styles from "./NewRx.module.css";

import search from "../assets/magnifying-glass.svg";

import PatientModal from "../components/PatientModal";
import DoctorModal from "../components/DoctorModal";
import MedicationModal from "../components/MedicationModal";

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
    <div className={styles.newRxPage}>
      <div className={styles.rxPageTitle}>
        <h3>New Rx</h3>
        <hr />
      </div>
      <div className={styles.rxContainer}>
        <div className={styles.patientInfo}>
          <h3>Patient</h3>
          <hr />
          <div className={styles.patientInfoFields}>
            <label>
              <p>Name:</p>
              <div className={styles.searchImg}>
                <input type="text" />
                <img
                  src={search}
                  alt="search-image"
                  onClick={handleShowPatientModal}
                ></img>
              </div>
            </label>
            <PatientModal
              show={showPatientModal}
              handleClose={handleClosePatientModal}
            ></PatientModal>
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
            <hr />
            <h3>Doctor Name</h3>
            <hr />
            <label>
              <p>Name:</p>
              <div className={styles.searchImg}>
                <input type="text" />
                <img
                  src={search}
                  alt="search-icon"
                  onClick={handleShowDoctorModal}
                ></img>
              </div>
            </label>
            <DoctorModal
              show={showDoctorModal}
              handleClose={handleCloseDoctorModal}
            ></DoctorModal>
            <label>
              <p>DEA:</p>
              <input type="text" />
            </label>
            <hr />
            <h3>Date of Rx</h3>
            <hr />
            <label>
              <p>Date:</p>
              <div className={styles.dateIcon}>
                <input type="date" />
              </div>
            </label>
            <hr />
            <h3>Medication</h3>
            <hr />
            <label>
              <p>Medication:</p>
              <div className={styles.searchImg}>
                <input type="text" />
                <img
                  src={search}
                  alt="search-icon"
                  onClick={handleShowMedicationModal}
                ></img>
              </div>
            </label>
            <MedicationModal
              show={showMedicationModal}
              handleClose={handleCloseMedicationModal}
            ></MedicationModal>
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
            <hr />
            <h3>Directions</h3>
            <hr />
            <label>
              <p>Directions:</p>
              <textarea />
            </label>
            <hr></hr>
          </div>
          <div className={styles.techInitialsContainer}>
            <div className={styles.techInitials}>
              <label>
                <h3>Tech Initials</h3>
                <input type="text" />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.rxPageSep}></div>

        <div className={styles.printLabel}>
          <h3>Print Label</h3>
          <hr />
          <div className={styles.imageContainer}>
            <div className={styles.imageBox}></div>
          </div>
          <div className={styles.labelButton}>
            <button type="submit">Continue to Label</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRx;
