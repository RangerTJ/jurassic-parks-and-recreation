// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorParks from "../components/imageSelectorParks";


// HostURL Passed from App.js
function ParksAddForm ({hostURL, createButtonSound}) {

    // Safe Create Sound (error handling to prevent SFX fail from messing up CRUD operation)
    const createSound = () => {
        try {
            createButtonSound.play();
        } catch (error) {
            console.error("SFX Error")
        }
    }

    // Park SQL Endpoint
    const createParksURL = hostURL + '/api/insertParks';
    const navTo = useNavigate();

    // Park States for the Form
    const [parkName, setParkName] = useState('')
    const [parkDescription, setParkDescription] = useState('')
    const [parkLocation, setParkLocation] = useState('')
    const [parkPhoto, setParkPhoto] = useState('')

    // CREATE - Insert New Park then return to Parks page
    const submit = async () => {
        try {
            if (parkName && parkDescription && parkLocation) {
                createSound();
                await Axios.post(createParksURL, {
                    parkName: parkName,
                    parkDescription: parkDescription,
                    parkLocation: parkLocation,
                    parkPhoto: parkPhoto,
                });
                alert(`${parkName} has been added to the database!`);
                navTo('/Parks');
            } else {
                alert("Please fill out all required fields and try again.")
            }
        } catch(error) {
            console.error('Error inserting Park.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Add Park</h2>
            <article>
                <p>
                    If you would like to add a new Park entity to the database, enter values for its attributes below
                    and click the "Add Park" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
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
                            <div className="selectorP">
                                <ImageSelectorParks  hostURL={hostURL} image={parkPhoto} setImage={setParkPhoto} isRequired={false} autoFocus={false}/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Park</button> <button onClick={()=> navTo('/Parks')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default ParksAddForm;