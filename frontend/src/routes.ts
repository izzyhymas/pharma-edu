import Home from "./pages/Home";
import Login from "./pages/Login";
import NewRX from "./pages/NewRx";
import PatientSearch from "./pages/Patient/PatientSearch";
import PrescriberSearch from "./pages/Prescriber/PrescriberSearch";
import Queue from "./pages/Queue";
import RXItem from "./pages/RxItem";

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
    path: "/patient/search",
    component: PatientSearch,
  },
  {
    name: "Prescriber",
    path: "/presriber/search",
    component: PrescriberSearch,
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
