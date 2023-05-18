// Importing react with use state
// https://stackoverflow.com/questions/63705317/usestate-is-not-defined-no-undef-react
// Video does this too

import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/nav";
import HomePage from "./pages/HomePage";
import TaskCategoryPage from "./pages/TaskCategoriesPage";


// Sampling of Dynamic Host/Server Paths for Easy Edits
const hostURL = 'http://localhost:3001';

// Park SQL Endpoints
const getParksURL = hostURL + '/api/getParks';
const createParksURL = hostURL + '/api/insertParks';
const updateParksURL = hostURL + '/api/updateParks';
const deleteParksURL = hostURL + '/api/deleteParks/';

// Facilities SQL Endpoints
const getFacilitiesURL = hostURL + '/api/getFacilities';
const createFacilitiesURL = hostURL + '/api/insertFacilities';
const updateFacilitiesURL = hostURL + '/api/updateFacilities';
const deleteFacilitiesURL = hostURL + '/api/deleteFacilities/';

// BiologicalAssets SQL Endpoints
const getBiologicalAssetsURL = hostURL + '/api/getBiologicalAssets';
const createBiologicalAssetsURL = hostURL + '/api/insertBiologicalAssets';
const updateBiologicalAssetsURL = hostURL + '/api/updateBiologicalAssets';
const deleteBiologicalAssetsURL = hostURL + '/api/deleteBiologicalAssets/';

// Employees SQL Endpoints
const getEmployeesURL = hostURL + '/api/getEmployees';
const createEmployeesURL = hostURL + '/api/insertEmployees';
const updateEmployeesURL = hostURL + '/api/updateEmployees';
const deleteEmployeesURL = hostURL + '/api/deleteEmployees/';

// TasksAssigned SQL Endpoints
const getTasksAssignedURL = hostURL + '/api/getTasksAssigned';
const createTasksAssignedURL = hostURL + '/api/insertTasksAssigned';
const updateTasksAssignedURL = hostURL + '/api/updateTasksAssigned';
const deleteTasksAssignedURL = hostURL + '/api/deleteTasksAssigned/';

// EmployeeTasks SQL Endpoints
const getEmployeeTasksURL = hostURL + '/api/getEmployeeTasks';
const createEmployeeTasksURL = hostURL + '/api/insertEmployeeTasks';
const updateEmployeeTasksURL = hostURL + '/api/updateEmployeeTasks';
const deleteEmployeeTasksURL = hostURL + '/api/deleteEmployeeTasks/';

// Species SQL Endpoints
const getSpeciesURL = hostURL + '/api/getSpecies';
const createSpeciesURL = hostURL + '/api/insertSpecies';
const updateSpeciesURL = hostURL + '/api/updateSpecies';
const deleteSpeciesURL = hostURL + '/api/deleteSpecies/';

// Diets SQL Endpoints
const getDietsURL = hostURL + '/api/getDiets';
const createDietsURL = hostURL + '/api/insertDiets';
const updateDietsURL = hostURL + '/api/updateDiets';
const deleteDietsURL = hostURL + '/api/deleteDiets/';

// Habitats SQL Endpoints
const getHabitatsURL = hostURL + '/api/getHabitats';
const createHabitatsURL = hostURL + '/api/insertHabitats';
const updateHabitatsURL = hostURL + '/api/updateHabitats';
const deleteHabitatsURL = hostURL + '/api/deleteHabitats/';

// FacilityTypes SQL Endpoints
const getFacilityTypesURL = hostURL + '/api/getFacilityTypes';
const createFacilityTypesURL = hostURL + '/api/insertFacilityTypes';
const updateFacilityTypesURL = hostURL + '/api/updateFacilityTypes';
const deleteFacilityTypesURL = hostURL + '/api/deleteFacilityTypes/';

// JobClassifications SQL Endpoints
const getJobClassificationsURL = hostURL + '/api/getJobClassifications';
const createJobClassificationsURL = hostURL + '/api/insertJobClassifications';
const updateJobClassificationsURL = hostURL + '/api/updateJobClassifications';
const JobClassificationsURL = hostURL + '/api/deleteJobClassifications/';




// React Application

function App() {
  
  

  // **************************
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
                <Route path="/" element={<HomePage />} />
                <Route path="/TaskCategories" element={<TaskCategoryPage />} />
            </Routes>
        </section>
      </main>
      <footer>&copy;2023 Taylor Jordan and Nicholas Schmidt (Team: Jurassic Parks and Recreation)</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
