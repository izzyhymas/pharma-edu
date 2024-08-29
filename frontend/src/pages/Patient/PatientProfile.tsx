import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./PatientProfile.module.css";


const PatientProfile: React.FC = () => {
  // Get patient ID from URL
  const { id } = useParams<{ id: string }>();
  // State to store patient data
  const [patient, setPatient] = useState<any>("");
  // State to toggle between editing and viewing patient information
  const [isEditing, setIsEditing] = useState(false);


  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/patients/${id}`);
        const data = await response.json();
        // Update state with fetched patient data
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    if (id) {
      // Fetch patient data if ID is available
      fetchPatient();
    }
  }, [id]);

  // Toggle between editing and saving
  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  // Save updated patient data to database
  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      if (response.ok) {
        alert("Patient information updated successfully!");
      } else {
        alert("Failed to update patient information.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
    setIsEditing(false);
  };

  // Handle changes to form fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Update the patient state with the new field data
    setPatient((prev: any) => ({
      ...prev, // Spread operator that creates copy of object
      [name]: value || "", // Ensures that state is not undefined or null
    }));
  };

  return (
    <div className={styles.patientProfilePage}>
      <div className={styles.patientProfileTitle}>
        <h3>Patient Profile</h3>
        <hr></hr>
      </div>
      <div className={styles.patientName}>
        <h3>
          {patient.first_name} {patient.last_name}
        </h3>
        <hr></hr>
      </div>
      <div className={styles.patientProfileContainer}>
        <div className={styles.generalInfo}>
          <h3>General Information</h3>
          <hr></hr>
          <div className={styles.generalInfoFields}>
            <label>
              <p>First Name:</p>
              <input
                type="text"
                name="first_name"
                value={patient.first_name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Last Name:</p>
              <input
                type="text"
                name="last_name"
                value={patient.last_name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>DOB:</p>
              <input
                type="date"
                name="date_of_birth"
                value={patient.date_of_birth || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Phone Number:</p>
              <input
                type="text"
                name="phone_number"
                value={patient.phone_number || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Street:</p>
              <input
                type="text"
                name="street"
                value={patient.street || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>City:</p>
              <input
                type="text"
                name="city"
                value={patient.city || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>State:</p>
              <input
                type="text"
                name="state"
                value={patient.state || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Zipcode:</p>
              <input
                type="text"
                name="zipcode"
                value={patient.zipcode || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <label>
              <p>Allergies:</p>
              <input
                type="text"
                name="allergies"
                value={patient.allergies || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              ></input>
            </label>
            <hr></hr>
            <div className={styles.GeneralButtonContainer}>
              <button type="button" onClick={handleEditToggle}>
                {isEditing ? "Save Information" : "Edit Information"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.patientProfileSep}></div>

        <div className={styles.insuranceAndPrescriptions}>
          <div className={styles.insuranceInfo}>
            <h3>Insurance Information</h3>
            <hr></hr>
            <div className={styles.insuranceInfoFields}>
              <label>
                <p>Insurance:</p>
                <input
                  type="text"
                  name="insurance_name"
                  value={patient.insurance_name || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>Member ID:</p>
                <input
                  type="text"
                  name="insurance_member_id"
                  value={patient.insurance_member_id || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>Insurance Group Number:</p>
                <input
                  type="text"
                  name="insurance_group_number"
                  value={patient.insurance_group_number || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>BIN:</p>
                <input
                  type="text"
                  name="insurance_rx_bin"
                  value={patient.insurance_rx_bin || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>PCN:</p>
                <input
                  type="text"
                  name="insurance_rx_pcn"
                  value={patient.insurance_rx_pcn || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <label>
                <p>Person Code:</p>
                <input
                  type="text"
                  name="insurance_person_code"
                  value={patient.insurance_person_code || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                ></input>
              </label>
              <hr></hr>
            </div>
          </div>
          <div className={styles.rxButtonContainer}>
            <button type="submit">New Rx</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
