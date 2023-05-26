// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './App.css';
import logo from './images/logo.png'

// Main Page Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/nav";  // Done
import HomePage from "./pages/HomePage";  // Done
import ParksPage from "./pages/ParksPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import BiologicalAssetsPage from "./pages/BiologicalAssetsPage";  // Done
import EmployeesPage from "./pages/EmployeesPage";  // Done
import TasksAssignedPage from "./pages/TasksAssignedPage";  // Done
import EmployeeTasksPage from "./pages/EmployeeTasksPage";
import TaskCategoriesPage from "./pages/TaskCategoriesPage";  // Technically full CRUD, but looks horrible/no form pages yet
import SpeciesPage from "./pages/SpeciesPage";
import DietsPage from "./pages/DietsPage";
import HabitatsPage from "./pages/HabitatsPage";
import FacilityTypesPage from "./pages/FacilityTypesPage";
import JobClassificationsPage from "./pages/JobClassificationsPage";

// Form Page Imports
import ParksAddForm from "./forms/ParksAddForm";
import ParksUpdateForm from "./forms/ParksUpdateForm";
import BiologicalAssetsAddForm from "./forms/BiologicalAssetsAddForm";
import BiologicalAssetsUpdateForm from "./forms/BiologicalAssetsUpdateForm";
import EmployeeTasksAddForm from "./forms/EmployeeTasksAddForm";
import EmployeeTasksUpdateForm from "./forms/EmployeeTasksUpdateForm";
import EmployeesAddForm from "./forms/EmployeesAddForm";
import EmployeesUpdateForm from "./forms/EmployeesUpdateForm";
import JobClassificationsAddForm from "./forms/JobClassificationsAddForm";
import JobClassificationsUpdateForm from "./forms/JobClassificationsUpdateForm";
import FacilitiesAddForm from "./forms/FacilitiesAddForm";
import FacilitiesUpdateForm from "./forms/FacilitiesUpdateForm";
import FacilityTypesAddForm from "./forms/FacilityTypesAddForm";
import FacilityTypesUpdateForm from "./forms/FacilityTypesUpdateForm";
import TasksAssignedAddForm from "./forms/TasksAssignedAdd"; // Done
import TasksAssignedUpdateForm from "./forms/TasksAssignedUpdate";
import TaskCategoriesAddForm from "./forms/TaskCategoriesAddForm";
import TaskCategoriesUpdateForm from "./forms/TaskCategoriesUpdateForm";


// React Application
function App() {
    const hostURL = process.env.REACT_APP_FRONTEND_URL + process.env.REACT_APP_BACKEND_PORT;
    
  // HTML Rendering Structure
  return (
    <div className="App">
      <BrowserRouter>
      <header>
        <h1 className="headerBox">Jurassic Parks and Recreation <img className="headerLogo" src={logo} alt="Test"></img></h1>
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
                <Route path="/EmployeesAdd" element={<EmployeesAddForm hostURL={hostURL} />} />
                <Route path="/EmployeesUpdate" element={<EmployeesUpdateForm hostURL={hostURL} />} />
                <Route path="/FacilitiesAdd" element={<FacilitiesAddForm hostURL={hostURL} />} />
                <Route path="/FacilitiesUpdate" element={<FacilitiesUpdateForm hostURL={hostURL} />} />
                <Route path="/FacilityTypesAdd" element={<FacilityTypesAddForm hostURL={hostURL} />} />
                <Route path="/FacilityTypesUpdate" element={<FacilityTypesUpdateForm hostURL={hostURL} />} />
                <Route path="/TasksAssignedAdd" element={<TasksAssignedAddForm hostURL={hostURL} />} />
                <Route path="/TasksAssignedUpdate" element={<TasksAssignedUpdateForm hostURL={hostURL} />} />
                <Route path="/TaskCategoriesAdd" element={<TaskCategoriesAddForm hostURL={hostURL} />} />
                <Route path="/TaskCategoriesUpdate" element={<TaskCategoriesUpdateForm hostURL={hostURL} />} />
                <Route path="/ParksAdd" element={<ParksAddForm hostURL={hostURL} />} />
                <Route path="/ParksUpdate" element={<ParksUpdateForm hostURL={hostURL} />} />
                <Route path="/JobClassificationsAdd" element={<JobClassificationsAddForm hostURL={hostURL} />} />
                <Route path="/JobClassificationsUpdate" element={<JobClassificationsUpdateForm hostURL={hostURL} />} />

            </Routes>
        </section>
      </main>
      <footer>&copy;2023 Taylor Jordan and Nicholas Schmidt (Team: Jurassic Parks and Recreation)</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
