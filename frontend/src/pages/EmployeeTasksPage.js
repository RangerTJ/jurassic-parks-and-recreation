import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function EmployeeTasksPage ({hostURL}) {

    // EmployeeTasks SQL Endpoints
    const getEmployeeTasksURL = hostURL + '/api/getEmployeeTasks';
    const createEmployeeTasksURL = hostURL + '/api/insertEmployeeTasks';
    const updateEmployeeTasksURL = hostURL + '/api/updateEmployeeTasks';
    const deleteEmployeeTasksURL = hostURL + '/api/deleteEmployeeTasks/';

    return (
        <>
        
        </>
    );
}

export default EmployeeTasksPage;