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
              <p>Allergies:</p>
              <textarea className="newRxTextarea" />
            </label>
            <hr />
            <h3>Prescriber</h3>
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
            {/* <label>
              <p>DEA:</p>
              <input type="text" />
            </label> */}
            <hr />
            <h3>Date of Rx</h3>
            <hr />
            <label>
              <p>Rx Filled:</p>
              <div className={styles.dateIcon}>
                <input type="date" />
              </div>
            </label>
            <label>
              <p>Discard After:</p>
              <div className={styles.dateIcon}>
                <input type="date" />
              </div>
            </label>
            <hr />
            <h3>Medication Information</h3>
            <hr />
            <label>
              <p>Item:</p>
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
              <p>Item Quantity:</p>
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
            {/* <hr />
            <h3>Directions</h3>
            <hr /> */}
            <label>
              <p>Directions:</p>
              <textarea className="newRxTextarea"/>
            </label>
            <hr></hr>
          </div>
          <div className={styles.techInitialsContainer}>
            <div className={styles.techInitials}>
              <h3>Verification</h3>
              <hr />
              <label>
                <p>Tech Initials: </p>
                <input type="text" />
              </label>
              <hr></hr>
            </div>
          </div>
        </div>

        <div className={styles.rxPageSep}></div>

        <div className={styles.printLabel}>
          <h3>Patient Information</h3>
          <hr />
          <div className={styles.displayPatientInfo}></div>
          <hr />
          <h3>Prescription</h3>
          <hr />
          
          <div className={styles.imageBox}></div>
          
          <div className={styles.labelButton}>
            <button type="submit">Save</button>
            <button type="submit">Scan Rx</button>
            <button type="submit">Print Label</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRx;
