import styles from "./PrescriberSearch.module.css";

function PrescriberSearch() {
  return (
    <div className={styles.prescriberPage}>
      <div className={styles.prescriberSearchTitle}>
        <h3>Prescriber</h3>
        <hr></hr>
      </div>
      <div className={styles.prescriberSearch}>
        <div className={styles.prescriberSearchContainer}>
          <div className={styles.prescriberSearchContent}>
            <h3>Prescriber:</h3>
            <hr></hr>
            <div className={styles.prescriberSearchFields}>
              <label>
                <p>Last Name:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>First Name:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>Address:</p>
                <div className={styles.dateIcon}>
                  <input type="date"></input>
                </div>
              </label>
              <label>
                <p>Phone Number:</p>
                <input type="text"></input>
              </label>
              <label>
                <p>DEA:</p>
                <input type="Address"></input>
              </label>
              <label>
                <p>NPI Number:</p>
                <input type="text"></input>
              </label>
            </div>
            <div className={styles.prescriberSearchButton}>
              <button type="submit">Add Prescriber</button>
            </div>
          </div>

          <div className={styles.prescriberSearchSep}></div>

          <div className={styles.prescriberDisplay}>
            <div className={styles.prescriberBox}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriberSearch;
