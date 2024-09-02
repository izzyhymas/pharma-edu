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
      const response = await fetch(`http://127.0.0.1:8000/rx-items/${id}`, {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMedication((prev: any) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  return (
    <div className={styles.medicationProfilePage}>
      <div className={styles.medicationProfileTitle}>
        <h3>Medication Profile</h3>
        <hr></hr>
      </div>
      <div className={styles.medicationName}>
        <h3>{medication.name}</h3>
        <hr></hr>
      </div>
      <div className={styles.medicationProfileContainer}>
        <div className={styles.medicationInfo}>
          <div className={styles.medicationInfoFields}>
            <label>
              <p>Medication:</p>
              <input
                type="text"
                name="name"
                value={medication.name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Medication Strength:</p>
              <input
                type="text"
                name="strength"
                value={medication.strength || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>NDC:</p>
              <input
                type="text"
                name="ndc"
                value={medication.ndc || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Expiration:</p>
              <input
                type="text"
                name="expiration"
                value={medication.expiration || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Lot Number:</p>
              <input
                type="text"
                name="lot_number"
                value={medication.lot_number || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Dosage Form:</p>
              <input
                type="text"
                name="dosage_form"
                value={medication.dosage_form || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>DEA Schedule:</p>
              <input
                type="text"
                name="dea_schedule"
                value={medication.dea_schedule || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <div className={styles.GeneralButtonContainer}>
              <button type="button" onClick={handleEditToggle}>
                {isEditing ? "Save Information" : "Edit Information"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationProfile;
