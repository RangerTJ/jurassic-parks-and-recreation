// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorFacilities from '../components/selectorFacilities';
import SelectorBiologicalAssets from '../components/selectorBiologicalAssets';


// HostURL Passed from App.js
function TasksAssignedAddForm ({hostURL}) {

    // TasksAssigned SQL Endpoints
    const createTasksAssignedURL = hostURL + '/api/insertTasksAssigned';
    const navTo = useNavigate();

    // Task States for the Form
    const [facilityName, setFacilityName] = useState(null);
    const [bioAssetName, setBioAssetName] = useState(null);
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskStart, setTaskStart] = useState('')
    const [taskEnd, setTaskEnd] = useState('')


    // CREATE - Insert New Task then return to Tasks Assigned (only if all required state variables are not null)
    const submit = async () => {
        // Convert start/end date strings to date values for comparison
        const trueStart = new Date(taskStart);
        const trueEnd = new Date(taskEnd)

        try {
            if (trueStart > trueEnd) {
                alert("We don't yet use time machines to obtain our prehistoric assets! Fix the start/end dates.");
            } else if  (facilityName && taskName && taskDescription && taskStart) {
                let finalTaskEnd = taskEnd === '' ? null : taskEnd;
    
                Axios.post(createTasksAssignedURL, {
                    facilityName: facilityName,
                    bioAssetName: bioAssetName,
                    taskName: taskName,
                    taskDescription: taskDescription,
                    taskStart: taskStart,
                    taskEnd: finalTaskEnd
                });
    
                alert(`${taskName} has been added to the database!`);
                navTo('/TasksAssigned');
    
            } else {
                alert("Please fill out all required fields and try again.");
            };
        } catch(error) {
            console.error('Error inserting Park.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Add Task Assignment</h2>
            <article>
                <p>
                    To add a new Task to the database, enter values for its attributes below
                    and click the "Add Task" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Details</legend>
                            <div className="selectorP">
                                <SelectorFacilities hostURL={hostURL} facilityName={facilityName} setFacilityName={setFacilityName} isRequired={true} autoFocus={true}/>
                            </div>
                            <div className="selectorP">
                                <SelectorBiologicalAssets hostURL={hostURL} bioAssetName={bioAssetName} setBioAssetName={setBioAssetName} isRequired={false}/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskName">Task Name</label></div>
                                <input 
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    placeholder="Name of Task" 
                                    required
                                    onChange={(e) => {setTaskName(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskDescription">Task Description</label></div>
                                <textarea
                                    type="text"
                                    id="taskDescription"
                                    name="taskDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Describe the Task:" 
                                    required
                                    onChange={(e) => {setTaskDescription(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskStart">Date Started</label></div>
                                <input 
                                    type="date"
                                    id="taskStart"
                                    name="taskStart"
                                    required 
                                    onChange={(e) => {setTaskStart(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskEnd">Date Ended</label></div>
                                <input 
                                    type="date"
                                    id="taskEnd"
                                    name="taskEnd" 
                                    onChange={(e) => {setTaskEnd(e.target.value)}
                                    }/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Task</button> <button onClick={()=> navTo('/TasksAssigned')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default TasksAssignedAddForm;