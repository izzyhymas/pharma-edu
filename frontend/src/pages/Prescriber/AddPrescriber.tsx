import React, { useState } from "react";


import styles from "./AddPrescriber.module.css";

const AddPrescriber: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    prescriber_type: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    contact_number: "",
    dea: "",
    npi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/prescribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Prescriber added successfully");
      } else {
        alert("Error loading prescriber");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.addPrescriberPage}>
      <div className={styles.addPrescriberTitle}>
        <h3>Add Prescriber</h3>
        <hr></hr>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.addPrescriberContainer}>
          <div className={styles.addPrescriberInfo}>
            <div className={styles.addPrescriberInfoFields}>
              <label>
                <p>First Name:</p>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>Last Name:</p>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>Prescriber Type:</p>
                <input
                  type="text"
                  name="prescriber_type"
                  value={formData.prescriber_type}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>Street:</p>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                ></input>
              </label>
                <label>
                  <p>City:</p>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <p>State:</p>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <p>Zipcode:</p>
                  <input
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                  ></input>
                </label>
              <label>
                <p>Contact Number:</p>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>DEA:</p>
                <input
                  type="text"
                  name="dea"
                  value={formData.dea}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>NPI:</p>
                <input
                  type="text"
                  name="npi"
                  value={formData.npi}
                  onChange={handleChange}
                ></input>
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

export default AddPrescriber;
