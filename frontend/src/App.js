// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './App.css';

// Main Page Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/nav";
import HomePage from "./pages/HomePage";  // Done
import ParksPage from "./pages/ParksPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import BiologicalAssetsPage from "./pages/BiologicalAssetsPage";  // Needs Add/Update and Species Filter for Main Table
import EmployeesPage from "./pages/EmployeesPage";
import TasksAssignedPage from "./pages/TasksAssignedPage";
import EmployeeTasksPage from "./pages/EmployeeTasksPage";
import TaskCategoriesPage from "./pages/TaskCategoriesPage";  // Technically full CRUD, but looks horrible/no form pages yet
import SpeciesPage from "./pages/SpeciesPage";
import DietsPage from "./pages/DietsPage";
import HabitatsPage from "./pages/HabitatsPage";
import FacilityTypesPage from "./pages/FacilitiesPage";
import JobClassificationsPage from "./pages/JobClassificationsPage";

// Form Page Imports
import BiologicalAssetsAddForm from "./forms/BiologicalAssetsAddForm";
import BiologicalAssetsUpdateForm from "./forms/BiologicalAssetsUpdateForm";
import EmployeeTasksAddForm from "./forms/EmployeeTasksAddForm";
import EmployeeTasksUpdateForm from "./forms/EmployeeTasksUpdateForm";

// React Application
function App() {
    const hostURL = 'http://localhost:3001';
  
  // HTML Rendering Structure
  return (
    <div className="App">
      <BrowserRouter>
      <header>
        <h1>Jurassic Parks and Recreation *</h1>
        <p className="headerP">D.I.N.O<a className="whte_rbt_obj" href="https://markhjorth.github.io/nedry/">.</a></p>
      </header>
      <Nav />
      <main>
        <section>
            {/* Load different page content here depending on route below */}
            <Routes>
                {/* Primary Page Routes */}
                <Route path="/" element={<HomePage hostURL={hostURL} />} />
                <Route path="/Parks" element={<ParksPage hostURL={hostURL} />} />
                <Route path="/Facilities" element={<FacilitiesPage hostURL={hostURL} />} />
                <Route path="/FacilityTypes" element={<FacilityTypesPage hostURL={hostURL} />} />
                <Route path="/Employees" element={<EmployeesPage hostURL={hostURL} />} />
                <Route path="/JobClassifications" element={<JobClassificationsPage hostURL={hostURL} />} />
                <Route path="/TasksAssigned" element={<TasksAssignedPage hostURL={hostURL} />} />
                <Route path="/EmployeeTasks" element={<EmployeeTasksPage hostURL={hostURL} />} />
                <Route path="/TaskCategories" element={<TaskCategoriesPage hostURL={hostURL} />} />
                <Route path="/BiologicalAssets" element={<BiologicalAssetsPage hostURL={hostURL} />} />
                <Route path="/Species" element={<SpeciesPage hostURL={hostURL} />} />
                <Route path="/Diets" element={<DietsPage hostURL={hostURL} />} />
                <Route path="/Habitats" element={<HabitatsPage hostURL={hostURL} />} />
                
                {/* Form Page Routes */}
                <Route path="/BiologicalAssetsAdd" element={<BiologicalAssetsAddForm hostURL={hostURL} />} />
                <Route path="/BiologicalAssetsUpdate" element={<BiologicalAssetsUpdateForm hostURL={hostURL} />} />
                <Route path="/EmployeeTasksAdd" element={<EmployeeTasksAddForm hostURL={hostURL} />} />
                <Route path="/EmployeeTasksUpdate" element={<EmployeeTasksUpdateForm hostURL={hostURL} />} />
            </Routes>
        </section>
      </main>
      <footer>&copy;2023 Taylor Jordan and Nicholas Schmidt (Team: Jurassic Parks and Recreation)</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
