// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import SelectorSpecies from "../components/selectorSpecies";
import SelectorFacilities from "../components/selectorFacilities";


// HostURL Passed from App.js
function BiologicalAssetsUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { oldName, oldSpecies, oldFacility, oldThreatLevel, id} = location.state;

    // BiologicalAssets SQL Endpoints
    const createBiologicalAssetsURL = hostURL + '/api/updateBiologicalAssets';
    const navTo = useNavigate();

    // Bio Asset States for the Form (2x arrays for select menus + 3x values to submit)
    const [species, setSpecies] = useState('')
    const [name, setName] = useState(oldName)
    const [facility, setFacility] = useState('')
    const [threatLevel, setThreatLevel] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setSpecies(oldSpecies);
        setFacility(oldFacility);
        setName(oldName);
        setThreatLevel(oldThreatLevel);
    }, [])

    // UPDATE - Submit Changes to a Bio Asset then return to Asset home
    const updateBioAsset = () => {
        if (species && name && facility) {
        Axios.put(createBiologicalAssetsURL, {
            speciesName: species,
            bioAssetName: name,
            facilityName: facility,
            threatLevel: threatLevel,
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
                            <div>Original: {oldFacility}</div>
                        </div>
                        
                        <div className="selectorP">
                            <div><label htmlFor="threatLevel">Security Rating</label></div>
                            <select name="threatLevel" id="threatLevel" value={threatLevel} onChange={(e) => {setThreatLevel(e.target.value)}} required>
                                <option value="" hidden>Select Rating</option>
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