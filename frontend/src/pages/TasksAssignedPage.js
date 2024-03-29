// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function TasksAssignedPage ({hostURL, deleteButtonSound}) {

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

    // TasksAssigned SQL Endpoints
    const getTasksAssignedURL = hostURL + '/api/getTasksAssigned';
    const deleteTasksAssignedURL = hostURL + '/api/deleteTasksAssigned/';
    const filterTasksAssignedByOpenTaskURL = hostURL + '/api/filterTasksAssignedByOpenTask'
    const filterTasksAssignedByClosedTaskURL = hostURL + '/api/filterTasksAssignedByClosedTask'

    // TasksAssigned Table Functions
    const [tasksAssignedList, setTasksAssignedList] = useState([])
    const [taskStatus, setTaskStatus] = useState([])

    // READ Populate Tasks Assigned Table
    useEffect(()=> {
        getAllTasksAssigned();
    }, [])

    // READ Changes to Filters
    useEffect(() => {
        taskFilters();
    }, [taskStatus]);

    // Selection event handler to pass on selection data to DB
    const selectionHandlerTasks = (event) => {
        setTaskStatus(event.target.value)
    };

    // Handle two filters and let them be used concurrently
    const taskFilters = async () => {
        // Return only open tasks
        if(taskStatus === 'open') {
            try {
                const response = await Axios.get(filterTasksAssignedByOpenTaskURL)
                setTasksAssignedList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (taskStatus === 'closed') {
            // Return only closed tasks
            try {
                const response = await Axios.get(filterTasksAssignedByClosedTaskURL)
                setTasksAssignedList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        }
        // If neither filter selected, return everything
        else {
            await getAllTasksAssigned();
        }
    }

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const navToUpdate = (updateVal) => {
        const state = {
            oldFacilityName:            updateVal.facilityName,
            oldBiologicalAsset:         updateVal.bioAssetName,
            oldTaskName:                updateVal.taskName,
            oldTaskDescription:         updateVal.taskDescription,
            oldTaskStart:               updateVal.taskStart,
            oldTaskEnd:                 updateVal.taskEnd,
            id:                         updateVal.idTaskAssigned
        };
        navTo("/TasksAssignedUpdate", {state});
    }

    // Fully Populate the Tasks Assigned List (without filters)
    const getAllTasksAssigned = async ()=> {
        try {
            const response = await Axios.get(getTasksAssignedURL)
            setTasksAssignedList(response.data)
        } catch (error) {
            console.error('Error!', error);
        }
    }

    // Deletes selected Task Assigned and refreshes the table
    const delTaskAssigned = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.taskName}?`)) {
                delSound();
                await Axios.delete(deleteTasksAssignedURL + delVal.idTaskAssigned)

                const mainViewResponse = await Axios.get(getTasksAssignedURL);
                setTasksAssignedList(mainViewResponse.data);
                console.log(mainViewResponse.data);
                
                alert(`${delVal.taskName} has been removed from the database.`)
        }} catch (error) {
            console.error('Error deleting Task.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    // Render Webpage
    return (
        <>
            <h2>Tasks Assigned</h2>
            <article>
                <h3>Add New Task Assignment</h3>
                <p>
                    Click the "Create" button below to add a new Task Assignment to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/TasksAssignedAdd")}>Create</button></p>
                </div>
            </article>

            <article>
                <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Employee Tasks.
                    If you <strong>delete</strong> an Assigned Task, their record in any Employee Tasks will be set to <strong>null</strong>.
                </p>
            </article>
            <article>
                <h3>View Assigned Tasks</h3>
                <p>
                    The table below shows existing information for Tasks Assigned entities (that is, tasks that have been assigned for fulfillment) and includes
                    buttons to update or delete them. Information includes the facility affiliated with the task and affiliated biological asset
                    (if the task has been assigned for one).
                </p>
                <p>
                    You can use the Task Status selector below to filter for open or closed tasks. Select "None" to remove the filter and view the entire 
                    table of Assigned Tasks. 
                </p>
                <div><label htmlFor="statusFilter">Task Status</label></div>
                <select id="statusFilter" className="selectorP" onChange={selectionHandlerTasks}>
                    <option value="">None (All Tasks)</option>
                    <option value="open">Open Tasks</option>
                    <option value="closed">Completed Tasks</option>
                </select>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>Assigned Task</th>
                            <th>Facility</th>
                            <th>Bio. Asset</th>  
                            <th>Description</th>
                            <th>Start/End</th>
                        </tr>
                        {/* Map values from SQL and handle null entries */}
                        {tasksAssignedList.map((val, index) => {
                            const startDateAbridged = val.taskStart ? val.taskStart.substring(0, 10) : 'Issue: Undefined Start Date';
                            const endDateAbridged = val.taskEnd ? val.taskEnd.substring(0, 10) + ' (End)' : 'In-Progress';
                            const nullableAssetID = val.idBiologicalAsset ? '#' + val.idBiologicalAsset : 'N/A'
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delTaskAssigned(val)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div>#{val.idTaskAssigned}</div>
                                        <div><strong>{val.taskName}</strong></div>
                                        <div>{val.parkName}</div>
                                    </td>
                                    <td>{val.facilityName}</td>
                                    <td className="tableDescription">
                                        <div>{nullableAssetID}</div>
                                        <div><strong>{val.bioAssetName}</strong></div>
                                        <div>{val.speciesName}</div>
                                    </td>
                                    <td className="tableDescription">{val.taskDescription}</td>
                                    <td className="tableDescription">
                                        <ul>
                                            <li>{startDateAbridged} (Start)</li>
                                            <li>{endDateAbridged}</li>
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

export default TasksAssignedPage;