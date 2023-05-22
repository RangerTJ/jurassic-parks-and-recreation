// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

// useRef info + Blur to clear button focus after clicks
// https://www.w3schools.com/react/react_useref.asp
// https://www.w3schools.com/jsref/met_html_blur.asp

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function EmployeesPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // BiologicalAssets SQL Endpoints
    const getEmployeesURL = hostURL + '/api/getEmployees';  // TO DO - CREATE USE EFFECT AND USE STATE
    const deleteEmployeesURL = hostURL + '/api/deleteEmployees/';  // TO DO - NEED TO ADD USE STATES AND CRUD FUNCTIONS FOR THIS; INSERT/UPDATE GO ON RESPECTIVE FORM PAGES


    // Bio Asset Table Functions
    const [employeesList, setEmployeesList] = useState([])
    const [employee, setEmployee] = useState('')

    // READ Populate Biological Asset Table
    useEffect(()=> {
        getEmployees();
    }, [])

    // DELETE - Deletes target bio asset and refreshes all 3 tables
    const delEmployee = (delID) => {
        if (window.confirm(`Are you sure you want to remove Employee #${delID}?`)) {
        Axios.delete(deleteEmployeesURL + delID)
        .then(() => {Axios.get(getEmployeesURL)
        .then((response) => {setEmployeesList(response.data);
            console.log(response.data)})
        .then(alert(`Employee #${delID} has been removed from the database.`)
            );
          });
     }; 
    };

    //Populate Employee List
    const getEmployees = ()=> {
        Axios.get(getEmployeesURL)
        .then((response)=> {setEmployeesList(response.data)})
    }

    // UPDATE Primer: Navigate set things to change and navigate to update page
    // https://reactrouter.com/en/main/hooks/use-navigate (passing states to next page)
    const navToUpdate = (updateVal) => {
        const state = {
        oldLastName: updateVal.lastName,
        oldFirstName: updateVal.firstName,
        oldEmployeeUsername: updateVal.employeeUsername,
        oldJobTitle: updateVal.jobTitle,
        oldHourlyWage: updateVal.hourlyWage,
        oldEmployeePhone: updateVal.employeePhone,
        oldEmployeeEmail: updateVal.employeeEmail,
        oldEmployeeRadio: updateVal.employeeRadio,
        oldEmployeePhoto: updateVal.employeePhoto,
        oldEmployeeNote: updateVal.employeeNote,
        id: updateVal.idEmployee
    };
        navTo("/EmployeesUpdate", {state});
    }

    // Render Webpage
    return (
        <>
            <h2>Employees</h2>
            <article>
                <h3>Add New Employee</h3>
                <p>
                    Click the "Create" button below to add a new Employee to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/EmployeesAdd")}>Create</button></p>
                </div>
            </article>
            {/* Look into using React Modal later - allows super-imposing of zoomed image in a lightbox */}
            {/* Alternate design proposal with concatenated fields */}
            {/* Could potentially reuse the bio assets species filter for job titles here or do a last name search or something */}
            <article>
                <h3>View Employees</h3>
                <p>
                    The table below shows existing information for Employee entities and includes
                    buttons to update or delete them.
                </p>
                <table className="scrollableTable">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Contact</th>
                        <th>Photo</th>
                        <th>Notes</th>

                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    {employeesList.map((val, index)=> {
                        const wage = val.hourlyWage ? val.hourlyWage.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                        return (
                            <tr key={index}>
                                <td>{val.idEmployee}</td>
                                <td>{val.lastName}, {val.firstName}<div>({val.employeeUsername})</div></td>
                                <td>{val.jobTitle} ({wage}/hr)</td>
                                <td><div>{val.employeePhone}</div><div>{val.employeeEmail}</div><div>Radio Callsign: {val.employeeRadio}</div></td>
                                <td>
                                    {/* Look into using React Modal later - allows super-imposing of zoomed image in a lightbox */}
                                    <a href={val.employeePhoto}>
                                        <img src={val.employeePhoto} alt={val.employeePhoto} width={200}/>
                                    </a>
                                </td>
                                <td className="tableDescription">{val.employeeNote}</td>
                                <td><button onClick={()=> {navToUpdate(val)}}>Update</button></td>
                                <td><button onClick={()=> {delEmployee(val.idEmployee)}}>Delete</button></td>
                            </tr>
                        )}
                    )}
                    </tbody>
                </table>                                  
                {/* Old Design - propose we go with the new one that's more compact/reads better */}
                {/* <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Username</th>
                            <th>Job</th>
                            <th>Wage</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Radio</th>
                            <th>Photo</th>
                            <th>Notes</th>

                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {employeesList.map((val, index)=> {
                            const wage = val.hourlyWage ? val.hourlyWage.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                            return (
                                <tr key={index}>
                                    <td>{val.idEmployee}</td>
                                    <td>{val.lastName}</td>
                                    <td>{val.firstName}</td>
                                    <td>{val.employeeUsername}</td>
                                    <td>{val.jobTitle}</td>
                                    <td className="tableDescription">{wage}</td>
                                    <td>{val.employeePhone}</td>
                                    <td>{val.employeeEmail}</td>
                                    <td>{val.employeeRadio}</td>
                                    <td>
                                        
                                        <a href={val.employeePhoto}>
                                            <img src={val.employeePhoto} alt={val.employeePhoto} width={200}/>
                                        </a>
                                    </td>
                                    <td className="tableDescription">{val.employeeNote}</td>

                                    <td><button onClick={()=> {navToUpdate(val)}}>Update</button></td>
                                    <td><button onClick={()=> {delEmployee(val.idEmployee)}}>Delete</button></td>
                                </tr>
                            )}
                        )}
                        </tbody>
                    </table>  
                </div> */}
            </article>
        </>
    );
};

export default EmployeesPage;