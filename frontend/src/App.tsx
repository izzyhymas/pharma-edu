import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

import PatientSearch from "./pages/Patient/PatientSearch";
import PatientProfile from "./pages/Patient/PatientProfile";
import AddPatient from "./pages/Patient/AddPatient";

import PrescriberSearch from "./pages/Prescriber/PrescriberSearch";
import PrescriberProfile from "./pages/Prescriber/PrescriberProfile";
import AddPrescriber from "./pages/Prescriber/AddPrescriber";

import MedicationSearch from "./pages/Medication/MedicationSearch";
import MedicationProfile from "./pages/Medication/MedicationProfile";
import AddMedication from "./pages/Medication/AddMedication";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="patient/profile/:id" element={<PatientProfile />} />
          <Route path="patient/search" element={<PatientSearch />} />
          <Route path="patient/add" element={<AddPatient />} />

          <Route path="prescriber/search" element={<PrescriberSearch />} />
          <Route path="prescriber/profile/:id" element={<PrescriberProfile />} />
          <Route path="prescriber/add" element={<AddPrescriber />} />

          <Route path="rx-item/search" element={<MedicationSearch />} />
          <Route path="rx-item/profile/:id" element={<MedicationProfile />} />
          <Route path="rx-item/add" element={<AddMedication />} />
        </Routes>
      </div>
      {/* Renders Nav component based on current path */}
      {location.pathname !== "/login" && <Nav />}
    </>
  );
};

export default App;
