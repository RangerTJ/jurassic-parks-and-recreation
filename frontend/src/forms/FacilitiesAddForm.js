// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorParks from "../components/selectorParks";
import SelectorHabitats from "../components/selectorHabitats";
import ImageSelectorFacilities from "../components/imageSelectorFacilities";
import SelectorFacilityTypes from "../components/selectorFacilityTypes";


// HostURL Passed from App.js
function FacilitiesAddForm ({hostURL}) {

    // BiologicalAssets SQL Endpoints
    const createEmployeesURL = hostURL + '/api/insertFacilities';
    const navTo = useNavigate();

    // Emp Task States for the Form
    const [parkName, setParkName] = useState('')
    const [facilityName, setFacilityName] = useState('')
    const [facTypeName, setFacTypeName] = useState('')
    const [habitatName, setHabitatName] = useState('')
    const [facilityLocation, setFacilityLocation] = useState('')
    const [securityRating, setSecurityRating] = useState('')
    const [facilityPhoto, setFacilityPhoto] = useState('')
    const [facilityDescription, setFacilityDescription] = useState('')
    const [facilityNote, setFacilityNote] = useState('')

    // CREATE - Insert New Bio Asset then return to asset home (only if all required state variables are not null)
    const submit = () => {
        if (parkName && facTypeName && facTypeName && habitatName && facilityLocation && securityRating) {
        Axios.post(createEmployeesURL, {
            parkName: parkName,
            facilityName: facilityName,
            facTypeName: facTypeName,
            habitatName: habitatName,
            facilityLocation: facilityLocation,
            securityRating: securityRating,
            facilityPhoto: facilityPhoto,
            facilityDescription: facilityDescription,
            facilityNote: facilityNote,
        });
        alert(`${facilityName} has been added to the database!`);
        navTo('/Facilities');
        } else {
            alert("Please fill out all required fields and try again.")
        };
    };

    return (
        <>
            <h2>Add Facility</h2>
            <article>
                <p>
                    To add a new Facility to the database, enter values for its attributes below
                    and click the "Add Facility" button.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                        <div className="selectorP">
                            <div><label htmlFor="facilityName">First Name</label></div>
                            <input 
                                type="text"
                                id="facilityName"
                                name="facilityName"
                                placeholder="Ex. JP Visitor Center" 
                                required
                                autoFocus
                                onChange={(e) => {setFacilityName(e.target.value)}
                                }/>
                        </div>
                        <div className="selectorP">
                            <SelectorParks  hostURL={hostURL} parkName={parkName} setParkName={setParkName} isRequired={true} autoFocus={false}/>
                        </div>
                        <div className="selectorP">
                            <SelectorFacilityTypes  hostURL={hostURL} facTypeName={facTypeName} setFacTypeName={setFacTypeName} isRequired={true} autoFocus={false}/>
                        </div>
                        <div className="selectorP">
                            <SelectorHabitats  hostURL={hostURL} habitatName={habitatName} setHabitatName={setHabitatName} isRequired={true} autoFocus={false}/>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="facilityLocation">Location</label></div>
                            <input 
                                type="text"
                                id="facilityLocation"
                                name="facilityLocation"
                                placeholder="Ex. Near South Docks" 
                                required
                                onChange={(e) => {setFacilityLocation(e.target.value)}
                                }/>
                        </div>
                        <div className="selectorP">
                            <div><label for="securityRating" class="required">Security Rating</label></div>
                            <select name="securityRating" id="securityRating" onChange={(e) => {setSecurityRating(e.target.value)}} required>
                                <option value="" hidden>Select Rating</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <select id="facTypeSelector" ></select>
                            </select>
                        </div>
                            {/* <div className="selectorP">
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
                                <SelectorParks  hostURL={hostURL} jobTitle={jobTitle} setJobTitle={setJobTitle} isRequired={true} autoFocus={false}/>
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
                                <ImageSelectorFacilities  hostURL={hostURL} image={employeePhoto} setImage={setEmployeePhoto} isRequired={false} autoFocus={false}/>
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
                            </div> */}
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Facility</button></p>
                </div>
            </article>
        </>
    );
}

export default FacilitiesAddForm;