import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

import PatientSearch from "./pages/Patient/PatientSearch";
import PatientProfile from "./pages/Patient/PatientProfile";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Routes>
          {/* {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          ))} */}
          <Route path="something" element={<PatientProfile />}>
            <Route path="profile" element={<PatientSearch />} />
          </Route>
        </Routes>
      </div>
      {/* Renders Nav component based on current path */}
      {location.pathname !== "/login" && <Nav />}
    </>
  );
};

export default App;
