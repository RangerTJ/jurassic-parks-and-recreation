// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function TasksAssignedPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // TasksAssigned SQL Endpoints
    const getTasksAssignedURL = hostURL + '/api/getTasksAssigned';
    const deleteTasksAssignedURL = hostURL + '/api/deleteTasksAssigned/';

    // TasksAssigned Table Functions
    const [tasksAssignedList, setTasksAssignedList] = useState([])

    // READ Populate Tasks Assigned Table
    useEffect(()=> {
        getAllTasksAssigned();
    }, [])
    

    // Update Function
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
    const delTaskAssigned = async (delID) => {
        try {
            if (window.confirm(`Are you sure you want to remove Task #${delID}?`)) {
                
                await Axios.delete(deleteTasksAssignedURL + delID)

                const mainViewResponse = await Axios.get(getTasksAssignedURL);
                setTasksAssignedList(mainViewResponse.data);
                console.log(mainViewResponse.data)
            }}
        catch (error) {
            console.error('Error deleting Task.', error);
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
                    buttons on the left side of the asset's corresponding column to enter the edit menu or delete
                    it from the database, respectively.
                </p>
            </article>

            <article>
                <h3>View Assigned Tasks</h3>
                <p>
                    The table below shows existing information for Tasks Assigned entities (that is, tasks that have been assigned for fulfillment) and includes
                    buttons to update or delete them. Information includes the facility affiliated with the task and affiliated biological asset
                    (if the task has been assigned for one).
                </p>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>ID</th>
                            <th>Task Name</th>
                            <th>Facility</th>
                            <th>Bio. Asset</th>  
                            <th>Description</th>
                            <th>Start/End</th>
                        </tr>
                        {tasksAssignedList.map((val, index) => {
                            // TODO: Figure out syntax issues with this later
                            // const startDateAbridged = val.taskStart.substring(0, 10);
                            // const endDateAbridged = val.taskEnd.substring(0, 10);
                            return (
                                <tr key={index}>
                                    <td>
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delTaskAssigned(val.idTaskAssigned)}}>*</button></div>
                                    </td>
                                    <td>{val.idTaskAssigned}</td>
                                    <td>{val.taskName}</td>
                                    <td>{val.facilityName}</td>
                                    <td>
                                        <div>ID #{val.idBiologicalAsset}</div>
                                        <div><strong>{val.bioAssetName}</strong></div>
                                        <div>{val.speciesName}</div>
                                    </td>
                                    <td className="tableDescription">{val.taskDescription}</td>
                                    <td className="tableDescription">
                                        <ul>
                                            <li>Start: {val.taskStart}</li>
                                            <li>End: {val.taskEnd}</li>
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