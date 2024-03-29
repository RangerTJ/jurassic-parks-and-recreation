// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorSpecies from "../components/imageSelectorSpecies";
import SelectorDietTypes from "../components/selectorDiets";
import SelectorHabitats from "../components/selectorHabitats";


// HostURL Passed from App.js
function SpeciesAddForm ({hostURL, createButtonSound}) {

    // Safe Create Sound (error handling to prevent SFX fail from messing up CRUD operation)
    const createSound = () => {
        try {
            createButtonSound.play();
        } catch (error) {
            console.error("SFX Error")
        }
    }

    // Species SQL Endpoints
    const createSpeciesURL = hostURL + '/api/insertSpecies';
    const navTo = useNavigate();

    // Species States for Form
    const [speciesName, setSpeciesName] = useState('');
    const [speciesDescription, setSpeciesDescription] = useState('');
    const [dietName, setDietName] = useState('');
    const [habitatName, setHabitatName] = useState('');
    const [threatLevel, setThreatLevel] = useState('');
    const [speciesPhoto, setSpeciesPhoto] = useState('');

    // CREATE - Insert New Species then return to Species Page (only if all required state variables are not null)
    const submit = async () => {
        try {
            if (dietName && habitatName && speciesName && speciesDescription && threatLevel) {
                createSound();
                await Axios.post(createSpeciesURL, {
                    dietName: dietName,
                    habitatName: habitatName,
                    speciesName: speciesName,
                    speciesDescription: speciesDescription,
                    threatLevel: threatLevel,
                    speciesPhoto: speciesPhoto
                });
                alert(`${speciesName} has been added to the database!`);
                navTo('/Species');
            } else {
                alert("Please fill out all required fields and try again.")
            }
        }
        catch (error) {
            console.error('Error inserting Species.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Species</h2>
            <article>
                <p>
                    To add a new Species to the database, enter values for its attributes below
                    and click the "Add Species" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                        <div className="selectorP">
                            <div><label htmlFor="speciesName">Species Name</label></div>
                            <input 
                                type="text"
                                id="speciesName"
                                name="speciesName"
                                placeholder="Ex. Tyrannosaurus Rex" 
                                required
                                autoFocus
                                onChange={(e) => {setSpeciesName(e.target.value)}
                                }/>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="speciesDescription">Description</label></div>
                            <textarea
                                id ="speciesDescription"
                                name="speciesDescription"
                                cols="40" rows="5" 
                                min="5" max="255"
                                placeholder="Ex. A large carnivorous dinosaur with powerful jaws and sharp teeth."
                                required
                                onChange={(e) => {setSpeciesDescription(e.target.value)}
                                }/>
                        </div>
                        <div className="selectorP">
                            <SelectorDietTypes  hostURL={hostURL} dietName={dietName} setDietName={setDietName} isRequired={true} autoFocus={false}/>
                        </div>
                        <div className="selectorP">
                            <SelectorHabitats  hostURL={hostURL} habitatName={habitatName} setHabitatName={setHabitatName} isRequired={true} autoFocus={false}/>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="threatLevel">Threat Level</label></div>
                            <select name="threatLevel" id="threatLevel" onChange={(e) => {setThreatLevel(e.target.value)}} required>
                                <option value="" hidden>Select Threat Level</option>
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
                            <ImageSelectorSpecies  hostURL={hostURL} image={speciesPhoto} setImage={setSpeciesPhoto} isRequired={false} autoFocus={false}/>
                        </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Species</button> <button onClick={()=> navTo('/Species')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default SpeciesAddForm;
