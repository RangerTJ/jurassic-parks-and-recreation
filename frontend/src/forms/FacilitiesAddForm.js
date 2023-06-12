// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorParks from "../components/selectorParks";
import SelectorHabitats from "../components/selectorHabitats";
import ImageSelectorFacilities from "../components/imageSelectorFacilities";
import SelectorFacilityTypes from "../components/selectorFacilityTypes";


// HostURL Passed from App.js
function FacilitiesAddForm ({hostURL, createButtonSound}) {

    // Facilities SQL Endpoints
    const createFacilitiesURL = hostURL + '/api/insertFacilities';
    const navTo = useNavigate();

    // Facility States for the Form
    const [parkName, setParkName] = useState('');
    const [facilityName, setFacilityName] = useState('');
    const [habitatName, setHabitatName] = useState('');
    const [facilityLocation, setFacilityLocation] = useState('');
    const [securityRating, setSecurityRating] = useState('');
    const [facilityPhoto, setFacilityPhoto] = useState('');
    const [facilityDescription, setFacilityDescription] = useState('');
    const [facilityNote, setFacilityNote] = useState('');
    const [facTypeName, setFacTypeName] = useState('');

    // CREATE - Insert New Facility then return to Facilities page (only if all required state variables are not null)
    const submit = async () => {
        try {
            if (parkName && facTypeName && facilityLocation && securityRating) {
                createButtonSound.play();
                await Axios.post(createFacilitiesURL, {
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
            }
        } catch(error) {
            console.error('Error inserting facility.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Facility</h2>
            <article>
                <p>
                    To add a new Facility to the database, enter values for its attributes below
                    and click the "Add Facility" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                        <div className="selectorP">
                            <div><label htmlFor="facilityName">Facility Name</label></div>
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
                            <SelectorHabitats  hostURL={hostURL} habitatName={habitatName} setHabitatName={setHabitatName} isRequired={false} autoFocus={false}/>
                            <div>(Enclosures Only)</div>
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
                            <div><label htmlFor="securityRating">Security Rating</label></div>
                            <select name="securityRating" id="securityRating" onChange={(e) => {setSecurityRating(e.target.value)}} required>
                                <option value="" hidden>Select Rating</option>
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
                            </select>
                        </div>
                        <div className="selectorP">
                            <ImageSelectorFacilities  hostURL={hostURL} image={facilityPhoto} setImage={setFacilityPhoto} isRequired={false} autoFocus={false}/>
                        </div>
                        <div className="selectorP">
                                <div><label htmlFor="facilityDescription">Description</label></div>
                                <textarea
                                    id ="facilityDescription"
                                    name="facilityDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Houses sauropods."
                                    onChange={(e) => {setFacilityDescription(e.target.value)}
                                    }/>
                        </div>
                        <div className="selectorP">
                                <div><label htmlFor="facilityNote">Notes</label></div>
                                <textarea
                                    id ="facilityNote"
                                    name="facilityNote"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Suffers from erosion. Schedule regular maintenance."
                                    onChange={(e) => {setFacilityNote(e.target.value)}
                                    }/>
                        </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Facility</button> <button onClick={()=> navTo('/Facilities')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default FacilitiesAddForm;