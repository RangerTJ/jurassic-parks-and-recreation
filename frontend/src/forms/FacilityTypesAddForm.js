// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function FacilityTypesAddForm ({hostURL}) {

    // Facility Type SQL Endpoint
    const createFacilityTypesURL = hostURL + '/api/insertFacilityTypes';
    const navTo = useNavigate();

    // Facility Type States for the Form
    const [facTypeName, setFacTypeName] = useState('')
    const [facTypeDescription, setFacTypeDescription] = useState('')

    // CREATE - Insert New Bio Asset then return to asset home
    const submit = async () => {
        try {
            if (facTypeName && facTypeDescription) {
                await Axios.post(createFacilityTypesURL, {
                    facTypeName: facTypeName,
                    facTypeDescription: facTypeDescription,
                });
                alert(`Facility Type ${facTypeName} has been added to the database!`);
                navTo('/FacilityTypes');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
                console.error('Error inserting Facility Type.', error)
        }
    };

    return (
        <>
            <h2>Add Facility Type</h2>
            <article>
                <p>
                    If you would like to add a new Facility Type to the database, enter values for its attributes below
                    and click the "Add Type" button.
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
                                    autoFocus
                                    onChange={(e) => {setFacTypeName(e.target.value)}
                                    }/>
                            </div>
                            <div><label htmlFor="facTypeDescription">Description</label></div>
                            <textarea
                                    name="facTypeDescription"
                                    id ="facTypeDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Enclosure for aquatic marine reptiles."
                                    required
                                    onChange={(e) => {setFacTypeDescription(e.target.value)}
                                    }></textarea>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Type</button></p>
                </div>
            </article>
        </>
    );
}

export default FacilityTypesAddForm;