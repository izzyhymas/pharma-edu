import { useState } from "react";
import styles from "./AddPatient.module.css";
import DoctorModal from "../../components/DoctorModal";

import search from "../../assets/magnifying-glass.svg";

const AddPatient: React.FC = () => {
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const handleShowDoctorModal = () => setShowDoctorModal(true);
  const handleCloseDoctorModal = () => setShowDoctorModal(false);

  return (
    <div className={styles.addPatientPage}>
      <div className={styles.addPatientTitle}>
        <h3>Add New Patient</h3>
        <hr></hr>
      </div>
      <div className={styles.addPatientContainer}>
        <div className={styles.addPatient}>
          <h3>General Information</h3>
          <hr></hr>
          <div className={styles.addPatientFields}>
            <label>
              <p>Last Name:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>First Name:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Phone Number:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>DOB:</p>
              <div className={styles.dateIcon}>
              <input type="date"></input>
              </div>
            </label>
            <label>
              <p>Address:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Primary Doctor</p>
              <div className={styles.addPatientDoctorSearch}>
                <input type="text"></input>
                <img src={search} alt="search-image" onClick={handleShowDoctorModal}></img>
              </div>
            </label>
            <label>
              <p>Allergies:</p>
              <input type="text"></input>
            </label>
          </div>
          <DoctorModal
            show={showDoctorModal}
            handleClose={handleCloseDoctorModal}
          ></DoctorModal>
        </div>

        <div className={styles.addPatientSep}></div>

        <div className={styles.addPatientInsurance}>
          <div className={styles.patientInsurance}>
            <h3>Insurance Information</h3>
            <hr></hr>
            <div className={styles.patientInsuranceFields}>
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
            </div>
          </div>
          <div className={styles.addPatientButton}>
            <button type="submit">Save Information</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
