// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorHabitats from "../components/imageSelectorHabitats";


// HostURL Passed from App.js
function HabitatsUpdateForm ({hostURL, updateButtonSound}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { id, oldHabitatName, oldHabitatDescription, oldHabitatPhoto} = location.state;

    // Habitats Update SQL Endpoint
    const updateHabitatsURL = hostURL + '/api/updateHabitats';
    const navTo = useNavigate();

    // Habitat States for the Form
    const [habitatName, setHabitatName] = useState('')
    const [habitatDescription, setHabitatDescription] = useState('')
    const [habitatPhoto, setHabitatPhoto] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setHabitatName(oldHabitatName);
        setHabitatDescription(oldHabitatDescription);
        setHabitatPhoto(oldHabitatPhoto);
    }, [])

    // UPDATE - Submit Changes to a Habitat then return to Habitats page
    const update = async () => {
        try {
            if (habitatName && habitatDescription) {
                updateButtonSound.play();
                await Axios.put(updateHabitatsURL, {
                    habitatName: habitatName,
                    habitatDescription: habitatDescription,
                    habitatPhoto: habitatPhoto,
                    idHabitat: id,
                });
                alert(`${habitatName}'s database record has been updated!`)
                navTo('/Habitats');
            } else {
                alert("Please fill out all required fields and try again.")
            }
        } catch (error) {
            console.error('Error updating employee.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Update Habitat Record</h2>
            <article>
                <p>
                    Make changes to this Habitat record and click "Save" to retain them.
                    This action will <strong>cascade</strong> to <strong>Species</strong> and <strong>Facilities</strong>.
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
                                    value={habitatName}
                                    onChange={(e) => {setHabitatName(e.target.value)}
                                    }/>
                                <div>Original: {oldHabitatName}</div>
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
                                    value={habitatDescription}
                                    onChange={(e) => {setHabitatDescription(e.target.value)}
                                    }/>
                                <div>Original: {oldHabitatDescription}</div>
                            </div>
                            <div className="selectorP">
                                <ImageSelectorHabitats  hostURL={hostURL} image={habitatPhoto} setImage={setHabitatPhoto} isRequired={false} autoFocus={false} preSelected={oldHabitatPhoto}/>
                                {/* Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                                URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                                Link Accessed/Verified on 6/1/2023 */}
                                {oldHabitatPhoto ? 
                                    (<>
                                        <div>Original: {oldHabitatPhoto.substring(14, oldHabitatPhoto.indexOf('.'))}</div>
                                        <div><img src={oldHabitatPhoto} alt ={oldHabitatPhoto.substring(14, oldHabitatPhoto.indexOf('.'))} width={100}/></div>
                                    </>) : (<><div>No original image.</div></>)
                                }
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button> <button onClick={()=> navTo('/Habitats')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default HabitatsUpdateForm;