import { Route } from "react-router-dom";
import PrescriberProfile from "./PrescriberProfile";
import AddPrescriber from "./AddPrescriber";
import PrescriberSearch from "./PrescriberSearch";

function Prescriber() {
  return (
    <div>
      <Route path="prescriber/search" element={<PrescriberSearch />} />
      <Route path="prescriber/profile/:id" element={<PrescriberProfile />} />
      <Route path="prescriber/add" element={<AddPrescriber />} />
    </div>
  );
}

export default Prescriber;
