// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorHabitats from "../components/imageSelectorHabitats";


// HostURL Passed from App.js
function HabitatsAddForm ({hostURL}) {

    // Habitats SQL Endpoints
    const createHabitatsURL = hostURL + '/api/insertHabitats';
    const navTo = useNavigate();

    // Habitat States for the Form
    const [habitatName, setHabitatName] = useState('')
    const [habitatDescription, setHabitatDescription] = useState('')
    const [habitatPhoto, setHabitatPhoto] = useState('')


    // CREATE - Insert New Habitat then return to Habitats page
    const submit = async () => {
        try {
            if (habitatName && habitatDescription) {
                await Axios.post(createHabitatsURL, {
                    habitatName: habitatName,
                    habitatDescription: habitatDescription,
                    habitatPhoto: habitatPhoto,
                });
                alert(`${habitatName} has been added to the database!`);
                navTo('/Habitats');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
            console.error('Error inserting employee.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Habitat</h2>
            <article>
                <p>
                    To add a new Habitat entity to the database, enter values for its attributes below
                    and click the "Add Habitat" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
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
                            <div className="selectorP">
                                <ImageSelectorHabitats  hostURL={hostURL} image={habitatPhoto} setImage={setHabitatPhoto} isRequired={false} autoFocus={false}/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Habitat</button> <button onClick={()=> navTo('/Habitats')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default HabitatsAddForm;