import { Route } from "react-router-dom";
import MedicationSearch from "./MedicationSearch";
import MedicationProfile from "./MedicationProfile";
import AddMedication from "./AddMedication";

function Medication() {
  return (
    <div>
      <Route path="rx-item/search" element={<MedicationSearch />} />
      <Route path="rx-item/profile/:id" element={<MedicationProfile />} />
      <Route path="rx-item/add" element={<AddMedication />} />
    </div>
  );
}

export default Medication;
