// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function FacilityTypesUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { id, oldFacTypeName, oldFacTypeDescription} = location.state;

    // Facility Type SQL Endpoint
    const updateFacilityTypesURL = hostURL + '/api/updateFacilityTypes';
    const navTo = useNavigate();

    // Facility Type States for the Form
    const [facTypeName, setFacTypeName] = useState('')
    const [facTypeDescription, setFacTypeDescription] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setFacTypeName(oldFacTypeName);
        setFacTypeDescription(oldFacTypeDescription);
    }, [])

    // UPDATE - Submit Changes to a Faciity Type then return to Facility Type page
    const update = async () => {
        try {
            if (facTypeName && facTypeDescription) {
                await Axios.put(updateFacilityTypesURL, {
                    facTypeName: facTypeName,
                    facTypeDescription: facTypeDescription,
                    idFacilityType: id,
                });
                alert(`${facTypeName}'s database record has been updated!`)
                navTo('/FacilityTypes');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
            console.error('Error updating Facility Type.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Update Facility Type</h2>
            <article>
                <p>
                    If you would like to update this entry, enter new values for its attributes below
                    and click the "Save" button. This action will <strong>cascade</strong> to <strong>Facilities</strong>.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <div><label htmlFor="facTypeName">Name</label></div>
                                <input 
                                    type="text"
                                    id="facTypeName"
                                    name="facTypeName"
                                    placeholder="Ex. Aquatic Enclosure" 
                                    required
                                    value={facTypeName}
                                    autoFocus
                                    onChange={(e) => {setFacTypeName(e.target.value)}
                                    }/>
                                <div>Original: {oldFacTypeName}</div>
                            </div>
                            <div><label htmlFor="facTypeDescription">Description</label></div>
                            <textarea
                                    name="facTypeDescription"
                                    id ="facTypeDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Enclosure for aquatic marine reptiles."
                                    required
                                    value={facTypeDescription}
                                    onChange={(e) => {setFacTypeDescription(e.target.value)}
                                    }></textarea>
                                <div>Original: {oldFacTypeDescription}</div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button> <button onClick={()=> navTo('/FacilityTypes')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default FacilityTypesUpdateForm;