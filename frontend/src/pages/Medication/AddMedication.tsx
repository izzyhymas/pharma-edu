import React, { useState } from "react";

import styles from "./AddMedication.module.css";

const AddMedication: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    strength: "",
    ndc: "",
    expiration: "",
    lot_number: "",
    dosage_form: "",
    dea_schedule: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/rx-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Medication added successfully");
      } else {
        alert("Error loading medication");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.addMedicationProfilePage}>
      <div className={styles.addMedicationProfileTitle}>
        <h3>Add Medication</h3>
        <hr></hr>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.addMedicationProfileContainer}>
          <div className={styles.addMedicationInfo}>
            <div className={styles.addMedicationInfoFields}>
              <label>
                <p>Medication:</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>Strength:</p>
                <input
                  type="text"
                  name="strength"
                  value={formData.strength}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>NDC:</p>
                <input
                  type="text"
                  name="ndc"
                  value={formData.ndc}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>Expiration:</p>
                <input
                  type="date"
                  name="expiration"
                  value={formData.expiration}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>Lot Number:</p>
                <input
                  type="text"
                  name="lot_number"
                  value={formData.lot_number}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>Dosage Form:</p>
                <input
                  type="text"
                  name="dosage_form"
                  value={formData.dosage_form}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>DEA Schedule:</p>
                <select
                  name="dea_schedule"
                  value={formData.dea_schedule}
                  onChange={handleChange}
                >
                  <option value="Legend">Legend</option>
                  <option value="Schedule II">Schedule II</option>
                  <option value="Schedule III">Schedule III</option>
                  <option value="Schedule IV">Schedule IV</option>
                  <option value="Schedule V">Schedule V</option>
                </select>
              </label>
              <div className={styles.GeneralButtonContainer}>
                <button type="submit">Save Information</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMedication;
