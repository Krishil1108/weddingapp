import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import OccasionDetails from "./OccasionDetails.jsx";
import GuestListPage from "./GuestListPage.jsx";
import FoodItemsList from "./FoodItemsList.jsx"; 
import DanceListPage from "./DanceListPage.jsx";
import ContractorListPage from "./ContractorListPage.jsx"; // Import ContractorListPage
import Checklist from "./Checklist.jsx"; // Import checklist.js

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/occasion/:id" element={<OccasionDetails />} />
        <Route path="/occasion/:occasionId/guest-list/:listId" element={<GuestListPage />} />
        <Route path="/occasion/:occasionId/food-items/:listId" element={<FoodItemsList />} /> 
        <Route path="/occasion/:occasionId/dance-list/:listId" element={<DanceListPage />} />
        <Route path="/occasion/:occasionId/contractor-list/:listId" element={<ContractorListPage />} /> 
        <Route path="/occasion/:occasionId/checklist/:listId" element={<Checklist />} />
      </Routes>
    </Router>
  );
};

export default App;