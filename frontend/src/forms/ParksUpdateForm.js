// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import ImageSelectorParks from "../components/imageSelectorParks";


// HostURL Passed from App.js
function ParksUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { id, oldParkName, oldParkDescription, oldParkLocation, oldParkPhoto} = location.state;

    // Parks SQL Endpoint
    const updateParksURL = hostURL + '/api/updateParks';
    const navTo = useNavigate();

    // Park States for the Form
    const [parkName, setParkName] = useState('')
    const [parkDescription, setParkDescription] = useState('')
    const [parkLocation, setParkLocation] = useState('')
    const [parkPhoto, setParkPhoto] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setParkName(oldParkName);
        setParkDescription(oldParkDescription);
        setParkLocation(oldParkLocation);
        setParkPhoto(oldParkPhoto);
    }, [])

    // UPDATE - Submit changes to Park then return to Parks page
    const update = async () => {
        try {
            if (parkName && parkDescription && parkLocation) {
                await Axios.put(updateParksURL, {
                    parkName: parkName,
                    parkDescription: parkDescription,
                    parkLocation: parkLocation,
                    parkPhoto: parkPhoto,
                    idPark: id,
                });
                alert(`${parkName}'s database record has been updated!`)
                navTo('/Parks');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
            console.error('Error updating Park.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Update Park</h2>
            <article>
                <p>
                    If you would like to update this entry, enter new values for its attributes below
                    and click the "Save" button.
                    This action will <strong>cascade</strong> to <strong>Facilities</strong>.
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
                                    value={parkName}
                                    autoFocus
                                    onChange={(e) => {setParkName(e.target.value)}
                                    }/>
                                <div>Original: {oldParkName}</div>
                            </div>
                            <div><label htmlFor="parkDescription">Description</label></div>
                            <textarea
                                    name="parkDescription"
                                    id ="parkDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. The original prehistoric zoological theme park and preserve. Permanently closed."
                                    required
                                    value={parkDescription}
                                    onChange={(e) => {setParkDescription(e.target.value)}
                                    }></textarea>
                                <div>Original: {oldParkDescription}</div>
                            <div className="selectorP">
                                <div><label htmlFor="parkLocation">Location</label></div>
                                <input type="text"
                                    name="parkLocation" 
                                    id ="parkLocation" 
                                    placeholder="Ex. Isla Nublar, Costa Rica"
                                    required
                                    value={parkLocation}
                                    onChange={(e) => {setParkLocation(e.target.value)}
                                    }/>
                                <div>Original: {oldParkLocation}</div>
                            </div>
                            <div className="selectorP">
                                <ImageSelectorParks  hostURL={hostURL} image={parkPhoto} setImage={setParkPhoto} isRequired={false} autoFocus={false} preSelected={oldParkPhoto}/>
                                {/* Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                                URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                                Link Accessed/Verified on 6/1/2023 */}
                                {oldParkPhoto ? 
                                    (<>
                                        <div>Original: {oldParkPhoto.substring(14, oldParkPhoto.indexOf('.'))}</div>
                                        <div><img src={oldParkPhoto} alt ={oldParkPhoto.substring(14, oldParkPhoto.indexOf('.'))} width={100}/></div>
                                    </>) : (<><div>No original image.</div></>)
                                }
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button> <button onClick={()=> navTo('/Parks')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default ParksUpdateForm;