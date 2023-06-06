// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorDiets from '../components/imageSelectorDiets';


// HostURL Passed from App.js
function DietsAddForm ({hostURL}) {

    // Diets SQL Endpoint
    const createDietsURL = hostURL + '/api/insertDiets';
    const navTo = useNavigate();

    // Diets States for the Form
    const [dietName, setDietName] = useState('');
    const [dietDescription, setDietDescription] = useState('');
    const [dietIcon, setDietIcon] = useState('');

    // CREATE - Insert New Diet then return to Diets page
    const submit = async () => {
        try {
            if (dietName && dietDescription) {
                await Axios.post(createDietsURL, {
                    dietName: dietName,
                    dietDescription: dietDescription,
                    dietIcon: dietIcon
                });
                alert(`Diet ${dietName} has been added to the database!`);
                navTo('/Diets');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
            console.error('Error inserting Diet.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Diet</h2>
            <article>
                <p>
                    If you would like to add a new Diet to the database, enter values for its attributes below
                    and click the "Add Type" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <div><label htmlFor="dietName">Name</label></div>
                                <input 
                                    type="text"
                                    id="dietName"
                                    name="dietName"
                                    placeholder="Ex. Carnivore, Herbivore" 
                                    required
                                    autoFocus
                                    onChange={(e) => {setDietName(e.target.value)}
                                    }/>
                            </div>
                            <div><label htmlFor="dietDescription">Description</label></div>
                            <textarea
                                    name="dietDescription"
                                    id ="dietDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Consisting of meat, plant material, fish, etc."
                                    required
                                    onChange={(e) => {setDietDescription(e.target.value)}
                                    }></textarea>
                            <div className="selectorP">
                                <ImageSelectorDiets  hostURL={hostURL} image={dietIcon} setImage={setDietIcon} isRequired={false} autoFocus={false}/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Diet</button> <button onClick={()=> navTo('/Diets')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default DietsAddForm;