// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorSpecies from "../components/selectorSpecies";
import SelectorFacilities from "../components/selectorFacilities";


// HostURL Passed from App.js
function BiologicalAssetsUpdateForm ({hostURL, updateButtonSound}) {

    // Safe Update Sound (error handling to prevent SFX fail from messing up CRUD operation)
    const updateSound = () => {
        try {
            updateButtonSound.play();
        } catch (error) {
            console.error("SFX Error")
        }
    }

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { oldName, oldSpecies, oldFacility, id} = location.state;

    // BiologicalAssets SQL Endpoints
    const updateBiologicalAssetsURL = hostURL + '/api/updateBiologicalAssets';
    const navTo = useNavigate();

    // Bio Asset States for the Form (2x arrays for select menus + 3x values to submit)
    const [speciesName, setSpeciesName] = useState('')
    const [name, setName] = useState(oldName)
    const [facilityName, setFacilityName] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setSpeciesName(oldSpecies);
        setFacilityName(oldFacility);
        setName(oldName);
    }, [])

    // UPDATE - Submit Changes to a Bio Asset then return to Asset home
    const update = async () => {
        try {
            if (speciesName && name && facilityName) {
                updateSound();
                await Axios.put(updateBiologicalAssetsURL, {
                    speciesName: speciesName,
                    bioAssetName: name,
                    facilityName: facilityName,
                    idBiologicalAsset: id
                });
                alert(`${name}'s database entry has been updated!`)
                navTo('/BiologicalAssets');
            } else {
                alert("Please fill out all required fields and try again.")
            }
        } catch (error) {
            console.error('Error updating biological asset.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };
        
    return (
        <>
            <h2>Update Biological Asset</h2>
            <article>
                <p>
                    Make changes to this asset and click "Save" to retain them.
                    This action will <strong>cascade</strong> to <strong>Tasks Assigned</strong>. This will also update the 
                    asset as a many-to-many relational link between a Species and a Facility.
                    A red border around an input field means that it is required and that it still needs a valid input.
                </p>
                <form>
                    <fieldset>
                        <legend>Update Asset ID# {id}</legend>
                        <div className="selectorP">
                            <SelectorSpecies  hostURL={hostURL} speciesName={speciesName} setSpeciesName={setSpeciesName} preSelected={oldSpecies} isRequired={true} autoFocus={true}/>
                        <div>Original: {oldSpecies}</div>
                        </div>
                        <div className="selectorP">
                            <div><label htmlFor="bioAssetName">Name</label></div>
                            <input 
                                type="text"
                                id="bioAssetName"
                                name="bioAssetName"
                                placeholder="Ex. Meadow Stomper" 
                                required
                                value={name}
                                onChange={(e) => {setName(e.target.value)}
                                }/>
                            <div>Original: {oldName}</div>
                        </div>
                        <div className="selectorP">
                            <SelectorFacilities hostURL={hostURL} facilityName={facilityName} setFacilityName={setFacilityName} preSelected={oldFacility} isRequired={true}/>
                            <div>Original: {oldFacility}</div>
                        </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button> <button onClick={()=> navTo('/BiologicalAssets')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default BiologicalAssetsUpdateForm;