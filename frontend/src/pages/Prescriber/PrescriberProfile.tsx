import { useParams } from "react-router-dom";
import styles from "./PrescriberProfile.module.css";
import { useEffect, useState } from "react";

const PrescriberProfile: React.FC = () => {
  // Get prescriber ID from URL
  const { id } = useParams<{ id: string }>();
  // State to store prescriber data
  const [prescriber, setPrescriber] = useState<any>("");
  // State to edit prescriber data
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPrescriber = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/prescribers/${id}`
        );
        const data = await response.json();
        // Store fetched prescriber data
        setPrescriber(data);
      } catch (error) {
        console.error("Error fetching prescriber:", error);
      }
    };

    if (id) {
      // Fetch prescriber data when ID is available
      fetchPrescriber();
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
      const response = await fetch(
        `http://127.0.0.1:8000/prescribers/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prescriber),
        }
      );
      if (response.ok) {
        alert("Prescriber information updated successfully!");
      } else {
        alert("Failed to update prescriber information.");
      }
    } catch (error) {
      console.error("Error loading prescriber:", error);
    }
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPrescriber((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              <p>First Name:</p>
              <input
                type="text"
                name="first_name"
                value={prescriber.first_name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Last Name:</p>
              <input
                type="text"
                name="last_name"
                value={prescriber.last_name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>DEA:</p>
              <input
                type="text"
                name="dea"
                value={prescriber.dea || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>NPI:</p>
              <input
                type="text"
                name="npi"
                value={prescriber.npi || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Prescriber Type:</p>
              <input
                type="text"
                name="prescriber_type"
                value={prescriber.prescriber_type || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Contact Number:</p>
              <input
                type="text"
                name="contact_number"
                value={prescriber.contact_number || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Street:</p>
              <input
                type="text"
                name="street"
                value={prescriber.street || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>City:</p>
              <input
                type="text"
                name="city"
                value={prescriber.city || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>State:</p>
              <input
                type="text"
                name="state"
                value={prescriber.state || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Zipcode:</p>
              <input
                type="text"
                name="zipcode"
                value={prescriber.zipcode || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <div className={styles.GeneralButtonContainer}>
              <button type="submit" onClick={handleEditToggle}>
                {isEditing ? "Save Information" : "Edit Information"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriberProfile;
