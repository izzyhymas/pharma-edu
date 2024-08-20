import Doctor from "./pages/Doctor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewRX from "./pages/NewRx";
import Patient from "./pages/Patient/Patient";
import Queue from "./pages/Queue";
import RXItem from "./pages/RxItem";
import PatientProfile from "./pages/Patient/PatientProfile";
import Prescription from "./pages/Prescription";

interface PharmacyRoutes {
  name: string;
  path: string;
  component: React.FC;
}

const routes: PharmacyRoutes[] = [
  {
    name: "Home",
    path: "/home",
    component: Home
  },
  {
    name: "New RX",
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
    path: "/patients",
    component: Patient,
  },
  {
    name: "Doctor",
    path: "/doctors",
    component: Doctor,
  },
  {
    name: "RX Item",
    path: "/rx-item",
    component: RXItem,
  },
  {
    name: "Login",
    path:"/login",
    component: Login
  },
];

export default routes;
