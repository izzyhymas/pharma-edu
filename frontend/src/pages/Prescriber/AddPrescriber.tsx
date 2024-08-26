import styles from "./AddPrescriber.module.css";

function AddPrescriber() {
  return (
    <div className={styles.addPrescriberPage}>
      <div className={styles.addPrescriberTitle}>
        <h3>Add Prescriber</h3>
        <hr></hr>
      </div>
      <div className={styles.addPrescriberContainer}>
        <div className={styles.addPrescriberInfo}>
          <div className={styles.addPrescriberInfoFields}>
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
              <button type="submit">Save Information</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPrescriber;
