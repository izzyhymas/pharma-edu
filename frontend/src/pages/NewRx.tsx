import { useState } from "react";
import styles from "./NewRx.module.css";

import search from "../assets/magnifying-glass.svg";

import PatientModal from "../components/PatientModal";
import { PatientDetails } from "../components/PatientModal";
import DoctorModal from "../components/DoctorModal";
import MedicationModal from "../components/MedicationModal";

const NewRx: React.FC = () => {
  const [formData, setFormData] = useState({
    patient_id: "",
    patient_name: "",
    prescriber_id: "",
    prescriber_name: "",
    prescribed_date: "",
    rx_item_id: "",
    medication_name: "",
    directions: "",
    quantity: "",
    quantity_dispensed: "",
    refills: "",
    tech_initials: "",
    allergies: "",
    phone_number: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  const handleShowPatientModal = () => setShowPatientModal(true);
  const handleClosePatientModal = () => setShowPatientModal(false);

  const handleShowDoctorModal = () => setShowDoctorModal(true);
  const handleCloseDoctorModal = () => setShowDoctorModal(false);

  const handleShowMedicationModal = () => setShowMedicationModal(true);
  const handleCloseMedicationModal = () => setShowMedicationModal(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePatientSelect = (patient: PatientDetails) => {
    setFormData((prevData) => ({
      ...prevData,
      patient_id: patient.id,
      patient_name: `${patient.first_name} ${patient.last_name}`,
      phone_number: patient.phone_number,
      street: patient.street,
      city: patient.city,
      state: patient.state,
      zipcode: patient.zipcode,
      allergies: patient.allergies
    }));
    handleClosePatientModal(); // Close the modal after selection
  };

  const handlePrescriberSelect = (prescriber: { id: string; name: string }) => {
    setFormData((prevData) => ({
      ...prevData,
      prescriber_id: prescriber.id,
      prescriber_name: prescriber.name,
    }));
    handleCloseDoctorModal();
  };

  const handleMedicationSelect = (medication: { id: string; name: string }) => {
    setFormData((prevData) => ({
      ...prevData,
      rx_item_id: medication.id,
      medication_name: medication.name,
    }));
    handleCloseMedicationModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Prescription created successfully");
      } else {
        console.log("Error creating prescription");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.newRxPage}>
      <div className={styles.rxPageTitle}>
        <h3>New Rx</h3>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.rxContainer}>
          <div className={styles.patientInfo}>
            <h3>Patient</h3>
            <hr />
            <div className={styles.patientInfoFields}>
              <label>
                <p>Name:</p>
                <div className={styles.searchImg}>
                  <input
                    type="text"
                    name="patient_name"
                    value={formData.patient_name}
                    readOnly
                  />
                  <img
                    src={search}
                    alt="search-image"
                    onClick={handleShowPatientModal}
                  ></img>
                </div>
              </label>
              <label>
                <p>Allergies:</p>
                <textarea
                  className="newRxTextarea"
                  name="allergies"
                  value={formData.allergies}
                  readOnly
                />
              </label>
              <hr />
              <h3>Prescriber</h3>
              <hr />
              <label>
                <p>Name:</p>
                <div className={styles.searchImg}>
                  <input
                    type="text"
                    name="prescriber_name"
                    value={formData.prescriber_name}
                    readOnly
                  />
                  <img
                    src={search}
                    alt="search-icon"
                    onClick={handleShowDoctorModal}
                  ></img>
                </div>
              </label>
              <hr />
              <h3>Date of Rx</h3>
              <hr />
              <label>
                <p>Rx Filled:</p>
                <div className={styles.dateIcon}>
                  <input
                    type="date"
                    name="prescribed_date"
                    value={formData.prescribed_date}
                    onChange={handleChange}
                  />
                </div>
              </label>
              <hr />
              <h3>Medication Information</h3>
              <hr />
              <label>
                <p>Item:</p>
                <div className={styles.searchImg}>
                  <input
                    type="text"
                    name="medication_name"
                    value={formData.medication_name}
                    onChange={handleChange}
                    readOnly
                  />
                  <img
                    src={search}
                    alt="search-icon"
                    onClick={handleShowMedicationModal}
                  ></img>
                </div>
              </label>
              <label>
                <p>Item Quantity:</p>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Dispensed:</p>
                <input
                  type="number"
                  name="quantity_dispensed"
                  value={formData.quantity_dispensed}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Refills:</p>
                <input
                  type="number"
                  name="refills"
                  value={formData.refills}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Directions:</p>
                <textarea
                  className="newRxTextarea"
                  name="directions"
                  value={formData.directions}
                  onChange={handleChange}
                />
              </label>
              <hr></hr>
            </div>
            <div className={styles.techInitialsContainer}>
              <div className={styles.techInitials}>
                <h3>Verification</h3>
                <hr />
                <label>
                  <p>Tech Initials: </p>
                  <input
                    type="text"
                    name="tech_initials"
                    value={formData.tech_initials}
                    onChange={handleChange}
                  />
                </label>
                <hr></hr>
              </div>
            </div>
          </div>

          <div className={styles.rxPageSep}></div>

          <div className={styles.printLabel}>
            <h3>Patient Information</h3>
            <hr />
            <div className={styles.displayPatientInfo}>
              <p>Name: {formData.patient_name}</p>
              <p>Phone Number: {formData.phone_number}</p>
              <p>Address: {formData.street} {formData.city} {formData.state} {formData.zipcode}</p>
            </div>
            <hr />
            <h3>Prescription</h3>
            <hr />

            <div className={styles.imageBox}></div>
              <div className={styles.labelButton}>
                <button type="submit" className={styles.buttons}>Save</button>
                <button type="button" className={styles.buttons}>Scan Rx</button>
                <button type="button" className={styles.buttons}>Print Label</button>
              </div>
          <hr></hr>
          </div>
        </div>
      </form>
      <PatientModal
        show={showPatientModal}
        handleClose={handleClosePatientModal}
        onSelectPatient={handlePatientSelect}
      />
      <DoctorModal
        show={showDoctorModal}
        handleClose={handleCloseDoctorModal}
        onSelectPrescriber={handlePrescriberSelect}
      />
      <MedicationModal
        show={showMedicationModal}
        handleClose={handleCloseMedicationModal}
        onSelectMedication={handleMedicationSelect}
      />
    </div>
  );
};

export default NewRx;
