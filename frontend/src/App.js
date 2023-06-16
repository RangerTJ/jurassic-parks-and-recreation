// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)

// Basic CRUD operations and React implementation (project-wide) was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023

import React from "react";
import './App.css';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import createSound from '../src/audio/jpCreate.mp3'
import updateSound from '../src/audio/jpUpdate.mp3'
import deleteSound from '../src/audio/jpDelete.mp3'

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
import HabitatsAddForm from "./forms/HabitatsAddForm";
import HabitatsUpdateForm from "./forms/HabitatsUpdateForm";
import DietsAddForm from "./forms/DietsAddForm";
import DietsUpdateForm from "./forms/DietsUpdateForm";
import SpeciesAddForm from "./forms/SpeciesAddForm";
import SpeciesUpdateForm from "./forms/SpeciesUpdateForm";

// React Application
function App() {
  const hostURL = process.env.REACT_APP_FRONTEND_URL + process.env.REACT_APP_BACKEND_PORT;
  const createButtonSound = new Audio(createSound);
  const updateButtonSound = new Audio(updateSound);
  const deleteButtonSound = new Audio(deleteSound);

  // Citation: 'Window: scrollTo() method' from mdn web docs
  // URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
  // Accessed 6/6/2023. Code syntax used to create 'scroll back to top' input.
  // Function to scroll to the top of the current page
  const returnToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
    
  // HTML Rendering Structure
  return (
    <div className="App">
      <BrowserRouter>
      <header>
        <h1 className="headerBox">Jurassic Parks and Recreation <img className="headerLogo" src={logo} alt="Test"></img></h1>
        <p className="headerP">D.I.N.O<a className="whte_rbt_obj" href="https://markhjorth.github.io/nedry/">.</a></p>
      </header>
      <Nav className="nav"/>
      <main>
        {/* Link that moves with page that you can click to return to the nav header quickly - work on all pages since it's in app.js*/}
        <Link to='#' onClick={returnToTop} className="returnToTop"><div>^<div className="topText">To</div><div className="topText">Top</div></div></Link>
        <section>
            {/* Load different page content here depending on route below */}
            <Routes>

                {/* Primary Page Routes */}
                <Route path="/" element={<HomePage hostURL={hostURL} />} />
                <Route path="/Parks" element={<ParksPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/Facilities" element={<FacilitiesPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/FacilityTypes" element={<FacilityTypesPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/Employees" element={<EmployeesPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/JobClassifications" element={<JobClassificationsPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/TasksAssigned" element={<TasksAssignedPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/EmployeeTasks" element={<EmployeeTasksPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/TaskCategories" element={<TaskCategoriesPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/BiologicalAssets" element={<BiologicalAssetsPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/Species" element={<SpeciesPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/Diets" element={<DietsPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                <Route path="/Habitats" element={<HabitatsPage hostURL={hostURL} deleteButtonSound={deleteButtonSound}/>} />
                
                {/* Form Page Routes */}
                <Route path="/BiologicalAssetsAdd" element={<BiologicalAssetsAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/BiologicalAssetsUpdate" element={<BiologicalAssetsUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/EmployeeTasksAdd" element={<EmployeeTasksAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/EmployeeTasksUpdate" element={<EmployeeTasksUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/EmployeesAdd" element={<EmployeesAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/EmployeesUpdate" element={<EmployeesUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/FacilitiesAdd" element={<FacilitiesAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/FacilitiesUpdate" element={<FacilitiesUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/FacilityTypesAdd" element={<FacilityTypesAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/FacilityTypesUpdate" element={<FacilityTypesUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/TasksAssignedAdd" element={<TasksAssignedAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/TasksAssignedUpdate" element={<TasksAssignedUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/TaskCategoriesAdd" element={<TaskCategoriesAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/TaskCategoriesUpdate" element={<TaskCategoriesUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/ParksAdd" element={<ParksAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/ParksUpdate" element={<ParksUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/JobClassificationsAdd" element={<JobClassificationsAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/JobClassificationsUpdate" element={<JobClassificationsUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/HabitatsAdd" element={<HabitatsAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/HabitatsUpdate" element={<HabitatsUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/DietsAdd" element={<DietsAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/DietsUpdate" element={<DietsUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />
                <Route path="/SpeciesAdd" element={<SpeciesAddForm hostURL={hostURL} createButtonSound={createButtonSound}/>} />
                <Route path="/SpeciesUpdate" element={<SpeciesUpdateForm hostURL={hostURL} updateButtonSound={updateButtonSound}/>} />

            </Routes>
        </section>
      </main>
      <footer>
        <div>&copy;2023 Taylor Jordan and Nicholas Schmidt</div>
        <p>
            This site was made as part of the Intro to Databases Course at Oregon State University 
            by 'Team: Jurassic Parks and Recreation Team' and is not affiliated with Jurassic Park, Jurassic World, or Universal Studios in any way. <a href="https://github.com/Raptor2k1/jurassic-parks-and-recreation" target="_blank" rel="noopener noreferrer">Check out the Project on Github!</a>
        </p>
      </footer>
      </BrowserRouter>
    </div>
  )
}

export default App;
