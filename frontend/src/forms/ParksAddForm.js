// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function ParksAddForm ({hostURL}) {

    // Park SQL Endpoint
    const createParksURL = hostURL + '/api/insertParks';
    const navTo = useNavigate();

    // Park States for the Form
    const [parkName, setParkName] = useState('')
    const [parkDescription, setParkDescription] = useState('')
    const [parkLocation, setParkLocation] = useState('')

    // CREATE - Insert New then return to form launcher
    const submit = async () => {
        try {
            if (parkName && parkDescription && parkLocation) {
                await Axios.post(createParksURL, {
                    parkName: parkName,
                    parkDescription: parkDescription,
                    parkLocation: parkLocation,
                });
                alert(`${parkName} has been added to the database!`);
                navTo('/Parks');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
                console.error('Error inserting Park.', error)
        }
    };

    return (
        <>
            <h2>Add Park</h2>
            <article>
                <p>
                    If you would like to add a new Park entity to the database, enter values for its attributes below
                    and click the "Add Park" button.
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
                                    onChange={(e) => {setParkDescription(e.target.value)}
                                    }></textarea>
                            <div className="selectorP">
                                <div><label htmlFor="parkLocation">Location</label></div>
                                <input type="text"
                                    name="parkLocation" 
                                    id ="parkLocation" 
                                    placeholder="Ex. Isla Nublar, Costa Rica"
                                    required 
                                    onChange={(e) => {setParkLocation(e.target.value)}
                                    }/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Park</button></p>
                </div>
            </article>
        </>
    );
}

export default ParksAddForm;