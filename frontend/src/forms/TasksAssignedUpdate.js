// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorFacilities from "../components/selectorFacilities";
import SelectorBiologicalAssets from "../components/selectorBiologicalAssets";


// HostURL Passed from App.js
function TasksAssignedUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { oldFacilityName, oldBiologicalAsset, oldTaskName, oldTaskDescription, oldTaskStart, oldTaskEnd, id } = location.state;

    // Clip off time part of dates so they can pre-populate date pickers (some data loss, but probably should have just done dates instead of datetime anyways)
    const oldStartDateString = oldTaskStart ? oldTaskStart.substring(0, 10) : '';
    const oldEndDateString = oldTaskEnd ? oldTaskEnd.substring(0, 10) : '';

    // TasksAssigned SQL Endpoints
    const updateTasksAssignedURL = hostURL + '/api/updateTasksAssigned';
    const navTo = useNavigate();

    // Task Assigned States for the Form
    const [facilityName, setFacilityName] = useState('')
    const [bioAssetName, setBioAssetName] = useState('')
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskStart, setTaskStart] = useState('')
    const [taskEnd, setTaskEnd] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setFacilityName(oldFacilityName);
        setBioAssetName(oldBiologicalAsset);
        setTaskName(oldTaskName)
        setTaskDescription(oldTaskDescription);
        setTaskStart(oldStartDateString);
        setTaskEnd(oldEndDateString);
    }, [])

    // UPDATE - Submit Changes to a Task then return to TasksAssigned page
    const updateTaskAssigned = async () => {
        // Convert start/end date strings to date values for comparison
        const trueStart = new Date(taskStart);
        const trueEnd = new Date(taskEnd)

        try {
            if (trueStart > trueEnd) {
                alert("We don't yet use time machines to obtain our prehistoric assets! Fix the start/end dates.");
            } else if  (facilityName && taskName && taskDescription && taskStart) {

            // Send Null value to SQL if task is re-opened
            let taskEndVar = taskEnd
            if (taskEnd === '') {
                taskEndVar = null
            }
            
            // The actual update code
            const res = await Axios.put(updateTasksAssignedURL, {
                facilityName: facilityName,
                bioAssetName: bioAssetName,
                taskName: taskName,
                taskDescription: taskDescription,
                taskStart: taskStart,
                taskEnd: taskEndVar,
                idTaskAssigned: id
            });

            console.log(res);
            alert(`${taskName}'s database entry has been updated!`)
            navTo('/TasksAssigned');
            } else {
                alert("Please fill out all required fields and try again.");
            };
        
        } catch(error) {
            console.error(error);
            alert('MYSQL Server Error: ' + error.response.data);
        }}

    return (
        <>
            <h2>Update Task Assignment</h2>
            <article>
                <p>
                    To add a new Task to the database, enter values for its attributes below
                    and click the "Add Task" button.
                    This action will <strong>cascade</strong> to the <strong>Employee Tasks</strong> relational entity
                    that handles the many-to-many relationship between an Assigned Task and Employee by documenting a 
                    period of labor that the Employee contributed towards the Assigned Task.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Details</legend>
                            <div className="selectorP">
                                <SelectorFacilities hostURL={hostURL} facilityName={facilityName} setFacilityName={setFacilityName} isRequired={true} preSelected={oldFacilityName} autoFocus={true}/>
                                <div>Original: {oldFacilityName}</div>
                            </div>
                            <div className="selectorP">
                                <SelectorBiologicalAssets hostURL={hostURL} bioAssetName={bioAssetName} setBioAssetName={setBioAssetName} isRequired={false} preSelected={oldBiologicalAsset}/>
                                <div>Original: {oldBiologicalAsset}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskName">Task Name</label></div>
                                <input 
                                    type="text"
                                    id="taskName"
                                    name="taskName"
                                    placeholder="Name of Task" 
                                    required
                                    value={taskName}
                                    onChange={(e) => {setTaskName(e.target.value)}
                                    }/>
                                <div>Original: {oldTaskName}</div>
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
                                    value={taskDescription}
                                    onChange={(e) => {setTaskDescription(e.target.value)}
                                    }/>
                                <div>Original: {oldTaskDescription}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskStart">Date Started</label></div>
                                <input 
                                    type="date"
                                    id="taskStart"
                                    name="taskStart"
                                    required
                                    value={taskStart}
                                    onChange={(e) => {setTaskStart(e.target.value)}
                                    }/>
                                <div>Original: {oldTaskStart}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskEnd">Date Ended</label></div>
                                <input 
                                    type="date"
                                    id="taskEnd"
                                    name="taskEnd"
                                    value={taskEnd}
                                    onChange={(e) => {setTaskEnd(e.target.value)}
                                    }/>
                                <div>Original: {oldTaskEnd}</div>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={updateTaskAssigned}>Update Task</button> <button onClick={()=> navTo('/TasksAssigned')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
};

export default TasksAssignedUpdateForm;