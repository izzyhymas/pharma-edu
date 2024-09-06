import React, { useEffect, useState } from "react";
import PrescriptionModal from "../../components/PrescriptionModal";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./PatientProfile.module.css";

interface Patient {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  street: string;
  city: string;
  state: string;
  zipcode: number;
  allergies: string[];
  insurance_name: string;
  insurance_member_id: string;
  insurance_group_number: string;
  insurance_rx_bin: string;
  insurance_rx_pcn: string;
  insurance_person_code: string;
}

interface Prescription {
  rx_number: number;
  patient_id: number;
  prescriber_id: number;
  prescribed_date: string;
  directions: string;
  quantity: number;
  quantity_dispensed: number;
  refills: number;
  status: string;
  tech_initials: string;
  rx_item_id: number;
  medication_name?: string;
}

const PatientProfile: React.FC = () => {
  // Get patient ID from URL
  const { id } = useParams<{ id: string }>();
  // State to store patient data
  const [patient, setPatient] = useState<Patient>();
  // State to store prescription data
  const [prescription, setPrescription] = useState<Prescription[]>([]);
  // State to toggle between editing and viewing modes
  const [isEditing, setIsEditing] = useState(false);
  // State for prescription modals
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const navigate = useNavigate();

  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/patients/${id}`);
        const data = await response.json();
        // Update state with fetched patient data
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    if (id) {
      // Fetch patient data if ID is available
      fetchPatient();
    }
  }, [id]);

  // Fetch prescriptions data
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Fetch all prescriptions
        const response = await fetch("http://127.0.0.1:8000/prescriptions");
        const prescriptionsList = await response.json();

        // Fetch detailed prescription data including medication name
        const detailedPrescriptions = await Promise.all(
          prescriptionsList.map(async (prescription: any) => {
            const prescriptionDetailsResponse = await fetch(
              `http://127.0.0.1:8000/prescriptions/${prescription.rx_number}`
            );
            const prescriptionDetails =
              await prescriptionDetailsResponse.json();

            // Check if patient_id matches the ID from the URL
            if (prescriptionDetails.patient_id.toString() === id) {
              // Fetch medication name using rx_item_id
              const rxItemResponse = await fetch(
                `http://127.0.0.1:8000/rx-items/${prescriptionDetails.rx_item_id}`
              );
              const rxItemData = await rxItemResponse.json();

              return {
                ...prescriptionDetails,
                medication_name: rxItemData.name, // Add medication name
              };
            }

            // Return null if patient_id does not match
            return null;
          })
        );

        // Filter out null values
        const filteredPrescriptions = detailedPrescriptions.filter(
          (prescription) => prescription !== null
        );

        // Set the list of filtered prescriptions
        setPrescription(filteredPrescriptions as Prescription[]);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    if (id) {
      fetchPrescriptions();
    }
  }, [id]);

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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/patients/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patient),
        });
        if (response.ok) {
          alert("Patient deleted successfully!");
        } else {
          alert("Failed to delete patient.");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  const handleShowModal = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleHideModal = () => {
    setShowPrescriptionModal(false);
  };

  const handleSavePrescription = async () => {
    if (selectedPrescription) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/prescriptions/${selectedPrescription.rx_number}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedPrescription),
        });
        if (response.ok) {
          alert("Prescription updated successfully!");
          setShowPrescriptionModal(false);
        } else {
          alert("Failed to update prescription.");
        }
      } catch (error) {
        console.error("Error updating prescription:", error);
      }
    }
  };

  const handleDeletePrescription = async () => {
    if (selectedPrescription && window.confirm("Are you sure you want to delete this prescription?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/prescriptions/${selectedPrescription.rx_number}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Prescription deleted successfully!");
          setPrescription(prev => prev.filter(p => p.rx_number !== selectedPrescription?.rx_number));
          setShowPrescriptionModal(false);
        } else {
          alert("Failed to delete prescription.");
        }
      } catch (error) {
        console.error("Error deleting prescription:", error);
      }
    }
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

  const handleNewRxClick = () => {
    navigate("/new-rx");
  };

  return (
    <div className={styles.patientProfilePage}>
      <div className={styles.patientProfileTitle}>
        <h3>Patient Profile</h3>
        <hr></hr>
      </div>
      {patient ? (
        <div>
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
                    value={patient.first_name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>Last Name:</p>
                  <input
                    type="text"
                    name="last_name"
                    value={patient.last_name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>DOB:</p>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={patient.date_of_birth}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>Phone Number:</p>
                  <input
                    type="text"
                    name="phone_number"
                    value={patient.phone_number}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>Street:</p>
                  <input
                    type="text"
                    name="street"
                    value={patient.street}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>City:</p>
                  <input
                    type="text"
                    name="city"
                    value={patient.city}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>State:</p>
                  <input
                    type="text"
                    name="state"
                    value={patient.state}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>Zipcode:</p>
                  <input
                    type="text"
                    name="zipcode"
                    value={patient.zipcode}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <label>
                  <p>Allergies:</p>
                  <input
                    type="text"
                    name="allergies"
                    value={patient.allergies}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  ></input>
                </label>
                <hr></hr>
                <div className={styles.GeneralButtonContainer}>
                  <button type="button" onClick={handleEditToggle}>
                    {isEditing ? "Save Information" : "Edit Information"}
                  </button>
                  <button type="submit" onClick={handleNewRxClick}>
                    New Rx
                  </button>
                  <button type="submit" onClick={handleDelete}>
                    Delete Patient
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
                      value={patient.insurance_name}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    ></input>
                  </label>
                  <label>
                    <p>Member ID:</p>
                    <input
                      type="text"
                      name="insurance_member_id"
                      value={patient.insurance_member_id}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    ></input>
                  </label>
                  <label>
                    <p>Insurance Group Number:</p>
                    <input
                      type="text"
                      name="insurance_group_number"
                      value={patient.insurance_group_number}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    ></input>
                  </label>
                  <label>
                    <p>BIN:</p>
                    <input
                      type="text"
                      name="insurance_rx_bin"
                      value={patient.insurance_rx_bin}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    ></input>
                  </label>
                  <label>
                    <p>PCN:</p>
                    <input
                      type="text"
                      name="insurance_rx_pcn"
                      value={patient.insurance_rx_pcn}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    ></input>
                  </label>
                  <label>
                    <p>Person Code:</p>
                    <input
                      type="text"
                      name="insurance_person_code"
                      value={patient.insurance_person_code}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    ></input>
                  </label>
                  <hr></hr>
                </div>
              </div>

              <div className={styles.patientPrescriptions}>
                <h3>Prescriptions</h3>
                <div className={styles.prescriptionTable}>
                  <div className={styles.tableHeader}>
                    <div>Rx Number</div>
                    <div>Medication</div>
                    <div>Directions</div>
                    <div>Quantity</div>
                    <div>Refills</div>
                    <div>Status</div>
                    <div>Prescribed Date</div>
                  </div>
                  {prescription.map((prescription) => (
                    <div
                      key={prescription.rx_number}
                      className={styles.tableRow}
                      onClick={() => handleShowModal(prescription)}
                    >
                      <div>{prescription.rx_number}</div>
                      <div>{prescription.medication_name}</div>
                      <div>{prescription.directions}</div>
                      <div>{prescription.quantity}</div>
                      <div>{prescription.refills}</div>
                      <div>{prescription.status}</div>
                      <div>{prescription.prescribed_date}</div>
                    </div>
                  ))}
                </div>
              </div>
              {selectedPrescription && (
                <PrescriptionModal
                  show={showPrescriptionModal}
                  onHide={handleHideModal}
                  prescription={selectedPrescription}
                  onSave={handleSavePrescription}
                  onDelete={handleDeletePrescription}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading patient data...</p>
      )}
    </div>
  );
};

export default PatientProfile;
