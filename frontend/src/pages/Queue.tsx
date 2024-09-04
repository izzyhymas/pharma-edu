import React, { useState, useEffect } from "react";
import styles from "./Queue.module.css";

interface BasicPrescription {
  id: string; // Ensure this maps correctly
  first_name: string;
  last_name: string;
  rx_number: string;
}

interface DetailedPrescription extends BasicPrescription {
  prescribed_date: string;
  rx_item_id: number;
  directions: string;
  quantity: number;
  quantity_dispensed: number;
  refills: number;
  status: string;
  tech_initials: string;
  medication_name: string;
}

const fetchBasicPrescriptions = async (): Promise<BasicPrescription[]> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/prescriptions");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching basic prescriptions", error);
    return [];
  }
};

const fetchPrescriptionDetails = async (rx_number: string): Promise<DetailedPrescription | null> => {
  try {
    if (!rx_number) {
      console.error("Prescription ID (rx_number) is undefined");
      return null;
    }
    
    // Fetch basic details first
    const response = await fetch(`http://127.0.0.1:8000/prescriptions/${rx_number}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for RX number ${rx_number}`);
    }
    const data = await response.json();
    
    // Fetch medication details using rx_item_id
    const medicationResponse = await fetch(`http://127.0.0.1:8000/rx-items/${data.rx_item_id}`);
    if (!medicationResponse.ok) {
      throw new Error(`Failed to fetch medication details for ID ${data.rx_item_id}`);
    }
    const medicationData = await medicationResponse.json();
    
    return {
      ...data,
      medication_name: medicationData.name // Add medication name
    };
  } catch (error) {
    console.error(`Error fetching prescription details for RX number ${rx_number}`, error);
    return null;
  }
};

const Queue: React.FC = () => {
  const [queue, setQueue] = useState<DetailedPrescription[]>([]);
  const [statusFlags, setStatusFlags] = useState<Record<string, { filled: boolean; printed: boolean; pickedUp: boolean }>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basicData = await fetchBasicPrescriptions();
        const detailedData = await Promise.all(
          basicData.map(async (prescription) => {
            const details = await fetchPrescriptionDetails(prescription.rx_number);
            return details ? { ...prescription, ...details } : null;
          })
        );
        setQueue(detailedData.filter((item): item is DetailedPrescription => item !== null));

        // Initialize status flags
        const initialStatusFlags = detailedData.reduce((acc, item) => {
          if (item) {
            acc[item.rx_number] = {
              filled: false,
              printed: false,
              pickedUp: false,
            };
          }
          return acc;
        }, {} as Record<string, { filled: boolean; printed: boolean; pickedUp: boolean }>);

        setStatusFlags(initialStatusFlags);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (rx_number: string, statusType: string, checked: boolean) => {
    setStatusFlags((prevFlags) => {
      const updatedFlags = {
        ...prevFlags,
        [rx_number]: {
          ...prevFlags[rx_number],
          [statusType]: checked,
        },
      };

      const allStatusesChecked = updatedFlags[rx_number]?.filled && updatedFlags[rx_number]?.printed && updatedFlags[rx_number]?.pickedUp;

      if (allStatusesChecked) {
        setQueue((prevQueue) => prevQueue.filter((item) => item.rx_number !== rx_number));
      }

      return updatedFlags;
    });
  };

  return (
    <div className={styles.queueContent}>
      <div className={styles.pageTitle}>
        <h3>Queue</h3>
        <hr />
      </div>
      <div className={styles.pendingPrescriptions}>
        <h3>Pending Prescriptions</h3>
        <hr />
        <div className={styles.prescriptionTable}>
          <div className={styles.tableHeader}><div>Rx Number</div></div>
          <div className={styles.tableHeader}><div>Patient Name</div></div>
          <div className={styles.tableHeader}><div>Medication Name</div></div>
          <div className={styles.tableHeader}><div>Quantity</div></div>
          <div className={styles.tableHeader}><div>Status</div></div>
          <div className={styles.tableHeader}><div>Actions</div></div>
          {queue.length > 0 ? (
            queue.map((prescription) => (
              <div key={prescription.rx_number} className={styles.tableRow}>
                <div>{prescription.rx_number}</div>
                <div>{prescription.first_name} {prescription.last_name}</div>
                <div>{prescription.medication_name}</div>
                <div>{prescription.quantity}</div>
                <div>{prescription.status}</div>
                <div className={styles.actions}>
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      checked={statusFlags[prescription.rx_number]?.filled || false}
                      onChange={(e) => handleStatusChange(prescription.rx_number, 'filled', e.target.checked)}
                    />
                    Filled
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      checked={statusFlags[prescription.rx_number]?.printed || false}
                      onChange={(e) => handleStatusChange(prescription.rx_number, 'printed', e.target.checked)}
                    />
                    Printed
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox"
                      className={styles.checkbox}
                      checked={statusFlags[prescription.rx_number]?.pickedUp || false}
                      onChange={(e) => handleStatusChange(prescription.rx_number, 'pickedUp', e.target.checked)}
                    />
                    Picked Up
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p>No pending prescriptions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queue;