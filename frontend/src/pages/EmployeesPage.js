import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function EmployeesPage ({hostURL}) {
    
    // Employees SQL Endpoints
    const getEmployeesURL = hostURL + '/api/getEmployees';
    const createEmployeesURL = hostURL + '/api/insertEmployees';
    const updateEmployeesURL = hostURL + '/api/updateEmployees';
    const deleteEmployeesURL = hostURL + '/api/deleteEmployees/';

    return (
        <>
        
        </>
    );
}

export default EmployeesPage;