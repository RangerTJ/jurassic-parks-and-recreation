// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorJobClassifications from "../components/selectorJobClassifications";
import ImageSelectorStaff from "../components/imageSelectorStaff";


// HostURL Passed from App.js
function EmployeesUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { id, oldJobTitle, oldLastName, oldFirstName, oldEmployeeUsername, oldHourlyWage, oldEmployeePhone, oldEmployeeEmail, oldEmployeeRadio, oldEmployeePhoto, oldEmployeeNote} = location.state;

    // Employees Update SQL Endpoint
    const updateEmployeesURL = hostURL + '/api/updateEmployees';
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

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setJobTitle(oldJobTitle);
        setLastName(oldLastName);
        setFirstName(oldFirstName);
        setEmployeeUsername(oldEmployeeUsername);
        setHourlyWage(oldHourlyWage);
        setEmployeePhone(oldEmployeePhone);
        setEmployeeEmail(oldEmployeeEmail);
        setEmployeeRadio(oldEmployeeRadio);
        setEmployeePhoto(oldEmployeePhoto);
        setEmployeeNote(oldEmployeeNote);
    }, [])

    // UPDATE - Submit Changes to an Employee then return to Employee page
    const update = async () => {
        try {
            if (jobTitle && lastName && firstName && employeeUsername && employeePhone && employeeEmail) {
                await Axios.put(updateEmployeesURL, {
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
                    idEmployee: id,
                });
                alert(`${firstName} ${lastName}'s database record has been updated!`)
                navTo('/Employees');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
                console.error('Error updating employee.', error)
        };
    };

    return (
        <>
            <h2>Update Employee</h2>
            <article>
                <p>
                    Make changes to this Employee Task record and click "Save" to retain them.
                </p>
                <form>
                    <fieldset>
                        <legend>Update Employee #{id}</legend>
                        <div className="selectorP">
                                <div><label htmlFor="lastName">Last Name</label></div>
                                <input 
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Lastname" 
                                    required
                                    autoFocus
                                    value={lastName}
                                    onChange={(e) => {setLastName(e.target.value)}
                                    }/>
                                <div>Original: {oldLastName}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="firstName">First Name</label></div>
                                <input 
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Firstname" 
                                    required
                                    value={firstName}
                                    onChange={(e) => {setFirstName(e.target.value)}
                                    }/>
                                <div>Original: {oldFirstName}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="username">Username</label></div>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="username" 
                                    required
                                    value={employeeUsername}
                                    onChange={(e) => {setEmployeeUsername(e.target.value)}
                                    }/>
                                <div>Original: {oldEmployeeUsername}</div>
                            </div>
                            <div className="selectorP">
                                <SelectorJobClassifications  hostURL={hostURL} jobTitle={jobTitle} setJobTitle={setJobTitle} isRequired={true} autoFocus={false} preSelected={oldJobTitle}/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="wage">Hourly Wage</label></div>
                                <input 
                                    type="number"
                                    id="wage"
                                    name="wage"
                                    placeholder="Ex. 26.00" 
                                    required
                                    value={hourlyWage}
                                    onChange={(e) => {setHourlyWage(e.target.value)}
                                    }/>
                                <div>Original: {oldHourlyWage}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="phone">Phone</label></div>
                                <input 
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Ex. +1-555-555-5555" 
                                    required
                                    value={employeePhone}
                                    onChange={(e) => {setEmployeePhone(e.target.value)}
                                    }/>
                                <div>Original: {oldEmployeePhone}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="username">Email</label></div>
                                <input 
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Ex. employee@jw.org" 
                                    required
                                    value={(employeeEmail)}
                                    onChange={(e) => {setEmployeeEmail(e.target.value)}
                                    }/>
                                <div>Original: {oldEmployeeEmail}</div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="radio">Radio Number/Callsign</label></div>
                                <input 
                                    type="text"
                                    id="radio"
                                    name="radio"
                                    placeholder="Ex. 626, Alpha-1, etc."
                                    value={employeeRadio}
                                    onChange={(e) => {setEmployeeRadio(e.target.value)}
                                    }/>
                                <div>Original: {oldEmployeeRadio}</div>
                            </div>
                            <div className="selectorP">
                                <ImageSelectorStaff  hostURL={hostURL} image={employeePhoto} setImage={setEmployeePhoto} isRequired={false} autoFocus={false} preSelected={oldEmployeePhoto}/>
                                <div>Original: {oldEmployeePhoto.substring(14, oldEmployeePhoto.indexOf('.'))}</div>
                                <div><img src={oldEmployeePhoto} alt ={oldEmployeePhoto.substring(14, oldEmployeePhoto.indexOf('.'))} width={100}/></div>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="employeeNote">Notes</label></div>
                                <textarea
                                    id ="employeeNote"
                                    name="employeeNote"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    value={employeeNote}
                                    placeholder="Ex. Currently on PIP due performance issues."
                                    onChange={(e) => {setEmployeeNote(e.target.value)}
                                    }/>
                                <div>Original: {oldEmployeeNote}</div>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button></p>
                </div>
            </article>
        </>
    );
}

export default EmployeesUpdateForm;