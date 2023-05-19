// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


////////////////
// TO DO: ALL //
////////////////

// HostURL Passed from App.js
function EmployeeTasksPage ({hostURL}) {

    // EmployeeTasks SQL Endpoints
    const getEmployeeTasksURL = hostURL + '/api/getEmployeeTasks';
    const createEmployeeTasksURL = hostURL + '/api/insertEmployeeTasks';
    const updateEmployeeTasksURL = hostURL + '/api/updateEmployeeTasks';
    const deleteEmployeeTasksURL = hostURL + '/api/deleteEmployeeTasks/';

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
                    <p><button onclick="location.href='forms/employeeTasksAdd.html'">Create</button></p>
                </div>
            </article>

            <article>
                <h3>View Employee Tasks</h3>
                <p>
                    The table below shows existing information for Employee Task entities and includes
                    buttons to update or delete them.
                </p>
                <div class="scrollableTable">
                    <table>
                        <tr>
                            <th>ID</th>
                            {/* <!-- First/Last name retrieval based on username for task --> */}
                            <th>Task Name</th>
                            {/* <!-- First/Last name retrieval based on username for task --> */}
                            <th>Employee</th>  
                            <th>Category</th>
                            <th>Hours Worked</th>
                            <th>Total Cost</th>
                            <th>Start</th>
                            <th>End</th>

                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        <tr>
                            <td>Ex. 1</td>
                            <td>Ex. #1 - Fix Doors to Visitor Center</td>
                            <td>Ex. #3 - Ralph Wiggum</td>
                            <td>Ex. Maintenance</td>
                            <td>Ex. 5</td>
                            <td>Ex. 200.00</td>
                            <td>Ex. 3/1/2023</td>
                            <td>Ex. 3/1/2023</td>

                            <td><button onclick="location.href='forms/employeeTasksUpdate.html'">Update</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    </table>
                </div>
            </article>
        </>
    );
}

export default EmployeeTasksPage;