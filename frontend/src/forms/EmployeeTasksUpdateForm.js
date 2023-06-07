// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorTasksAssigned from "../components/selectorTasksAssigned";
import SelectorEmployees from "../components/selectorEmployees";
import SelectorTaskCategories from "../components/selectorTaskCategories";


// HostURL Passed from App.js
function EmployeeTasksUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { id, oldTask, oldEmployee, oldCategory, oldHours, oldCost, oldStart, oldEnd} = location.state;
    
    // Clip off time part of dates so they can pre-populate date pickers (some data loss, but probably should have just done dates instead of datetime anyways)
    const oldStartDateString = oldStart ? oldStart.substring(0, 10): '';
    const oldEndDateString = oldEnd ? oldEnd.substring(0, 10): '';

    // EmployeeTasks Update SQL Endpoint
    const updateEmployeeTasksURL = hostURL + '/api/updateEmployeeTasks';
    const navTo = useNavigate();

    // Emp Task States for the Form
    const [taskName, setTaskName] = useState('')
    const [employeeUsername, setEmployeeUsername] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [taskHoursWorked, setTaskHoursWorked] = useState('')
    const [empTaskCost, setEmpTaskCost] = useState('')
    const [empTaskStart, setEmpTaskStart] = useState('')
    const [empTaskEnd, setEmpTaskEnd] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setTaskName(oldTask);
        setEmployeeUsername(oldEmployee);
        setCategoryName(oldCategory);
        setTaskHoursWorked(oldHours);
        setEmpTaskCost(oldCost);
        setEmpTaskStart(oldStartDateString);
        setEmpTaskEnd(oldEndDateString);
    }, [])

    // UPDATE - Submit Changes to an Employee Task then return to Employee Tasks home (hours/cost can be zero'd in case they need to be cleared for an entry error)
    const update = async () => {
        // Convert start/end date strings to date values for comparison
        const trueStart = new Date(empTaskStart);
        const trueEnd = new Date(empTaskEnd)

        try {
            if (trueStart > trueEnd) {
                alert("We don't yet use time machines to obtain our prehistoric assets! Fix the start/end dates.");
            } else if (taskName && employeeUsername && categoryName && taskHoursWorked && empTaskCost && empTaskStart && empTaskEnd) {
                await Axios.put(updateEmployeeTasksURL, {
                    taskName: taskName,
                    employeeUsername: employeeUsername,
                    categoryName: categoryName,
                    taskHoursWorked: taskHoursWorked,
                    empTaskCost: empTaskCost,
                    empTaskStart: empTaskStart,
                    empTaskEnd: empTaskEnd,
                    idEmployeeTask: id,
                });
                alert(`A task report for ${employeeUsername}'s ${categoryName} work on ${taskName} has been updated!`)
                navTo('/EmployeeTasks');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
            console.error('Error updating Employee Task Report.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Update Employee Task Record</h2>
            <article>
                <p>
                    Make changes to this Employee Task record and click "Save" to retain them. This will update the many-to-many relational link
                    between an Employee and a Task Assigned for this work report.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Update Employee Task Report #{id}</legend>
                            <div className="selectorP">
                                <SelectorTasksAssigned  hostURL={hostURL} taskName={taskName} setTaskName={setTaskName} isRequired={true} autoFocus={true} preSelected={oldTask} getAll={true}/>
                                <div>Original: {oldTask}</div>
                            </div>
                            <div className="selectorP">
                                <SelectorEmployees  hostURL={hostURL} employeeUsername={employeeUsername} setEmployeeUsername={setEmployeeUsername} isRequired={true} autoFocus={false} preSelected={oldEmployee}/>
                                <div>Original: {oldEmployee}</div>
                            </div>
                            <div className="selectorP">
                                <SelectorTaskCategories  hostURL={hostURL} categoryName={categoryName} setCategoryName={setCategoryName} isRequired={true} autoFocus={false} preSelected={oldCategory}/>
                                <div>Original: {oldCategory}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="hoursWorked">Hours Worked</label></div>
                                <input 
                                    type="number"
                                    id="hoursWorked"
                                    name="hoursWorked"
                                    placeholder="Ex. 20"
                                    required
                                    min="0"
                                    value={taskHoursWorked}
                                    onChange={(e) => {setTaskHoursWorked(e.target.value)}
                                    }/>
                                <div>Original: {oldHours}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="empTaskCost">Costs</label></div>
                                <input 
                                    type="number"
                                    id="empTaskCost"
                                    name="empTaskCost"
                                    placeholder="Ex. 2000.00" 
                                    required
                                    min="0"
                                    value={empTaskCost}
                                    onChange={(e) => {setEmpTaskCost(e.target.value)}
                                    }/>
                                <div>Original: {oldCost}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="empTaskStart">Date Started</label></div>
                                <input 
                                    type="date"
                                    id="empTaskStart"
                                    name="empTaskStart"
                                    required
                                    value={empTaskStart}
                                    onChange={(e) => {setEmpTaskStart(e.target.value)}
                                    }/>
                                <div>Original: {oldStart}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="empTaskStart">Date Completed</label></div>
                                <input 
                                    type="date"
                                    id="empTaskEnd"
                                    name="empTaskEnd"
                                    value={empTaskEnd}
                                    required
                                    onChange={(e) => {setEmpTaskEnd(e.target.value)}
                                    }/>
                                <div>Original: {oldEnd}</div>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button> <button onClick={()=> navTo('/EmployeeTasks')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default EmployeeTasksUpdateForm;