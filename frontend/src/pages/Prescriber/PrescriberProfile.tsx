import styles from "./PrescriberProfile.module.css";

function PrescriberProfile() {
  return (
    <div className={styles.prescriberProfilePage}>
      <div className={styles.prescriberProfileTitle}>
        <h3>Prescriber Profile</h3>
        <hr></hr>
      </div>
      <div className={styles.prescriberName}>
        <h3>*Prescriber Name*</h3>
        <hr></hr>
      </div>
      <div className={styles.prescriberProfileContainer}>
        <div className={styles.prescriberInfo}>
          <div className={styles.prescriberInfoFields}>
            <label>
              <p>Last Name:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>First Name:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Dr. Type:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Phone Number:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>Address:</p>
              <input type="text"></input>
            </label>
            <label>
              <p>DEA:</p>
                <input type="text"></input>
            </label>
            <label>
              <p>NPI Number:</p>
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

export default PrescriberProfile;
