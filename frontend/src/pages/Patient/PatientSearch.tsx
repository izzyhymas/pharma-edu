import styles from "./PatientSearch.module.css";

function PatientSearch() {
  return (
    <div className={styles.patientPage}>
      <div className={styles.patientSearchTitle}>
        <h3>Patient</h3>
        <hr></hr>
      </div>
      <div className={styles.patientSearch}>
        <div className={styles.patientSearchContainer}>
          <div className={styles.patientSearchContent}>
            <h3>Patient:</h3>
            <hr></hr>
            <div className={styles.patientSearchFields}>
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
                <div className={styles.dateIcon}>
                  <input type="date"></input>
                </div>
              </label>
              <label>
                <p>Phone Number:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>Address:</p>
                <input type="Address"></input>
              </label>
            </div>
            <div className={styles.patientSearchButton}>
              <button type="submit">Add Patient</button>
            </div>
          </div>

          <div className={styles.patientSearchSep}></div>

          <div className={styles.patientDisplay}>
            <div className={styles.patientBox}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientSearch;
