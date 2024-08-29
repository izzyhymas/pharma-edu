import { useParams } from "react-router-dom";
import styles from "./MedicationProfile.module.css";
import { useEffect, useState } from "react";

const MedicationProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medication, setMedication] = useState<any>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/rx-items/${id}`);
        const data = await response.json();

        setMedication(data);
      } catch (error) {
        console.error("Error fetching medication", error);
      }
    };

    if (id) {
      fetchMedication();
    }
  }, [id]);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medication),
      });
      if (response.ok) {
        alert("Medication information updated successfully!");
      } else {
        alert("Failed to update medication information");
      }
    } catch (error) {
      console.error("Error updating medication", error);
    }
    setIsEditing(false);
  };

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
};

export default MedicationProfile;
