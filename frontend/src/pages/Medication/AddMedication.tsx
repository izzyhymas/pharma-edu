import styles from "./AddMedication.module.css"

function AddMedication() {
  return (
    <div className={styles.addMedicationProfilePage}>
      <div className={styles.addMedicationProfileTitle}>
        <h3>Add Medication</h3>
        <hr></hr>
      </div>
      <div className={styles.addMedicationProfileContainer}>
        <div className={styles.addMedicationInfo}>
          <div className={styles.addMedicationInfoFields}>
            <label>
              <p>Medication:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Medication Strength:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Drug Class:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>NDC:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Expiration:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Lot Number:</p>
                <input type="text"></input>
            </label>
            <label>
              <p>DEA Schedule:</p>
              <input type="text"></input>
            </label>
            <div className={styles.GeneralButtonContainer}>
              <button type="submit">Save Information</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMedication;