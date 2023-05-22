// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorSpecies from "../components/selectorSpecies";
import SelectorFacilities from "../components/selectorFacilities";


// HostURL Passed from App.js
function BiologicalAssetsUpdateForm ({hostURL}) {

    // NEED TO UNDERSTAND/CITE (BOILERPLATE-ISH BUT NEEDS SOURCE? Location allows using state from parent element)
    const location = useLocation();
    const { oldName, oldSpecies, oldFacility, id} = location.state;

    // BiologicalAssets SQL Endpoints
    const createBiologicalAssetsURL = hostURL + '/api/updateBiologicalAssets';
    const navTo = useNavigate();

    // Bio Asset States for the Form (2x arrays for select menus + 3x values to submit)
    const [species, setSpecies] = useState('')
    const [name, setName] = useState(oldName)
    const [facility, setFacility] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setSpecies(oldSpecies);
        setFacility(oldFacility);
        setName(oldName);
    }, [])

    // UPDATE - Submit Changes to a Bio Asset then return to Asset home
    const updateBioAsset = () => {
        if (species && name && facility) {
        Axios.put(createBiologicalAssetsURL, {
            speciesName: species,
            bioAssetName: name,
            facilityName: facility,
            idBiologicalAsset: id
        });
        alert(`${name}'s database entry has been updated!`)
        navTo('/BiologicalAssets');
        } else {
            alert("Please fill out all required fields and try again.")
        };
    };

    return (
        <>
            <h2>Update Biological Asset</h2>
            <article>
                <p>
                    Make changes to this asset and click "Save" to retain them.
                </p>
                <form>
                    <fieldset>
                        <legend>Update Asset ID# {id}</legend>
                            <div className="selectorP">
                                <SelectorSpecies  hostURL={hostURL} species={species} setSpecies={setSpecies} preSelected={oldSpecies} isRequired={true} autoFocus={true}/>
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
                                <SelectorFacilities hostURL={hostURL} facility={facility} setFacility={setFacility} preSelected={oldFacility} isRequired={true}/>
                            </div>
                            <div>Original: {oldFacility}</div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={updateBioAsset}>Save</button></p>
                </div>
            </article>
        </>
    );
}

export default BiologicalAssetsUpdateForm;