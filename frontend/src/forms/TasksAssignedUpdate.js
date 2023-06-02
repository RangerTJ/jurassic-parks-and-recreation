// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorFacilities from "../components/selectorFacilities";
import SelectorBiologicalAssets from "../components/selectorBiologicalAssets";


// HostURL Passed from App.js
function TasksAssignedUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { oldFacilityName, oldBiologicalAsset, oldTaskName, oldTaskDescription, oldTaskStart, oldTaskEnd, id } = location.state;

    // Clip off time part of dates so they can pre-populate date pickers (some data loss, but probably should have just done dates instead of datetime anyways)
    const oldStartDateString = oldTaskStart ? oldTaskStart.substring(0, 10) : '';
    const oldEndDateString = oldTaskEnd ? oldTaskEnd.substring(0, 10) : '';

    // TasksAssigned SQL Endpoints
    const updateTasksAssignedURL = hostURL + '/api/updateTasksAssigned';
    const navTo = useNavigate();

    // Task Assigned States for the Form
    const [facility, setFacility] = useState('')
    const [bioAssetName, setBioAssetName] = useState('')
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskStart, setTaskStart] = useState('')
    const [taskEnd, setTaskEnd] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setFacility(oldFacilityName);
        setBioAssetName(oldBiologicalAsset);
        setTaskName(oldTaskName)
        setTaskDescription(oldTaskDescription);
        setTaskStart(oldStartDateString);
        setTaskEnd(oldEndDateString);
    }, [])

    // UPDATE - Submit Changes to a Task then return to TasksAssigned page
    const updateTaskAssigned = async () => {
        try {
            if (taskName && facility && taskDescription && taskStart) {

            // Send Null value to SQL if task is re-opened
            let taskEndVar = taskEnd
            if (taskEnd === '') {
                taskEndVar = null
            }
            
            // The actual update code
            const res = await Axios.put(updateTasksAssignedURL, {
                facilityName: facility,
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
                                <SelectorFacilities hostURL={hostURL} facility={facility} setFacility={setFacility} isRequired={true} preSelected={oldFacilityName} autoFocus={true}/>
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