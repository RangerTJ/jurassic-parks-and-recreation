// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorTasksAssigned from "../components/selectorTasksAssigned";
import SelectorEmployees from "../components/selectorEmployees";


// HostURL Passed from App.js
function EmployeeTasksPage ({hostURL, deleteButtonSound}) {

    // Safe Delete Sound (error handling to prevent SFX fail from messing up CRUD operation)
    const delSound = () => {
        try {
            deleteButtonSound.play();
        } catch (error) {
            console.error("SFX Error")
        }
    }

    // Navigation Function
    const navTo = useNavigate();

    // EmployeeTasks SQL Endpoints
    const getEmployeeTasksURL = hostURL + '/api/getEmployeeTasks';
    const deleteEmployeeTasksURL = hostURL + '/api/deleteEmployeeTasks/';
    const filterEmployeeTasksByTaskNameURL = hostURL + '/api/filterEmployeeTasksByTaskName';
    const filterEmployeeTasksByEmployeeURL = hostURL + '/api/filterEmployeeTasksByEmployee';
    const filterEmployeeTasksByTaskNameAndEmployeeURL = hostURL + '/api/filterEmployeeTasksByTaskAndEmployee';

    // Employee Task Table Functions
    const [employeeTaskList, setEmployeeTaskList] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [employeeUsername, setEmployeeUsername] = useState('');

    // READ Populate Employee Task Table
    useEffect(()=> {
        getEmployeeTasks();
    }, [])

    // READ Changes to Employee Tasks Table (Filter Changes)
    useEffect(() => {
        EmpTaskFilters();
    }, [taskName, employeeUsername]);

    // Handle two filters and let them be used concurrently
    const EmpTaskFilters = async () => {
        // If both filters selected, apply return of both selections
        if(taskName && employeeUsername) {
            try {
                const response = await Axios.post(filterEmployeeTasksByTaskNameAndEmployeeURL, {taskName: taskName, employeeUsername: employeeUsername})
                setEmployeeTaskList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (taskName && employeeUsername==='') {
            // If just Tasks selected, return tasks filter
            try {
                const response = await Axios.post(filterEmployeeTasksByTaskNameURL, {taskName: taskName})
                setEmployeeTaskList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (taskName==='' && employeeUsername) {
            // If just Employees selected, return employee filter
            try {
                const response = await Axios.post(filterEmployeeTasksByEmployeeURL, {employeeUsername: employeeUsername})
                setEmployeeTaskList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        }
        // If neither filter selected, return everything
        else {
            await getEmployeeTasks();
        }
    }

    // DELETE - Deletes target Employee Task and Refreshes Table
    const delEmployeeTask = async (delID) => {
        try {
            if (window.confirm(`Are you sure you want to remove Task #${delID}?`)) {
                delSound();
                await Axios.delete(deleteEmployeeTasksURL + delID);

                const response = await Axios.get(getEmployeeTasksURL);
                setEmployeeTaskList(response.data);
                console.log(response.data);
                
                alert(`Employee Task #${delID} has been removed from the database.`);
            }
        }   catch (error) {
            console.error('Error deleting employee task.', error);
            alert('MYSQL Server Error: ' + error.response.data);
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
    // Link Accessed/Verified on 6/1/2023
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
                    <strong>Deleting</strong> a Task Assigned, Employee, or Task Category that an Employee Task report references will result
                    in the corresponding Employee Task values being set to <strong>null</strong> to retain a record
                    of the costs and labor. <strong>Updates</strong> to any of these affiliated parent entities will <strong>cascade</strong>.
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
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>deleting an EmployeeTask entry will
                    sever a link between an Employee and a Task Assigned</strong>.
                </p>
            </article>
            <article>
                <h3>View Employee Tasks</h3>
                <p>
                    The table below shows existing information for Employee Task entities and includes
                    buttons to update or delete them. You can use the Tasks selector below to filter for Employee Task records
                    that pertain to a specific Task Assigned. Select "None" to remove the filter and view the entire 
                    table of Employee Tasks. All Assigned Tasks can be filtered for.
                </p>
                <p>
                    You can use the Tasks and Employee selectors below to concurrently filter Employee Tasks by these attributes.
                    Select "None" to remove the respective filter. 
                </p>
                <div>
                    <div className="selectorP"><SelectorTasksAssigned hostURL={hostURL} setTaskName={setTaskName} taskName={taskName} isRequired={false} getAll={true}/></div>
                    <div className="selectorP"><SelectorEmployees hostURL={hostURL} setEmployeeUsername={setEmployeeUsername} employeeUsername={employeeUsername} isRequired={false}/></div>
                </div>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>Employee Task Report</th>
                            <th>Employee</th>  
                            <th>Category</th>
                            <th>Hours Worked</th>
                            <th>Total Cost</th>
                            <th>Start/End</th>
                        </tr>
                        {employeeTaskList.map((val, index)=> {
                            // Convert cost to USD or set to 0 USD if there is a null entry
                            const taskCost = val.empTaskCost ? val.empTaskCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                            const startDateAbridged = val.empTaskStart ? val.empTaskStart.substring(0, 10) : 'Issue: NULL Start';
                            const endDateAbridged = val.empTaskEnd ? val.empTaskEnd.substring(0, 10) : 'Issue: NULL End';
                            const nullableTaskName = val.taskName ? val.taskName : 'NULL'
                            const nullableEmployee = val.contributingEmployee ? val.contributingEmployee : 'NULL'
                            const nullableEmployeeUsername = val.employeeUsername ? val.employeeUsername : 'NULL'
                            const nullableType = val.categoryName ? val.categoryName : 'NULL'
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delEmployeeTask(val.idEmployeeTask)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div><strong>Report #{val.idEmployeeTask}</strong></div>
                                        <div>For '{nullableTaskName}'</div>
                                    </td>
                                    <td>
                                        <div>{nullableEmployee}</div>
                                        <div>({nullableEmployeeUsername})</div>
                                    </td>
                                    <td>{nullableType}</td>
                                    <td>{val.taskHoursWorked}</td>
                                    <td className="tableDescription">{taskCost}</td>
                                    <td className="tableDescription">
                                        <ul>
                                            <li><strong>Start:</strong> {startDateAbridged}</li>
                                            <li><strong>End:</strong> {endDateAbridged}</li>
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