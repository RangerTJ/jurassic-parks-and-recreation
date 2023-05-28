// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorDiets from "../components/imageSelectorDiets";


// HostURL Passed from App.js
function DietsUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { id, oldDietName, oldDietDescription, oldDietIcon} = location.state;

    // Diets SQL Endpoint
    const updateDietsURL = hostURL + '/api/updateDiets';
    const navTo = useNavigate();

    // Diet States for the Form
    const [dietName, setDietName] = useState('')
    const [dietDescription, setDietDescription] = useState('')
    const [dietIcon, setDietIcon] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setDietName(oldDietName);
        setDietDescription(oldDietDescription);
        setDietIcon(oldDietIcon);
    }, [])

    // UPDATE - Submit Changes to a Diet then return to Diet page
    const update = async () => {
        try {
            if (dietName && dietDescription) {
                await Axios.put(updateDietsURL, {
                    dietName: dietName,
                    dietDescription: dietDescription,
                    dietIcon: dietIcon,
                    idDiet: id,
                });
                alert(`${dietName}'s database record has been updated!`)
                navTo('/Diets');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
                console.error('Error updating Diet.', error)
        };
    };

    return (
        <>
            <h2>Update Diet</h2>
            <article>
                <p>
                    If you would like to update this entry, enter new values for its attributes below
                    and click the "Save" button.
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
                                    value={dietName}
                                    autoFocus
                                    onChange={(e) => {setDietName(e.target.value)}
                                    }/>
                                <div>Original: {oldDietName}</div>
                            </div>
                            <div><label htmlFor="dietDescription">Description</label></div>
                            <textarea
                                    name="dietDescription"
                                    id ="dietDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Consisting of meat, plant material, fish, etc."
                                    required
                                    value={dietDescription}
                                    onChange={(e) => {setDietDescription(e.target.value)}
                                    }></textarea>
                                <div>Original: {oldDietDescription}</div>
                            <div className="selectorP">
                                <ImageSelectorDiets  hostURL={hostURL} image={dietIcon} setImage={setDietIcon} isRequired={false} autoFocus={false} preSelected={oldDietIcon}/>
                                <div>Original: {oldDietIcon.substring(14, oldDietIcon.indexOf('.'))}</div>
                                <div><img src={oldDietIcon} alt ={oldDietIcon.substring(14, oldDietIcon.indexOf('.'))} width={100}/></div>
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

export default DietsUpdateForm;