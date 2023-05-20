// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorTasksAssigned from "../components/selectorTasksAssigned";


////////////////
// TO DO: ALL //
////////////////

// HostURL Passed from App.js
function EmployeeTasksAddForm ({hostURL}) {

    // BiologicalAssets SQL Endpoints
    const createEmployeeTasksURL = hostURL + '/api/insertEmployeeTasks';
    const navTo = useNavigate();

    // Emp Task States for the Form
    const [taskName, setTaskName] = useState('')
    const [employeeUsername, setEmployeeUsername] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [taskHoursWorked, setTaskHoursWorked] = useState('')
    const [empTaskCost, setEmpTaskCost] = useState('')
    const [empTaskStart, setEmpTaskStart] = useState('')
    const [empTaskEnd, setEmpTaskEnd] = useState('')

    // CREATE - Insert New Bio Asset then return to asset home (only if all state variables are not null)
    const submit = () => {
        if (taskName && employeeUsername && categoryName && taskHoursWorked && empTaskCost && empTaskStart && empTaskEnd) {
        Axios.post(createEmployeeTasksURL, {
            taskName: taskName,
            employeeUsername: employeeUsername,
            categoryName: categoryName,
            taskHoursWorked: taskHoursWorked,
            empTaskCost: empTaskCost,
            empTaskStart: empTaskStart,
            empTaskEnd: empTaskEnd,
        });
        alert(`A task report for ${employeeUsername}'s ${categoryName} work on ${taskName} has been added to the database!`);
        navTo('/EmployeeTasks');
        } else {
            alert("Please fill out all required fields and try again.")
        };
    };

    return (
        <>
            <h2>Add Employee Task</h2>
            <article>
                <p>
                    Please fill out this form to document an employee's work towards an assigned task within our managed park system. 
                    Click the "Add Report" button below when you are ready to submit.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <SelectorTasksAssigned  hostURL={hostURL} taskName={taskName} setTaskName={setTaskName} isRequired={true} autoFocus={true}/>
                            </div>
                            {/* <div className="selectorP">
                                <div><label htmlFor="bioAssetName">Name</label></div>
                                <input 
                                    type="text" 
                                    name="bioAssetName"
                                    placeholder="Ex. Meadow Stomper" 
                                    required 
                                    onChange={(e) => {setName(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <SelectorFacilities hostURL={hostURL} facility={facility} setFacility={setFacility} isRequired={true}/>
                            </div> */}
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Report</button></p>
                </div>
            </article>
        </>
    );
}

export default EmployeeTasksAddForm;