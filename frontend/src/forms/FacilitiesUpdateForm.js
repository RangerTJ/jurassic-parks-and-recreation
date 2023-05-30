// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorParks from "../components/selectorParks";
import SelectorFacilityTypes from "../components/selectorFacilityTypes";
import SelectorHabitats from "../components/selectorHabitats";
import ImageSelectorFacilities from "../components/imageSelectorFacilities";


// HostURL Passed from App.js
function FacilitiesUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { id, oldParkName, oldFacilityName, oldHabitatName, oldFacilityLocation, oldSecurityRating, oldFacilityPhoto, oldFacilityDescription, oldFacilityNote, oldFacTypeName} = location.state;

    // Facilities Update SQL Endpoint
    const updateFacilitiesURL = hostURL + '/api/updateFacilities';
    const navTo = useNavigate();

    // Facilities States for the Form
    const [parkName, setParkName] = useState('');
    const [facilityName, setFacilityName] = useState('');
    const [habitatName, setHabitatName] = useState('');
    const [facilityLocation, setFacilityLocation] = useState('');
    const [securityRating, setSecurityRating] = useState('');
    const [facilityPhoto, setFacilityPhoto] = useState('');
    const [facilityDescription, setFacilityDescription] = useState('');
    const [facilityNote, setFacilityNote] = useState('');
    const [facTypeName, setFacTypeName] = useState('');

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setParkName(oldParkName);
        setFacilityName(oldFacilityName);
        setHabitatName(oldHabitatName);
        setFacilityLocation(oldFacilityLocation);
        setSecurityRating(oldSecurityRating);
        setFacilityPhoto(oldFacilityPhoto);
        setFacilityDescription(oldFacilityDescription);
        setFacilityNote(oldFacilityNote);
        setFacTypeName(oldFacTypeName);
    }, [])

    // UPDATE - Submit Changes to a Facility then return to Facilities page
    const update = async () => {
        try {
            if (parkName && facTypeName && facilityLocation && securityRating) {
                await Axios.put(updateFacilitiesURL, {
                    parkName: parkName,
                    facilityName: facilityName,
                    facTypeName: facTypeName,
                    habitatName: habitatName,
                    facilityLocation: facilityLocation,
                    securityRating: securityRating,
                    facilityPhoto: facilityPhoto,
                    facilityDescription: facilityDescription,
                    facilityNote: facilityNote,
                    idFacility: id,
                });
                alert(`${facilityName}'s database record has been updated!`)
                navTo('/Facilities');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
            console.error('Error updating facility.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Update Facility Information</h2>
            <article>
                <p>
                    Make changes to this Facility's record and click "Save" to retain them.
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
                                value={facilityName}
                                autoFocus
                                onChange={(e) => {setFacilityName(e.target.value)}
                                }/>
                            <div>Original: {oldFacilityName}</div>
                        </div>
                        <div className="selectorP">
                            <SelectorParks  hostURL={hostURL} parkName={parkName} setParkName={setParkName} isRequired={true} autoFocus={false} preSelected={oldParkName}/>
                            <div>Original: {oldParkName}</div>
                        </div>
                        <div className="selectorP">
                            <SelectorFacilityTypes  hostURL={hostURL} facTypeName={facTypeName} setFacTypeName={setFacTypeName} isRequired={true} autoFocus={false} preSelected={oldFacTypeName}/>
                            <div>Original: {oldFacTypeName}</div>
                        </div>
                        <div className="selectorP">
                            <SelectorHabitats  hostURL={hostURL} habitatName={habitatName} setHabitatName={setHabitatName} isRequired={false} autoFocus={false} preSelected={oldHabitatName}/>
                            <div>(Enclosures Only)</div>
                            <div>Original: {oldHabitatName}</div>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="facilityLocation">Location</label></div>
                            <input 
                                type="text"
                                id="facilityLocation"
                                name="facilityLocation"
                                placeholder="Ex. Near South Docks" 
                                required
                                value={facilityLocation}
                                onChange={(e) => {setFacilityLocation(e.target.value)}
                                }/>
                            <div>Original: {oldFacilityLocation}</div>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="securityRating">Security Rating</label></div>
                            <select name="securityRating" id="securityRating" value={securityRating} onChange={(e) => {setSecurityRating(e.target.value)}} required>
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
                            </select>
                            <div>Original: {oldSecurityRating}</div>
                        </div>
                        <div className="selectorP">
                            <ImageSelectorFacilities  hostURL={hostURL} image={facilityPhoto} setImage={setFacilityPhoto} isRequired={false} autoFocus={false} preSelected={oldFacilityPhoto}/>
                            {oldFacilityPhoto ? 
                                (<>
                                    <div>Original: {oldFacilityPhoto.substring(14, oldFacilityPhoto.indexOf('.'))}</div>
                                    <div><img src={oldFacilityPhoto} alt ={oldFacilityPhoto.substring(14, oldFacilityPhoto.indexOf('.'))} width={100}/></div>
                                </>) : (<><div>No original image.</div></>)
                            }
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="facilityDescription">Description</label></div>
                            <textarea
                                id ="facilityDescription"
                                name="facilityDescription"
                                cols="40" rows="5" 
                                min="5" max="255"
                                placeholder="Ex. Houses sauropods."
                                value={facilityDescription}
                                onChange={(e) => {setFacilityDescription(e.target.value)}
                                }/>
                            <div>Original: {oldFacilityDescription}</div>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="facilityNote">Notes</label></div>
                            <textarea
                                id ="facilityNote"
                                name="facilityNote"
                                cols="40" rows="5" 
                                min="5" max="255"
                                placeholder="Ex. Suffers from erosion. Schedule regular maintenance."
                                value={facilityNote}
                                onChange={(e) => {setFacilityNote(e.target.value)}
                                }/>
                            <div>Original: {oldFacilityNote}</div>
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

export default FacilitiesUpdateForm;