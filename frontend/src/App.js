// Importing react with use state
// https://stackoverflow.com/questions/63705317/usestate-is-not-defined-no-undef-react
// Video does this too

import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./components/nav";
import HomePage from "./pages/HomePage";

// import dinoHome from "./pages/home"; ... needs router dom stuff?


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

// TaskCategories SQL Endpoints
const getTaskCategoriesURL = hostURL + '/api/getTaskCategories';
const createTaskCategoriesURL = hostURL + '/api/insertTaskCategories';
const updateTaskCategoriesURL = hostURL + '/api/updateTaskCategories';
const deleteTaskCategoriesURL = hostURL + '/api/deleteTaskCategories/';

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
  // Task Category useStates
  const [categoryName, setCategoryName] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState('')
  const [taskCategoryList, setTaskCategoryList] = useState([])

  // CRUD operations modled off tutorial - CITE IN DETAIL LATER

  // READ Task Categories
  useEffect(()=> {
    Axios.get(getTaskCategoriesURL).then((response)=> {
        setTaskCategoryList(response.data)
        console.log(response.data)
    })
  }, [])
  
  // ... if we have separate pages forms for UPDATE/ADD we can not even bother, since a page refresh will happen anyways.
  // Which still leaves trying to figure out why delete doesn't work.
  // Possibly UI idea to avoid multiple pages: Use cards, and have editable fields beneath each entry, and update inputs new values
  // Might have to do with the return in the body... may only do once at page load... how to redo it? Why does it seem to load again for INSERT?
  // Troubleshooting with chatGPT (which seems kinda clueless on this). It *might* have to do with the fact that create doesn't call any variables,
  // so it can execute immediately, while the other two rely on variable returns first. So maybe we need to make them async to make it work;
  // they might be updating the table before they get stuff from the server (when it's the same). But .then should handle that so.... Ugh.

  // For some reason trying to clear text with .then(()=> {setCategoryName("")}); results in an error about reading data in my tries
  // Or maybe something like this? https://stackoverflow.com/questions/14837466/clearing-a-text-field-on-button-click
  // https://www.freecodecamp.org/news/how-to-clear-input-values-of-dynamic-form-in-react/ TO READ

  // CREATE
  const submitNewTaskCategory = () => {
    Axios.post(createTaskCategoriesURL, {
        categoryName: categoryName
    }).then(() => {Axios.get(getTaskCategoriesURL)
      .then((response)=> {setTaskCategoryList(response.data)
        console.log(response.data);
      });
    });
  };

  // UPDATE - Apparently needed to RETURN the Axios get for it to work for some reason
    const updateTaskCategory = (idTaskCategory) => {
      Axios.put(updateTaskCategoriesURL, {
        idTaskCategory: idTaskCategory,
        categoryName: newTaskCategory
      })
          .then(() => {return Axios.get(getTaskCategoriesURL);})
          .then((response) => {
            setTaskCategoryList(response.data);
            console.log(response.data);
        }
    )};

  // DELETE - Apparently sending a response from server fixed it so it refreshes automatically
  const delTaskCategory = (delCategory) => {
    Axios.delete(deleteTaskCategoriesURL + delCategory)
      .then(() => {Axios.get(getTaskCategoriesURL)
      .then((response) => {setTaskCategoryList(response.data);
        console.log(response.data);
        });
    });
  };

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
            </Routes>
            <h2>CRUD Tester</h2>
            <article>
                <h3>INSERT Test + READ from Task Categories</h3>
                    {/* Example From Tutorial */}
                    <input type="text" name="inputCategory" onChange={(e) => {
                        setCategoryName(e.target.value)
                    }}/>
                    <p><button onClick={submitNewTaskCategory}>Test Insert Task Category</button></p>

                    {/* Dynamic Table Alpha Version Test*/}
                    <div className="scrollableTable">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            {taskCategoryList.map((val)=> {
                            return (
                                <tr>
                                    <td>{val.idTaskCategory}</td>
                                    <td>{val.categoryName}</td>
                                    <td width="100px">
                                        <input type="text" onChange={(e)=> {setNewTaskCategory(e.target.value)}}></input>
                                        <button onClick={()=> {updateTaskCategory(val.idTaskCategory, val.categoryName)}}>Update</button>
                                    </td>
                                    <td width="100px"><button onClick={()=> {delTaskCategory(val.idTaskCategory)}}>Delete</button></td>
                                </tr>)
                        })}
                        </table>
                    </div>
            </article>
        </section>
    </main>
    </BrowserRouter>
    </div>
  );
}

export default App;
