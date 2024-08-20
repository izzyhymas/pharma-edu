import styles from "./Patient.module.css"

function PatientSearch() {
    return (
  <div className={styles.patientSearchContainer}>
    <div className={styles.patientSearchContent}>
      <div className={styles.patientSearch}>
        <h3>Patient:</h3>
        <hr></hr>
      </div>
      <div className={styles.patientSearchSection}>
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
          <input type="Address"></input>
        </label>
        <div className={styles.patientSearchButtonContainer}>
          <button type="submit">Add Patient</button>
        </div>
      </div>

      <div className={styles.patientSearchSeparator}></div>
    </div>
  </div>
    )
}

export default PatientSearch;
