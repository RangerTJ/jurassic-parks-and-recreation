// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
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
    const [facility, setFacility] = useState(null);
    const [bioAssetName, setBioAssetName] = useState(null);
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskStart, setTaskStart] = useState('')
    const [taskEnd, setTaskEnd] = useState('')


    // CREATE - Insert New Task then return to Tasks Assigned (only if all required state variables are not null)
    const submit = async () => {
        try {
            if (facility && taskName && taskDescription && taskStart) {
                let finalTaskEnd = taskEnd === '' ? null : taskEnd;
    
                Axios.post(createTasksAssignedURL, {
                    facility: facility,
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
            <h2>Add Task</h2>
            <article>
                <p>
                    To add a new Task to the database, enter values for its attributes below
                    and click the "Add Task" button.
                </p>
                <p>
                    Only fill out the "Date Ended" field once all work on the task has been fully completed.
                    This includes administrative aspects such as recording all Employee Task reports and adding
                    them to this database. Once a "Date Ended" value is added, this Task will no longer be
                    used to populate the the Tasks Assigned selector on the Employee Tasks forms (to avoid cluttering
                    up the select UI).
                </p>
                <p>
                    If there is an emergency need to add an Employee Task report after an assigned
                    Task has been given an end date, you should edit the Task to have a null end date. Once any new
                    Employee Task reports are logged, and it is confirmed that there are no more to add, the end date
                    here should be set to the date the last Employee Task report was processed in the database.
                </p>
                <form>
                    <fieldset>
                        <legend>Details</legend>
                            <div className="selectorP">
                                <SelectorFacilities hostURL={hostURL} facility={facility} setFacility={setFacility} isRequired={true} autoFocus={true}/>
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
                    <p><button onClick={submit}>Add Task</button></p>
                </div>
            </article>
        </>
    );
}

export default TasksAssignedAddForm;