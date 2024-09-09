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
  prescriptions: Prescription[];
}

interface Prescription {
  rx_number: number;
  prescriber_id: number;
  prescriber_first_name: string;
  prescriber_last_name: string;
  prescriber_type: string;
  prescribed_date: string;
  prescription_status: string;
  rx_item_name: string;
  rx_item_strength: string;
  quantity: number;
  refills: number;
  directions: string;
  patient_id: number;
  rx_item_id: number;
  quantity_dispensed: number;
  status: string;
  tech_initials: string;
}

const PatientProfile: React.FC = () => {
  // Get patient ID from URL
  const { id } = useParams<{ id: string }>();
  // State to store patient data
  const [patient, setPatient] = useState<Patient>();
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
          navigate("/patient/search");
        } else {
          alert("Failed to delete patient.");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  const handleShowModal = (prescription: Prescription) => {
    console.log("Selected Prescription:", prescription);
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleHideModal = () => {
    setShowPrescriptionModal(false);
  };

  const handleSavePrescription = async () => {
    if (selectedPrescription) {
      const payload = {
        patient_id: id, // You need to pass this if required by your backend
        prescriber_id: selectedPrescription.prescriber_id,
        prescribed_date: selectedPrescription.prescribed_date,
        rx_item_id: selectedPrescription.rx_number, // Use rx_number as rx_item_id
        directions: selectedPrescription.directions,
        quantity: selectedPrescription.quantity,
        quantity_dispensed: selectedPrescription.quantity_dispensed || 0, // Default to 0 if not provided
        refills: selectedPrescription.refills,
        status: selectedPrescription.prescription_status, // Mapping prescription_status to status
        tech_initials: selectedPrescription.tech_initials || "",
      };
  
      console.log("Payload:", payload);
  
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/prescriptions/${selectedPrescription.rx_number}`, // Use rx_number in URL
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          // Handle success
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
    if (
      selectedPrescription &&
      window.confirm("Are you sure you want to delete this prescription?")
    ) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/prescriptions/${selectedPrescription.rx_number}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Prescription deleted successfully!");
          setPatient((prev) => ({
            ...prev!,
            prescriptions: prev!.prescriptions.filter(
              (p) => p.rx_number !== selectedPrescription.rx_number
            ),
          }));
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
              <div
                className={`${styles.generalInfoFields} ${
                  isEditing ? styles.editMode : ""
                }`}
              >
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
                    className={isEditing ? styles.editMode : ""}
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
                <div className={styles.rxButtonContainer}>
                  <button type="button" onClick={handleEditToggle}>
                    {isEditing ? "Save Information" : "Edit Information"}
                  </button>
                  <button type="submit" onClick={handleDelete}>
                    Delete Patient
                  </button>
                </div>
                <hr></hr>
              </div>
            </div>

            <div className={styles.patientProfileSep}></div>

            <div className={styles.insuranceAndPrescriptions}>
              <div className={styles.insuranceInfo}>
                <h3>Insurance Information</h3>
                <hr></hr>
                <div
                  className={`${styles.insuranceInfoFields} ${
                    isEditing ? styles.editMode : ""
                  }`}
                >
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

              <section className={styles.patientPrescriptions}>
                <header className={styles.prescriptionsHeader}>
                  <h3>Prescriptions</h3>
                  <div className={styles.newRxButton}>
                    <button type="submit" onClick={handleNewRxClick}>
                      New Rx
                    </button>
                  </div>
                </header>
                <div className={styles.tableContainer}>
                  <table className={styles.prescriptionTable}>
                    <thead>
                      <tr>
                        <th>Prescribed Date</th>
                        <th>Medication</th>
                        <th>Strength</th>
                        <th>Directions</th>
                        <th>Quantity</th>
                        <th>Refills</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient.prescriptions.map((prescription) => (
                        <tr
                          key={prescription.rx_number}
                          className={styles.tableRow}
                          onClick={() => handleShowModal(prescription)}
                        >
                          <td>{prescription.prescribed_date}</td>
                          <td>{prescription.rx_item_name}</td>
                          <td>{prescription.rx_item_strength}</td>
                          <td>{prescription.directions}</td>
                          <td>{prescription.quantity}</td>
                          <td>{prescription.refills}</td>
                          <td>{prescription.prescription_status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
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
