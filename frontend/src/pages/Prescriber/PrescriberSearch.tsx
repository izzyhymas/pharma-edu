import React, { useEffect, useState } from "react";
import styles from "./PrescriberSearch.module.css";

const PrescriberSearch: React.FC = () => {
  // State to store all prescribers fetched from the API
  const [prescribers, setPrescribers] = useState<any[]>([]);
  // State to store the filtered list of prescribers based on search criteria
  const [filteredPrescribers, setFilteredPrescribers] = useState<any[]>([]);
  // State to store search parameters from input fields
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    dea: "",
  });

  // useEffect to fetch all patients data
  useEffect(() => {
    const fetchPrescribers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/prescribers");
        const data = await response.json();
        setPrescribers(data); // Stores fetched prescribers
        setFilteredPrescribers(data); // Initially sets filtered prescribers to all prescribers
      } catch (error) {
        console.error("Error fetching prescribers:", error); // Handles errors
      }
    };

    fetchPrescribers();
  }, []); // Empty array ensures that this runs only once after initial render

  // useEffect to filter prescribers whenever searchParams or patients change

  useEffect(() => {
    const filterPrescribers = () => {
      const { firstName, lastName, dea } = searchParams;
      const filtered = prescribers.filter(
        (prescriber) =>
          (firstName
            ? prescriber.first_name
                .toLowerCase()
                .includes(firstName.toLowerCase())
            : true) &&
          (lastName
            ? prescriber.last_name
                .toLowerCase()
                .includes(lastName.toLowerCase())
            : true) &&
          (dea
            ? prescriber.dea.toLowerCase().includes(dea.toLowerCase())
            : true)
      );
      setFilteredPrescribers(filtered); // Updates the filtered prescriber state
    };

    filterPrescribers();
  }, [searchParams, prescribers]); // Runs when searchParams or prescribers Change

  // Handle changes to search input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value, // Updates search parameter
    }));
  };

  return (
    <div className={styles.prescriberPage}>
      <div className={styles.prescriberSearchTitle}>
        <h3>Prescriber</h3>
        <hr></hr>
      </div>
      <div className={styles.prescriberSearch}>
        <div className={styles.prescriberSearchContainer}>
          <div className={styles.prescriberSearchContent}>
            <h3>Prescriber:</h3>
            <hr></hr>
            <div className={styles.prescriberSearchFields}>
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
                <p>DEA:</p>
                <input
                  type="text"
                  name="dea"
                  value={searchParams.dea}
                  onChange={handleChange}
                ></input>
              </label>
            </div>
            <div className={styles.prescriberSearchButton}>
              <button type="submit">Add Prescriber</button>
            </div>
          </div>

          <div className={styles.prescriberSearchSep}></div>

          <div className={styles.prescriberDisplay}>
            <div className={styles.prescriberBox}>
              {filteredPrescribers.map((prescriber) => (
                <div key={prescriber.id} className={styles.prescriberItem}>
                  <p>
                    {prescriber.first_name} {prescriber.last_name}
                  </p>
                  <p>{prescriber.dea}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriberSearch;
