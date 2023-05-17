// Importing react with use state
// https://stackoverflow.com/questions/63705317/usestate-is-not-defined-no-undef-react
// Video does this too

import React, { useEffect, useState } from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [categoryName, setCategoryName] = useState('')
  const [taskCategoryList, setTaskCategoryList] = useState([])

  const [newTaskCategory, setNewTaskCategory] = useState('')
  

  // Examples modeled from tutorial that sends post request to back end from form
  // Alert not currently working for some reason

  // READ
  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response)=> {
        setTaskCategoryList(response.data)
        console.log(response.data)
    })
  }, [])
  
  // CREATE - CURRENTLY DOES NOT UPDATE ID'S/NON-MANUAL VALUES UNTIL PAGE REFRESH - HOW TO FIX???
  const submitNewTaskCategory = () => {
    Axios.post('http://localhost:3001/api/insert', {
        categoryName: categoryName
    }).then(() => 
    {
        setTaskCategoryList([...taskCategoryList, {categoryName: categoryName}])
    });
  };

  // UPDATE - MAY NEED TO FIGURE OUT HOW TO GET ID IN HERE
  const updateTaskCategory = (idTaskCategory, categoryName) => {
    Axios.put(`http://localhost:3001/api/update`, {
        idTaskCategory: idTaskCategory,
        categoryName: newTaskCategory,
    });
    setNewTaskCategory("")  // Reset to empty string after done
  };

  // DELETE - CURRENTLY REQUIRES PAGE REFRESH TO SHOW DELETE HAPPENED
  const delTaskCategory = (delCategory) => {
    Axios.delete(`http://localhost:3001/api/delete/${delCategory}`);
  };

  return (
    <div className="App">

      <header>
        <h1>Jurassic Parks and Recreation *</h1>
        <p className="headerP">D.I.N.O<a className="whte_rbt_obj" href="https://markhjorth.github.io/nedry/">.</a></p>
      </header>
      <nav>
        <a href="index.html" >Home</a>
        <a href="parks.html" >Parks</a>
        <a href="facilities.html" >Facilities</a>
        <a href="biologicalAssets.html" >Biological Assets</a>
        <a href="employees.html" >Employees</a>
        <a href="tasksAssigned.html" >Tasks Assigned</a>
        <a href="employeeTasks.html" >Employee Tasks</a>
        <a href="taskCategories.html" >Task Categories</a>
        <a href="species.html" >Species</a>
        <a href="diets.html" >Diets</a>
        <a href="habitats.html" >Habitats</a>
        <a href="facilityTypes.html" >Facility Types</a>
        <a href="jobClassifications.html" >Job Classifications</a>
      </nav>
      <main>
        <section>
            <h2>Home</h2>
            <article>
                <h3>INSERT Test + READ from Task Categories</h3>
                    {/* Example From Tutorial */}
                    <input type="text" name="inputName" onChange={(e) => {
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
            <article>
                <h3>Financial Reports</h3>
                <p>
                    The summary tables below provide high-level overviews of current costs associated with aspects of
                    managing our system of parks and zoological attractions.
                </p>
                <h4>Cost Summary by Sector</h4>
                <div className="scrollableTable">
                    <table>
                        <tr>
                            <th>Sector</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>Administration</td>
                            <td>$200,000.00</td>
                        </tr>
                        <tr>
                            <td>Maintenance</td>
                            <td>$1,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Medical</td>
                            <td>$100,000.00</td>
                        </tr>
                        <tr>
                            <td>Research</td>
                            <td>$3,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Security</td>
                            <td>$2,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Veterinary</td>
                            <td>$1,500,000.00</td>
                        </tr>
                    </table>
                </div>
                <h4>Cost Summary by Park</h4>
                <div className="scrollableTable">
                    <table>
                        <tr>
                            <th>Park</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>Jurassic Park</td>
                            <td>$40,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Jurassic Park: San Diego</td>
                            <td>$200,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Jurassic World</td>
                            <td>$1,000,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Lockwood Manor Research Facility</td>
                            <td>$100,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Site B</td>
                            <td>$50,000,000.00</td>
                        </tr>
                    </table>
                </div>
            </article>
        </section>
    </main>
    </div>
  );
}

export default App;
