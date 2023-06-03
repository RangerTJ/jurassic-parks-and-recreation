// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorSpecies from "../components/imageSelectorSpecies";
import SelectorDietTypes from "../components/selectorDiets";
import SelectorHabitats from "../components/selectorHabitats";


// Host URL Passed from App.js
function SpeciesUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { id, oldDietName, oldHabitatName, oldSpeciesName, oldSpeciesDescription, oldThreatLevel, oldSpeciesPhoto } = location.state;


    // Species Update SQL Endpoint
    const updateSpeciesURL = hostURL + '/api/updateSpecies';
    const navTo = useNavigate();

    // Species States for Form
    const [dietName, setDietName] = useState('');
    const [habitatName, setHabitatName] = useState('');
    const [speciesName, setSpeciesName] = useState('');
    const [speciesDescription, setSpeciesDescription] = useState('');
    const [threatLevel, setThreatLevel] = useState('');
    const [speciesPhoto, setSpeciesPhoto] = useState('');

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setDietName(oldDietName);
        setHabitatName(oldHabitatName);
        setSpeciesName(oldSpeciesName);
        setSpeciesDescription(oldSpeciesDescription);
        setThreatLevel(oldThreatLevel);
        setSpeciesPhoto(oldSpeciesPhoto);
    }, [])

    
    // UPDATE - Submit Changes to a Species then return to Species page
    const update = async () => {
        try {
            if (dietName && habitatName && speciesName && speciesDescription && threatLevel) {
                await Axios.put(updateSpeciesURL, {
                    dietName: dietName,
                    habitatName: habitatName,
                    speciesName: speciesName,
                    speciesDescription: speciesDescription,
                    threatLevel: threatLevel,
                    speciesPhoto: speciesPhoto,
                    idSpecies: id
                });
                alert(`${speciesName}'s database record has been updated!`);
                navTo('/Species');
            }
            else {
                alert("Please fill out all required fields and try again.");
            }
        }
        catch (error) {
            console.error('Error updating Species.', error)
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Update Species</h2>
            <article>
                <p>
                    Make changes to this Species' record and click "Save" to retain them.
                    This action will <strong>cascade</strong> to the <strong>Biological Assets</strong> relational entity (a creature of a species)
                    that handles the many-to-many relationship between a Species and a Facility.
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
                                value={speciesName}
                                autoFocus
                                onChange={(e) => {setSpeciesName(e.target.value)}
                                }/>
                            <div>Original: {oldSpeciesName}</div>
                        </div>
                        <div className="selectorP">
                                <div><label htmlFor="speciesDescription">Description</label></div>
                                <textarea
                                
                                    id ="speciesDescription"
                                    name="speciesDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. A large carnivorous dinosaur with powerful jaws and sharp teeth."
                                    value={speciesDescription}
                                    onChange={(e) => {setSpeciesDescription(e.target.value)}
                                    }/>
                                    <div>Original: {oldSpeciesDescription}</div>
                        </div>
                        <div className="selectorP">
                            <SelectorDietTypes  hostURL={hostURL} dietName={dietName} setDietName={setDietName} isRequired={true} autoFocus={false} preSelected={oldDietName}/>
                            <div>Original: {oldDietName}</div>
                        </div>
                        <div className="selectorP">
                            <SelectorHabitats  hostURL={hostURL} habitatName={habitatName} setHabitatName={setHabitatName} isRequired={false} autoFocus={false} preSelected={oldHabitatName}/>
                            <div>(Enclosures Only)</div>
                            <div>Original: {oldHabitatName}</div>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="threatLevel">Threat Level</label></div>
                            <select name="threatLevel" id="threatLevel" value={threatLevel} onChange={(e) => {setThreatLevel(e.target.value)}} required>
                                <option value="" hidden>Select Threat Level</option>
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
                            <div>Original: {oldThreatLevel}</div>
                        </div>                        
                        <div className="selectorP">
                            <ImageSelectorSpecies  hostURL={hostURL} image={speciesPhoto} setImage={setSpeciesPhoto} isRequired={false} autoFocus={false} preSelected={oldSpeciesPhoto}/>
                            {/* Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            Link Accessed/Verified on 6/1/2023 */}
                            {oldSpeciesPhoto ? 
                                (<>
                                    <div>Original: {oldSpeciesPhoto.substring(14, oldSpeciesPhoto.indexOf('.'))}</div>
                                    <div><img src={oldSpeciesPhoto} alt ={oldSpeciesPhoto.substring(14, oldSpeciesPhoto.indexOf('.'))} width={100}/></div>                        
                                </>) : (<><div>No Original Image</div></>)
                            }
                        </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button> <button onClick={()=> navTo('/Species')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}


export default SpeciesUpdateForm;
