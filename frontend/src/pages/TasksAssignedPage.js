import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function TasksAssignedPage ({hostURL}) {

    // TasksAssigned SQL Endpoints
    const getTasksAssignedURL = hostURL + '/api/getTasksAssigned';
    const createTasksAssignedURL = hostURL + '/api/insertTasksAssigned';
    const updateTasksAssignedURL = hostURL + '/api/updateTasksAssigned';
    const deleteTasksAssignedURL = hostURL + '/api/deleteTasksAssigned/';

    return (
        <>
        
        </>
    );
}

export default TasksAssignedPage;