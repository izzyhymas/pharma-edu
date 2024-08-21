import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

import PatientSearch from "./pages/Patient/PatientSearch";
import PatientProfile from "./pages/Patient/PatientProfile";
import Prescription from "./pages/Prescription";
import AddPatient from "./pages/Patient/AddPatient";

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
          <Route path="patient" element={<PatientProfile />} />
          <Route path="patient/search" element={<PatientSearch />} />
          <Route path="patient/prescription" element={<Prescription />} />
          <Route path="patient/add" element={<AddPatient />} />
        </Routes>
      </div>
      {/* Renders Nav component based on current path */}
      {location.pathname !== "/login" && <Nav />}
    </>
  );
};

export default App;
