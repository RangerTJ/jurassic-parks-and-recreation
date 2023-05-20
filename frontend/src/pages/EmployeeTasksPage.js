// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


////////////////
// TO DO: ALL //
////////////////

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
    const delEmployeeTask = (delID) => {
        if (window.confirm(`Are you sure you want to remove Task #${delID}?`)) {
        Axios.delete(deleteEmployeeTasksURL + delID)
        .then(() => {Axios.get(getEmployeeTasksURL)
        .then((response) => {setEmployeeTaskList(response.data);
            console.log(response.data)})
        .then(alert(`Employee Task #${delID} has been removed from the database.`)
                );
            });
        }; 
    };

    // Fully Populate the Employee Task List (without filters)
    const getEmployeeTasks = ()=> {
        Axios.get(getEmployeeTasksURL)
        .then((response)=> {setEmployeeTaskList(response.data)})
    }

    // UPDATE Primer: Navigate set things to change and navigate to update page
    // https://reactrouter.com/en/main/hooks/use-navigate (passing states to next page)
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
                    relationship between Employees and Assigned Tasks, in addition to providing a way to track labor and costs in the process.
                    
                </p>
                <p>
                    Click the "Create" button below to add a new Employee Task to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/EmployeeTasksAdd")}>Create</button></p>
                </div>
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
                            <th>ID</th>
                            <th>Task Name</th>
                            <th>Employee</th>  
                            <th>Category</th>
                            <th>Hours Worked</th>
                            <th>Total Cost</th>
                            <th>Start</th>
                            <th>End</th>

                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {employeeTaskList.map((val, index)=> {
                            // Convert cost to USD or set to 0 USD if there is a null entry
                            const taskCost = val.empTaskCost ? val.empTaskCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                            return (
                                <tr key={index}>
                                    <td>{val.idEmployeeTask}</td>
                                    <td>{val.taskName}</td>
                                    <td>{val.contributingEmployee}</td>
                                    <td>{val.categoryName}</td>
                                    <td>{val.taskHoursWorked}</td>
                                    <td>{taskCost}</td>
                                    <td>{val.empTaskStart}</td>
                                    <td>{val.empTaskEnd}</td>
                                    <td><button onClick={()=> {navToUpdate(val)}}>Update</button></td>
                                    <td><button onClick={()=> {delEmployeeTask(val.idEmployeeTask)}}>Delete</button></td>
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