import styles from "./MedicationProfile.module.css";

function MedicationProfile() {
  return (
    <div className={styles.medicationProfilePage}>
      <div className={styles.medicationProfileTitle}>
        <h3>Medication Profile</h3>
        <hr></hr>
      </div>
      <div className={styles.medicationName}>
        <h3>*Medication*</h3>
        <hr></hr>
      </div>
      <div className={styles.medicationProfileContainer}>
        <div className={styles.medicationInfo}>
          <div className={styles.medicationInfoFields}>
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
              <button type="submit">Edit Information</button>
              <button type="submit">Save Information</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicationProfile;