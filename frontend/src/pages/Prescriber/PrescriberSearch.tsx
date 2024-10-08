import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  // useEffect to fetch all prescriber data
  useEffect(() => {
    const fetchPrescribers = async () => {
      try {
        // Fetch data from API
        const response = await fetch("http://127.0.0.1:8000/prescribers");
        const data = await response.json();
        setPrescribers(data); // Stores fetched prescribers
        setFilteredPrescribers(data); // Initially sets filtered prescribers to all prescribers
      } catch (error) {
        console.error("Error fetching prescribers:", error); // Logs errors
      }
    };

    fetchPrescribers();
  }, []); // Empty array ensures that this runs only once after initial render

  // useEffect to filter prescribers whenever searchParams or prescribers change
  useEffect(() => {
    const filterPrescribers = () => {
      // Destructures the search parameters from state
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
      // Update the filtered prescribers state
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

  // Handles click on prescriber and navigates to their profile
  const handlePrescriberClick = (id: string) => {
    navigate(`/prescriber/profile/${id}`);
  };

  // Handles click on "Add Prescriber" button to navigate to the Add Prescriber page
  const handleAddPrescriberClick = () => {
    navigate("/prescriber/add");
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
            <h3>Prescriber Lookup</h3>
            <hr></hr>
            <div className={styles.prescriberSearchFields}>
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
                <p>Last Name:</p>
                <input
                  type="text"
                  name="lastName"
                  value={searchParams.lastName}
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
              <button type="submit" onClick={handleAddPrescriberClick}>
                Add Prescriber
              </button>
            </div>
          </div>

          <div className={styles.prescriberSearchSep}></div>

          <div className={styles.prescriberDisplay}>
            <div className={styles.prescriberBox}>
              {filteredPrescribers.map((prescriber) => (
                <div
                  key={prescriber.id}
                  className={styles.prescriberItem}
                  onClick={() => handlePrescriberClick(prescriber.id)}
                >
                  <p>
                    {prescriber.first_name} {prescriber.last_name}
                  </p>
                  <p>{prescriber.dea}</p>
                  <span className={styles.profileIcon}>→</span>
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
