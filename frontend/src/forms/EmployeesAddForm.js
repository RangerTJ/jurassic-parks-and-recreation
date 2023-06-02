// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorJobClassifications from "../components/selectorJobClassifications";
import ImageSelectorStaff from "../components/imageSelectorStaff";


// HostURL Passed from App.js
function EmployeesAddForm ({hostURL}) {

    // Employees SQL Endpoints
    const createEmployeesURL = hostURL + '/api/insertEmployees';
    const navTo = useNavigate();

    // Employees States for the Form
    const [jobTitle, setJobTitle] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [employeeUsername, setEmployeeUsername] = useState('')
    const [hourlyWage, setHourlyWage] = useState('')
    const [employeePhone, setEmployeePhone] = useState('')
    const [employeeEmail, setEmployeeEmail] = useState('')
    const [employeeRadio, setEmployeeRadio] = useState('')
    const [employeePhoto, setEmployeePhoto] = useState('')
    const [employeeNote, setEmployeeNote] = useState('')

    // CREATE - Insert New Employee then return to Employee page (only if all required state variables are not null)
    const submit = async () => {
        try {
            if (jobTitle && lastName && firstName && employeeUsername && hourlyWage && employeePhone && employeeEmail) {
                await Axios.post(createEmployeesURL, {
                    jobTitle: jobTitle,
                    lastName: lastName,
                    firstName: firstName,
                    employeeUsername: employeeUsername,
                    hourlyWage: hourlyWage,
                    employeePhone: employeePhone,
                    employeeEmail: employeeEmail,
                    employeeRadio: employeeRadio,
                    employeePhoto: employeePhoto,
                    employeeNote: employeeNote,
                });
                alert(`${firstName} ${lastName} has been added to the database!`);
                navTo('/Employees');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
            console.error('Error inserting employee.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Employee</h2>
            <article>
                <p>
                    To add a new Employee entity to the database, enter values for its attributes below
                    and click the "Add Employee" button.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <div><label htmlFor="lastName">Last Name</label></div>
                                <input 
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Lastname" 
                                    required
                                    autoFocus 
                                    onChange={(e) => {setLastName(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="firstName">First Name</label></div>
                                <input 
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Firstname" 
                                    required 
                                    onChange={(e) => {setFirstName(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="username">Username</label></div>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="username" 
                                    required 
                                    onChange={(e) => {setEmployeeUsername(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <SelectorJobClassifications  hostURL={hostURL} jobTitle={jobTitle} setJobTitle={setJobTitle} isRequired={true} autoFocus={false}/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="wage">Hourly Wage</label></div>
                                <input 
                                    type="number"
                                    id="wage"
                                    name="wage"
                                    placeholder="Ex. 26.00" 
                                    required 
                                    onChange={(e) => {setHourlyWage(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="phone">Phone</label></div>
                                <input 
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Ex. +1-555-555-5555" 
                                    required 
                                    onChange={(e) => {setEmployeePhone(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="username">Email</label></div>
                                <input 
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Ex. employee@jw.org" 
                                    required 
                                    onChange={(e) => {setEmployeeEmail(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="radio">Radio Number/Callsign</label></div>
                                <input 
                                    type="text"
                                    id="radio"
                                    name="radio"
                                    placeholder="Ex. 626, Alpha-1, etc." 
                                    onChange={(e) => {setEmployeeRadio(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <ImageSelectorStaff  hostURL={hostURL} image={employeePhoto} setImage={setEmployeePhoto} isRequired={false} autoFocus={false}/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="employeeNote">Notes</label></div>
                                <textarea
                                    id ="employeeNote"
                                    name="employeeNote"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Currently on PIP due performance issues."
                                    onChange={(e) => {setEmployeeNote(e.target.value)}
                                    }/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Employee</button> <button onClick={()=> navTo('/Employees')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default EmployeesAddForm;