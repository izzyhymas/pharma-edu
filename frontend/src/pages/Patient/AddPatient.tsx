import { useState } from "react";
import styles from "./AddPatient.module.css";

const AddPatient: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    allergies: "",
    insurance_name: "",
    insurance_member_id: "",
    insurance_group_number: "",
    insurance_rx_bin: "",
    insurance_rx_pcn: "",
    insurance_person_code: "",
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
      const response = await fetch("http://127.0.0.1:8000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Patient added successfully");
      } else {
        console.log("Error adding patient");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.addPatientPage}>
      <div className={styles.addPatientTitle}>
        <h3>Add New Patient</h3>
        <hr></hr>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.addPatientContainer}>
          <div className={styles.addPatient}>
            <h3>General Information</h3>
            <hr></hr>
            <div className={styles.addPatientFields}>
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
                <p>DOB:</p>
                <div className={styles.dateIcon}>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  ></input>
                </div>
              </label>
              <label>
                <p>Phone Number:</p>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
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
                <p>Allergies:</p>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                ></input>
              </label>
            </div>
          </div>

          <div className={styles.addPatientSep}></div>

          <div className={styles.addPatientInsurance}>
            <div className={styles.patientInsurance}>
              <h3>Insurance Information</h3>
              <hr></hr>
              <div className={styles.patientInsuranceFields}>
                <label>
                  <p>Insurance:</p>
                  <input
                    type="text"
                    name="insurance_name"
                    value={formData.insurance_name}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <p>Member ID:</p>
                  <input
                    type="text"
                    name="insurance_member_id"
                    value={formData.insurance_member_id}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <p>Insurance Group Number:</p>
                  <input
                    type="text"
                    name="insurance_group_number"
                    value={formData.insurance_group_number}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <p>BIN:</p>
                  <input
                    type="text"
                    name="insurance_rx_bin"
                    value={formData.insurance_rx_bin}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <p>PCN:</p>
                  <input
                    type="text"
                    name="insurance_rx_pcn"
                    value={formData.insurance_rx_pcn}
                    onChange={handleChange}
                  ></input>
                </label>
                <label>
                  <p>Person Code:</p>
                  <input
                    type="text"
                    name="insurance_person_code"
                    value={formData.insurance_person_code}
                    onChange={handleChange}
                  ></input>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.addPatientButton}>
          <button type="submit">Save Information</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
