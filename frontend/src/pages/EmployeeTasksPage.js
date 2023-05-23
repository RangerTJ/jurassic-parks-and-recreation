// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function EmployeeTasksPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // EmployeeTasks SQL Endpoints
    const getEmployeeTasksURL = hostURL + '/api/getEmployeeTasks';
    const deleteEmployeeTasksURL = hostURL + '/api/deleteEmployeeTasks/';

    // Employee Task Table Functions
    const [employeeTaskList, setEmployeeTaskList] = useState([])

    // READ Populate Biological Asset Table
    useEffect(()=> {
        getEmployeeTasks();
    }, [])

    // DELETE - Deletes target Employee Task and Refreshes Table
    const delEmployeeTask = async (delID) => {
        try {
          if (window.confirm(`Are you sure you want to remove Task #${delID}?`)) {
            await Axios.delete(deleteEmployeeTasksURL + delID);
            const response = await Axios.get(getEmployeeTasksURL);
            setEmployeeTaskList(response.data);
            console.log(response.data);
            alert(`Employee Task #${delID} has been removed from the database.`);
          }
        }   catch (error) {
            console.error('Error deleting employee task.', error);
        }
      };
  
    // Fully Populate Employee Task List
    const getEmployeeTasks = async ()=> {
        try {
            const response = await Axios.get(getEmployeeTasksURL)
            setEmployeeTaskList(response.data)
        } catch (error) {
            console.error('Error generating the view table.', error);
        }
    }

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const navToUpdate = (updateVal) => {
        const state = {
        id: updateVal.idEmployeeTask,
        oldTask: updateVal.taskName,
        oldEmployee: updateVal.employeeUsername,
        oldCategory: updateVal.categoryName,
        oldHours: updateVal.taskHoursWorked,
        oldCost: updateVal.empTaskCost,
        oldStart: updateVal.empTaskStart,
        oldEnd: updateVal.empTaskEnd
        };
            navTo("/EmployeeTasksUpdate", {state});
        };

    return (
        <>
            <h2>Employee Tasks</h2>
            <article>
                <h3>Add New Employee Task</h3>
                <p>
                    Employee Tasks manage Employee interactions
                    with Assigned Tasks by documenting their work contributions towards the task. 
                    They are necessary to handle the many-to-many
                    relationship between Employees and Assigned Tasks, in addition to providing a way 
                    to track labor and costs in the process. Each "Employee Task" entity represents 
                    a report with a unique ID that shows work information performed for an existing Task.
                </p>
                <p>
                    Click the "Create" button below to add a new Employee Task to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/EmployeeTasksAdd")}>Create</button></p>
                </div>
            </article>
            <article>
                <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the asset's corresponding column to enter the edit menu or delete
                    it from the database, respectively.
                </p>
            </article>
            <article>
                <h3>View Employee Tasks</h3>
                <p>
                    The table below shows existing information for Employee Task entities and includes
                    buttons to update or delete them.
                </p>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>Report</th>
                            <th>Employee</th>  
                            <th>Category</th>
                            <th>Hours Worked</th>
                            <th>Total Cost</th>
                            <th>Timestamps</th>
                        </tr>
                        {employeeTaskList.map((val, index)=> {
                            // Convert cost to USD or set to 0 USD if there is a null entry
                            const taskCost = val.empTaskCost ? val.empTaskCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                            return (
                                <tr key={index}>
                                    <td>
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delEmployeeTask(val.idEmployeeTask)}}>*</button></div>
                                    </td>
                                    <td>
                                        <div><strong>Report #{val.idEmployeeTask}</strong></div>
                                        <div>for '{val.taskName}'</div>
                                    </td>
                                    <td>{val.contributingEmployee}</td>
                                    <td>{val.categoryName}</td>
                                    <td>{val.taskHoursWorked}</td>
                                    <td className="tableDescription">{taskCost}</td>
                                    <td className="tableDescription">
                                        <ul>
                                            <li><strong>Start:</strong> {val.empTaskStart}</li>
                                            <li><strong>End:</strong> {val.empTaskEnd}</li>
                                        </ul>
                                    </td>
                                </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    );
}

export default EmployeeTasksPage;