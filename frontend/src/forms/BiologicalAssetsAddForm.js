// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorSpecies from "../components/selectorSpecies";
import SelectorFacilities from "../components/selectorFacilities";


// HostURL Passed from App.js
function BiologicalAssetsAddForm ({hostURL}) {

    // BiologicalAssets SQL Endpoints
    const createBiologicalAssetsURL = hostURL + '/api/insertBiologicalAssets';
    const navTo = useNavigate();

    // Bio Asset States for the Form (2x arrays for select menus + 3x values to submit)
    const [species, setSpecies] = useState('')
    const [name, setName] = useState('')
    const [facility, setFacility] = useState('')

    // CREATE - Insert New Bio Asset then return to asset home
    const submitBioAsset = () => {
        if (species && name && facility) {
        Axios.post(createBiologicalAssetsURL, {
            speciesName: species,
            bioAssetName: name,
            facilityName: facility,
        });
        alert(`${name} has been added to the database!`);
        navTo('/BiologicalAssets');
        } else {
            alert("Please fill out all required fields and try again.")
        };
    };

    return (
        <>
            <h2>Add Biological Asset</h2>
            <article>
                <p>
                    If you would like to add a new Biological Assets entity to the database, enter values for its attributes below
                    and click the "Add Asset" button. To put it more simply, this is how you create an entry for a dinosaur - or any other 
                    tracked and managed creature found in one of our parks.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <SelectorSpecies  hostURL={hostURL} species={species} setSpecies={setSpecies} isRequired={true} autofocus={true}/>
                            </div>
                            <div className="selectorP">
                                <div><label htmlFor="bioAssetName">Name</label></div>
                                <input 
                                    type="text" 
                                    name="bioAssetName"
                                    placeholder="Ex. Meadow Stomper" 
                                    required 
                                    onChange={(e) => {setName(e.target.value)}
                                    }/>
                            </div>
                            <div className="selectorP">
                                <SelectorFacilities hostURL={hostURL} facility={facility} setFacility={setFacility} isRequired={true}/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submitBioAsset}>Add Asset</button></p>
                </div>
            </article>
        </>
    );
}

export default BiologicalAssetsAddForm;