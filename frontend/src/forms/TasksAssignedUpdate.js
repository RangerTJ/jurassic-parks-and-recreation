// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorFacilities from "../components/selectorFacilities";
import SelectorBiologicalAssets from "../components/selectorBiologicalAssets";


// HostURL Passed from App.js
function TasksAssignedUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { oldFacilityName, oldBiologicalAsset, oldTaskName, oldTaskDescription, oldTaskStart, oldTaskEnd, id } = location.state;

    // BiologicalAssets SQL Endpoints
    const updateTasksAssignedURL = hostURL + '/api/updateTasksAssigned';
    const navTo = useNavigate();

    // Bio Asset States for the Form (2x arrays for select menus + 3x values to submit)
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
        setTaskStart(oldTaskStart);
        setTaskEnd(oldTaskEnd);
    }, [])

    // UPDATE - Submit Changes to a Bio Asset then return to Asset home
    const updateTaskAssigned = async () => {

        if (taskName && facility && taskDescription && taskStart) {
        
        try {
            const res = await Axios.put(updateTasksAssignedURL, {

            facilityName: facility,
            bioAssetName: bioAssetName,
            taskName: taskName,
            taskDescription: taskDescription,
            taskStart: taskStart,
            taskEnd: taskEnd,
            idTaskAssigned: id
        });

        console.log(res);
        alert(`${taskName}'s database entry has been updated!`)
        navTo('/TasksAssigned');
        
        } catch(err) {
            console.error(err);
            alert("Error occured while updating.");
        }}

        else {
            alert("Please fill out all required fields and try again.")
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
                <form>
                    <fieldset>
                        <legend>Details</legend>
                            <div className="selectorP">
                                <SelectorFacilities hostURL={hostURL} facility={facility} setFacility={setFacility} isRequired={true} preSelected={oldFacilityName}/>
                                <div>Original: {oldFacilityName}</div>
                            </div>
                            <div className="selectorP">
                                <SelectorBiologicalAssets hostURL={hostURL} bioAssetName={bioAssetName} setBioAssetName={setBioAssetName} isRequired={true} preSelected={oldBiologicalAsset}/>
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
                                    autoFocus 
                                    onChange={(e) => {setTaskName(e.target.value)}
                                    }/>
                                <div>Original: {oldTaskName}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="taskDescription">Task Description</label></div>
                                <input 
                                    type="text"
                                    id="taskDescription"
                                    name="taskDescription"
                                    placeholder="Describe the Task:" 
                                    required 
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
                                    onChange={(e) => {setTaskEnd(e.target.value)}
                                    }/>
                                <div>Original: {oldTaskEnd}</div>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={updateTaskAssigned}>Update Task</button></p>
                </div>
            </article>
        </>
    );
}

export default TasksAssignedUpdateForm;