import styles from "./MedicationSearch.module.css"

function MedicationSearch() {
  return (
    <div className={styles.medicationPage}>
      <div className={styles.medicationSearchTitle}>
        <h3>Medication</h3>
        <hr></hr>
      </div>
      <div className={styles.medicationSearch}>
        <div className={styles.medicationSearchContainer}>
          <div className={styles.medicationSearchContent}>
            <h3>Quick Search:</h3>
            <hr></hr>
            <div className={styles.medicationSearchFields}>
              <label>
                <p>Medication:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>NDC:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>Lot Number:</p>
                  <input type="text"></input>
              </label>
              <label>
                <p>Drug Class:</p>
                <input type="text"></input>
              </label>
            </div>
            <div className={styles.medicationSearchButton}>
              <button type="submit">Add Medication</button>
            </div>
          </div>

          <div className={styles.medicationSearchSep}></div>

          <div className={styles.medicationDisplay}>
            <div className={styles.medicationBox}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicationSearch;