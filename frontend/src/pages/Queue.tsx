import styles from "./Queue.module.css";

function Queue() {
  return (
    <div className={styles.queueContent}>
      <div className={styles.pageTitle}>
        <h3>Queue</h3>
        <hr></hr>
      </div>
      <div className={styles.pendingPrescriptions}>
        <h3>Pending Prescriptions</h3>
        <hr></hr>
      </div>
      <div className={styles.prescriptionContainer}>
      </div>
      <div></div>
    </div>
  );
}

export default Queue;
