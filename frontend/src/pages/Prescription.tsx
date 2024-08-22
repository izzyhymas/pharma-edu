import styles from "./Prescription.module.css";

function Prescription() {
  return (
    <div className={styles.prescriptionPage}>
      <div className={styles.prescriptionPageTitle}>
        <h3>Prescription</h3>
        <hr />
      </div>
      <div className={styles.patientPrescriptionContainer}>
        <div className={styles.patientInfo}>
          <h3>Patient</h3>
          <hr />
          <div className={styles.patientInfoFields}>
            <label>
              <p>Name:</p>
              <input type="text" />
            </label>
            <label>
              <p>DOB:</p>
              <input type="date" />
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
              <input type="text" />
            </label>
            <label>
              <p>DEA:</p>
              <input type="text" />
            </label>
            <hr />
            <h3>Date of Rx</h3>
            <hr />
            <label>
              <p>Date:</p>
              <input type="date" />
            </label>
            <hr />
            <h3>Medication</h3>
            <hr />
            <label>
              <p>Medication:</p>
              <input type="text" />
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

        <div className={styles.prescriptionPageSep}></div>

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
}

export default Prescription;
