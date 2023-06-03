// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorTasksAssigned from "../components/selectorTasksAssigned";
import SelectorEmployees from "../components/selectorEmployees";
import SelectorTaskCategories from "../components/selectorTaskCategories";


// HostURL Passed from App.js
function EmployeeTasksAddForm ({hostURL}) {

    // EmployeeTasks SQL Endpoints
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

    // CREATE - Insert New Employee Task then return to EmployeeTasks Page
    const submit = async () => {
        // Convert start/end date strings to date values for comparison
        const trueStart = new Date(empTaskStart);
        const trueEnd = new Date(empTaskEnd)

        try {
            if (trueStart > trueEnd) {
                alert("No time machine shenanigans, bucko! Fix the start/end dates.");
            } else if (taskName && employeeUsername && categoryName && taskHoursWorked && empTaskCost && empTaskStart && empTaskEnd) {
                await Axios.post(createEmployeeTasksURL, {
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
                }
        } catch(error) {
            console.error('Error inserting Employee Task Report.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Employee Task Record</h2>
            <article>
                <p>
                    Please fill out this form to document an employee's work towards an assigned task within our managed park system. 
                    Click the "Add Report" button below when you are ready to submit.
                </p>
                <p>
                    For the "Category" field, please select the overall most relevant category to the work performed for this report.
                    If multi-disciplinary work was performed, please submit separate reports for each category of work performed by the
                    employee on the assigned task. For example, if an employee assigned to take care of a specific asset performed veterinary work,
                    but also had to perform security work due to unexpected asset behavior, the veterinary and security work should be documented
                    separately in order to give the best estimate of labor and costs involved in the different aspects managing our parks.
                </p>
                <p>
                    For the "Costs" field, please include all costs associated with the work performed related to this labor report.
                    This includes cost of labor, supplies used, fuel costs, fees, or any other incidental expenses that were involved
                    in the reported work performed for the related assigned task. This is important, as it gives JP&R a way to analyze
                    total costs related to different sectors.
                </p>
                <p>
                    Please be aware that the Tasks select menu will only show tasks that have not yet been "completed" (that is, given an end date).
                    This is done to avoid cluttering up the interface. To add an Employee Task report entry to the database for a completed Task,
                    you will need to navigate to the Assigned Tasks page and set the Task's ending date to null. It can then be selected.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <SelectorTasksAssigned  hostURL={hostURL} taskName={taskName} setTaskName={setTaskName} isRequired={true} autoFocus={true}/>
                            </div>
                            <div className="selectorP">
                                <SelectorEmployees  hostURL={hostURL} employeeUsername={employeeUsername} setEmployeeUsername={setEmployeeUsername} isRequired={true} autoFocus={false}/>
                            </div>
                            <div className="selectorP">
                                <SelectorTaskCategories  hostURL={hostURL} categoryName={categoryName} setCategoryName={setCategoryName} isRequired={true} autoFocus={false}/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="hoursWorked">Hours Worked</label></div>
                                <input 
                                    type="number"
                                    id="hoursWorked"
                                    name="hoursWorked"
                                    placeholder="Ex. 20" 
                                    required 
                                    onChange={(e) => {setTaskHoursWorked(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="empTaskCost">Costs</label></div>
                                <input 
                                    type="number"
                                    id="empTaskCost"
                                    name="empTaskCost"
                                    placeholder="Ex. 2000.00" 
                                    required 
                                    onChange={(e) => {setEmpTaskCost(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="empTaskStart">Date Started</label></div>
                                <input 
                                    type="date"
                                    id="empTaskStart"
                                    name="empTaskStart"
                                    required 
                                    onChange={(e) => {setEmpTaskStart(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="empTaskStart">Date Completed</label></div>
                                <input 
                                    type="date"
                                    id="empTaskEnd"
                                    name="empTaskEnd"
                                    required 
                                    onChange={(e) => {setEmpTaskEnd(e.target.value)}
                                    }/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Report</button> <button onClick={()=> navTo('/EmployeeTasks')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default EmployeeTasksAddForm;