import React, { useEffect, useState } from "react";
import styles from "./PatientSearch.module.css";

const PatientSearch: React.FC = () => {
  // State to store all patients fetched from the API
  const [patients, setPatients] = useState<any[]>([]);
  // State to store the filtered list of patients based on search criteria
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  // State to store seach parameters from input fields
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
  });

  // useEffect to fetch all patients data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/patients");
        const data = await response.json();
        setPatients(data); // Stores fetched patients
        setFilteredPatients(data); // Initially set filtered patients to all patients
      } catch (error) {
        console.error("Error fetching patients:", error); // Handles errors
      }
    };

    fetchPatients();
  }, []); // Empty array ensures that this runs only once after initial render

  // useEffect to filter patients whenever searchParams or patients change
  useEffect(() => {
    const filterPatients = () => {
      const { firstName, lastName } = searchParams;
      const filtered = patients.filter(
        (patient) =>
          (firstName
            ? patient.first_name.toLowerCase().includes(firstName.toLowerCase())
            : true) &&
          (lastName
            ? patient.last_name.toLowerCase().includes(lastName.toLowerCase())
            : true)
      );
      setFilteredPatients(filtered); // Updates the filtered patients state
    };

    filterPatients();
  }, [searchParams, patients]); // Runs when searchParams or patients Change

  // Handle changes to search input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value, // Updates search parameter
    }));
  };

  return (
    <div className={styles.patientPage}>
      <div className={styles.patientSearchTitle}>
        <h3>Patient</h3>
        <hr></hr>
      </div>
      <div className={styles.patientSearch}>
        <div className={styles.patientSearchContainer}>
          <div className={styles.patientSearchContent}>
            <h3>Patient:</h3>
            <hr></hr>
            <div className={styles.patientSearchFields}>
              <label>
                <p>Last Name:</p>
                <input
                  type="text"
                  name="lastName"
                  value={searchParams.lastName}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>First Name:</p>
                <input
                  type="text"
                  name="firstName"
                  value={searchParams.firstName}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>DOB:</p>
                <div className={styles.dateIcon}>
                  <input type="date"></input>
                </div>
              </label>
              <label>
                <p>Phone Number:</p>
                <input type="tel"></input>
              </label>
              <label>
                <p>Address:</p>
                <input type="Address"></input>
              </label>
            </div>
            <div className={styles.patientSearchButton}>
              <button type="submit">Add Patient</button>
            </div>
          </div>

          <div className={styles.patientSearchSep}></div>

          <div className={styles.patientDisplay}>
            <div className={styles.patientBox}>
              {filteredPatients.map((patient) => (
                <div key={patient.id} className={styles.patientItem}>
                  <p>
                    {patient.first_name} {patient.last_name}
                  </p>
                  <p>{patient.date_of_birth}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSearch;
