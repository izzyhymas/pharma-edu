import { Route } from "react-router-dom";
import PatientSearch from "./PatientSearch";
import PatientProfile from "./PatientProfile";
import Prescription from "../Prescription";
import AddPatient from "./AddPatient";

function Patient() {
  return (
    <div>
      <Route path="patient/search" element={<PatientSearch />} />
      <Route path="patient" element={<PatientProfile />} />
      <Route path="patient/prescription" element={<Prescription />} />
      <Route path="patient/add" element={<AddPatient />} />
    </div>
  );
}

export default Patient;
