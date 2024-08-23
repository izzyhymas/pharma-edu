import { Route } from "react-router-dom";
import MedicationSearch from "./MedicationSearch";
import MedicationProfile from "./MedicationProfile";
import AddMedication from "./AddMedication";

function Medication() {
  return (
    <div>
      <Route path="medication/search" element={<MedicationSearch />} />
      <Route path="medication" element={<MedicationProfile />} />
      <Route path="medication/add" element={<AddMedication />} />
    </div>
  );
}

export default Medication;
