import styles from "./Prescription.module.css";

function Prescription() {
  return (
    <div className={styles.prescriptionPage}>
      <div className={styles.prescriptionPageTitle}>
        <h3>New Rx</h3>
        <hr />
      </div>
      <div className={styles.patientPrescriptionContainer}>
        <div className={styles.patientInfo}>
          <h3>Patient Name</h3>
          <hr />
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
        </div>
        <div>
          <hr />
          <h3>Date of Rx</h3>
          <hr />
          <label>
            <p>Date:</p>
            <div>
              <input type="date" />
            </div>
          </label>
        </div>
        <div>
          <hr />
          <h3>Medication</h3>
          <hr />
          <label>
            <p>Medication:</p>
            <div>
              <input type="text" />
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
          <div></div>
        </div>
        <div>
          <hr />
          <h3>Directions</h3>
          <hr />
          <label>
            <p>Directions:</p>
            <textarea />
          </label>
          <hr></hr>
        </div>
        <div>
          <label>
            <h4>Tech Initials</h4>
            <input type="text" />
          </label>
        </div>
      </div>

      <div></div>

      <div>
        <h3>Print Label</h3>
        <hr />
        <div>
          <button type="submit">Continue to Label</button>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
