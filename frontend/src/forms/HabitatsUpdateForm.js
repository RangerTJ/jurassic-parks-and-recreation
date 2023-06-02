// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorHabitats from "../components/imageSelectorHabitats";


// HostURL Passed from App.js
function HabitatsUpdateForm ({hostURL}) {

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
                                {/* Slice up file path so that it becomes a more readable (save core part of file name only) */}
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