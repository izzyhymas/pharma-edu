import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MedicationSearch.module.css";

const MedicationSearch: React.FC = () => {
  // State to store all medications fetched from the API
  const [medications, setMedications] = useState<any[]>([]);
  // State to store the filtered list of medications based on search criteria
  const [filteredMedications, setFilteredMedications] = useState<any[]>([]);
  // State to store search parameters from input fields
  const [searchParams, setSearchParams] = useState({
    name: "",
    ndc: "",
  });

  const navigate = useNavigate();

  // useEffect to fetch all medication data
  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/rx-items");
        const data = await response.json();
        setMedications(data); // Stores fetched medication
        setFilteredMedications(data); // Initially set filtered medication to all medication
      } catch (error) {
        console.error("Error fetching medication:", error); // Handles errors
      }
    };

    fetchMedication();
  }, []); // Empty array ensures that this runs only once after initial render

  // useEffect to filter patients whenever searchParams or patients change
  useEffect(() => {
    const filterPatients = () => {
      const { name, ndc } = searchParams;
      const filtered = medications.filter(
        (medication) =>
          (name
            ? medication.name.toLowerCase().includes(name.toLowerCase())
            : true) && (ndc ? medication.ndc.includes(ndc) : true)
      );
      setFilteredMedications(filtered); // Updates the filtered patients state
    };

    filterPatients();
  }, [searchParams, medications]); // Runs when searchParams or patients Change

  // Handle changes to search input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value, // Updates search parameter
    }));
  };

  const handleMedicationClick = (id: string) => {
    navigate(`/rx-item/profile/${id}`);
  };

  const handleAddMedicationClick = () => {
    navigate("/medication/add");
  };

  return (
    <div className={styles.medicationPage}>
      <div className={styles.medicationSearchTitle}>
        <h3>Medication</h3>
        <hr></hr>
      </div>
      <div className={styles.medicationSearch}>
        <div className={styles.medicationSearchContainer}>
          <div className={styles.medicationSearchContent}>
            <h3>Quick Search:</h3>
            <hr></hr>
            <div className={styles.medicationSearchFields}>
              <label>
                <p>Medication:</p>
                <input
                  type="text"
                  name="name"
                  value={searchParams.name}
                  onChange={handleChange}
                ></input>
              </label>
              <label>
                <p>NDC:</p>
                <input
                  type="text"
                  name="ndc"
                  value={searchParams.ndc}
                  onChange={handleChange}
                ></input>
              </label>
            </div>
            <div className={styles.medicationSearchButton}>
              <button type="submit" onClick={handleAddMedicationClick}>
                Add Medication
              </button>
            </div>
          </div>

          <div className={styles.medicationSearchSep}></div>

          <div className={styles.medicationDisplay}>
            <div className={styles.medicationBox}>
              {filteredMedications.map((medication) => (
                <div
                  key={medication.id}
                  className={styles.medicationItem}
                  onClick={() => handleMedicationClick(medication.id)}
                >
                  <p>{medication.name}</p>
                  <p>{medication.ndc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationSearch;
