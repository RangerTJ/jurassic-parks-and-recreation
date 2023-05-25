// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function ParksUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { id, oldParkName, oldParkDescription, oldParkLocation} = location.state;

    // Employee Update SQL Endpoint
    const updateParksURL = hostURL + '/api/updateParks';
    const navTo = useNavigate();

    // Park States for the Form
    const [parkName, setParkName] = useState('')
    const [parkDescription, setParkDescription] = useState('')
    const [parkLocation, setParkLocation] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setParkName(oldParkName);
        setParkDescription(oldParkDescription);
        setParkLocation(oldParkLocation);
    }, [])

    // UPDATE - Submit Changes to a Bio Asset then return to Asset home (hours/cost can be zero'd in case they need to be cleared for an entry error)
    const update = async () => {
        try {
            if (parkName && parkDescription && parkLocation) {
                await Axios.put(updateParksURL, {
                    parkName: parkName,
                    parkDescription: parkDescription,
                    parkLocation: parkLocation,
                    idPark: id,
                });
                alert(`${parkName}'s database record has been updated!`)
                navTo('/Parks');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
                console.error('Error updating Park.', error)
        };
    };

    return (
        <>
            <h2>Update Park</h2>
            <article>
                <p>
                    If you would like to update this entry, enter new values for its attributes below
                    and click the "Save" button.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <div><label htmlFor="parkName">Name</label></div>
                                <input 
                                    type="text"
                                    id="parkName"
                                    name="parkName"
                                    placeholder="Ex. Jurassic Park" 
                                    required
                                    value={parkName}
                                    autoFocus
                                    onChange={(e) => {setParkName(e.target.value)}
                                    }/>
                            </div>
                            <div><label htmlFor="parkDescription">Description</label></div>
                            <textarea
                                    name="parkDescription"
                                    id ="parkDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. The original prehistoric zoological theme park and preserve. Permanently closed."
                                    required
                                    value={parkDescription}
                                    onChange={(e) => {setParkDescription(e.target.value)}
                                    }></textarea>
                            <div className="selectorP">
                                <div><label htmlFor="parkLocation">Location</label></div>
                                <input type="text"
                                    name="parkLocation" 
                                    id ="parkLocation" 
                                    placeholder="Ex. Isla Nublar, Costa Rica"
                                    required
                                    value={parkLocation}
                                    onChange={(e) => {setParkLocation(e.target.value)}
                                    }/>
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

export default ParksUpdateForm;