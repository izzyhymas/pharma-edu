import Home from "./pages/Home";
import Login from "./pages/Login";
import MedicationSearch from "./pages/Medication/MedicationSearch";
import NewRX from "./pages/NewRx";
import PatientSearch from "./pages/Patient/PatientSearch";
import PrescriberSearch from "./pages/Prescriber/PrescriberSearch";
import Queue from "./pages/Queue";

interface PharmacyRoutes {
  name: string;
  path: string;
  component: React.FC;
}

const routes: PharmacyRoutes[] = [
  {
    name: "Home",
    path: "/",
    component: Home
  },
  {
    name: "New Rx",
    path: "/new-rx",
    component: NewRX,
  },
  {
    name: "Queue",
    path: "/queue",
    component: Queue,
  },
  {
    name: "Patient",
    path: "/patient/search",
    component: PatientSearch,
  },
  {
    name: "Prescriber",
    path: "/prescriber/search",
    component: PrescriberSearch,
  },
  {
    name: "Medication",
    path: "/rx-item/search",
    component: MedicationSearch,
  },
  {
    name: "Login",
    path:"/login",
    component: Login
  },
];

export default routes;
