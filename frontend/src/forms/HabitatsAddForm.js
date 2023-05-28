// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorHabitats from "../components/imageSelectorHabitats";

//////////////////////
// REMINDER: REMOVING/DEPRECATING SIZE ATTRIBUTE (eliminate references to it later)
/////////////////////

// HostURL Passed from App.js
function HabitatsAddForm ({hostURL}) {

    // SQL Endpoints
    const createHabitatsURL = hostURL + '/api/insertHabitats';
    const navTo = useNavigate();

    // States for the Form
    const [habitatName, setHabitatName] = useState('')
    const [habitatDescription, setHabitatDescription] = useState('')
    const [habitatSize, setHabitatSize] = useState('')  // TO BE REMOVED
    const [habitatPhoto, setHabitatPhoto] = useState('')


    // CREATE - Insert New then return to parent page
    const submit = async () => {
        try {
            if (habitatName && habitatDescription && habitatSize) {
                await Axios.post(createHabitatsURL, {
                    habitatName: habitatName,
                    habitatDescription: habitatDescription,
                    habitatSize: habitatSize,
                    habitatPhoto: habitatPhoto,
                });
                alert(`${habitatName} has been added to the database!`);
                navTo('/Habitats');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
                console.error('Error inserting employee.', error)
        }
    };

    return (
        <>
            <h2>Add Habitat</h2>
            <article>
                <p>
                    To add a new Habitat entity to the database, enter values for its attributes below
                    and click the "Add Habitat" button.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <div><label htmlFor="habitatName">Name</label></div>
                                <input 
                                    type="text"
                                    id="habitatName"
                                    name="habitatName"
                                    placeholder="Ex. Savannah" 
                                    required
                                    autoFocus 
                                    onChange={(e) => {setHabitatName(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="habitatDescription">Description</label></div>
                                <textarea
                                    id ="habitatDescription"
                                    name="habitatDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Dry, grassy plains with sparse deciduous vegetation...."
                                    required
                                    onChange={(e) => {setHabitatDescription(e.target.value)}
                                    }/>
                            </div>
                            <div><label htmlFor="habitatSize">Size</label></div>
                                <input 
                                    type="number"
                                    id="habitatSize"
                                    name="habitatSize"
                                    min="1"
                                    max="3"
                                    required
                                    onChange={(e) => {setHabitatSize(e.target.value)}
                                    }/>
                            <div className="selectorP">
                                <ImageSelectorHabitats  hostURL={hostURL} image={habitatPhoto} setImage={setHabitatPhoto} isRequired={false} autoFocus={false}/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Habitat</button></p>
                </div>
            </article>
        </>
    );
}

export default HabitatsAddForm;