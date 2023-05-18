// Importing react with use state
// https://stackoverflow.com/questions/63705317/usestate-is-not-defined-no-undef-react
// Video does this too

import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/nav";
import HomePage from "./pages/HomePage";
import ParksPage from "./pages/ParksPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import BiologicalAssetsPage from "./pages/BiologicalAssetsPage";
import EmployeesPage from "./pages/EmployeesPage";
import TasksAssignedPage from "./pages/TasksAssignedPage";
import EmployeeTasksPage from "./pages/EmployeeTasksPage";
import TaskCategoriesPage from "./pages/TaskCategoriesPage";
import SpeciesPage from "./pages/SpeciesPage";
import DietsPage from "./pages/DietsPage";
import HabitatsPage from "./pages/HabitatsPage";
import FacilityTypesPage from "./pages/FacilitiesPage";
import JobClassificationsPage from "./pages/JobClassificationsPage";

// Establish common variable for host for easy edits
const hostURL = 'http://localhost:3001';

// React Application
function App() {
  
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
                <Route path="/" element={<HomePage hostURL={hostURL} />} />
                <Route path="/Parks" element={<ParksPage hostURL={hostURL} />} />
                <Route path="/Facilities" element={<FacilitiesPage hostURL={hostURL} />} />
                <Route path="/BiologicalAssets" element={<BiologicalAssetsPage hostURL={hostURL} />} />
                <Route path="/Employees" element={<EmployeesPage hostURL={hostURL} />} />
                <Route path="/TasksAssigned" element={<TasksAssignedPage hostURL={hostURL} />} />
                <Route path="/EmployeeTasks" element={<EmployeeTasksPage hostURL={hostURL} />} />
                <Route path="/TaskCategories" element={<TaskCategoriesPage hostURL={hostURL} />} />
                <Route path="/Species" element={<SpeciesPage hostURL={hostURL} />} />
                <Route path="/Diets" element={<DietsPage hostURL={hostURL} />} />
                <Route path="/Habitats" element={<HabitatsPage hostURL={hostURL} />} />
                <Route path="/FacilityTypes" element={<FacilityTypesPage hostURL={hostURL} />} />
                <Route path="/JobClassifications" element={<JobClassificationsPage hostURL={hostURL} />} />
            </Routes>
        </section>
      </main>
      <footer>&copy;2023 Taylor Jordan and Nicholas Schmidt (Team: Jurassic Parks and Recreation)</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
