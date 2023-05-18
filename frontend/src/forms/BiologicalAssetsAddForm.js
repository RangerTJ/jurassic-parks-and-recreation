// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function BiologicalAssetsAddForm ({hostURL}) {

    // BiologicalAssets SQL Endpoints
    const createBiologicalAssetsURL = hostURL + '/api/insertBiologicalAssets';
    const navTo = useNavigate();

    // Bio Asset States for the Form (2x arrays for select menus + 3x values to submit)
    const [speciesList, setspeciesList] = useState([])
    const [facilityList, setfacilityList] = useState([])
    const [species, setSpecies] = useState('')
    const [name, setName] = useState('')
    const [facility, setFacility] = useState('')

    // TO DO: useEffect to get species and facility lists and save them to useState
    // Map these arrays to respective select boxes (then figure out how to pre-select one and pre-populate for update)
    // Insert function for onClick / mod onClick to insert, then navigate back to bio assets... possible success alert?

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
                        <p>
                            {/* <!-- Populated by SQL query --> */}
                            <div><label for="assetSpecies" class="required">Species</label></div>
                            <select name="assetSpecies" id="assetSpecies" autofocus required>
                                <option value="" hidden>Choose an option</option>
                                <option value="1">Tyrannosaurus Rex</option>
                                <option value="2">Velociraptor</option>
                                <option value="3">Triceratops</option>
                                <option value="4">Brachiosaurus</option>
                                <option value="5">Stegosaurus</option>
                                <option value="6">Spinosaurus</option>
                                <option value="7">Allosaurus</option>
                                <option value="8">Ankylosaurus</option>
                                <option value="9">Parasaurolophus</option>
                                <option value="10">Mosasaurus</option>
                                <option value="11">Hesperornis</option>
                                <option value="12">Thescelosaurus</option>
                                <option value="13">Diplocaulus</option>
                                <option value="14">Metriorhynchus</option>
                                <option value="15">Eustreptospondylus</option>
                                <option value="16">Batman (he volunteered to be an exhibit)</option>
                            </select>
                        </p>
                        <p>
                            <div><label for="bioAssetName" class="required">Name</label></div>
                            <input type="text"
                                        name="bioAssetName" 
                                        id ="bioAssetName"
                                        required 
                                        placeholder="Ex. Meadow Stomper"></input>
                        </p>
                        <p>
                            {/* <!-- Populated by SQL query --> */}
                            <div><label for="facilityName" class="required">Home Facility</label></div>
                            <select name="facilityName" id="facilityName" required>
                                <option value="" hidden>Choose an option</option>
                                <option value="1">Wild Zone</option>
                                <option value="2">Visitor Center</option>
                                <option value="3">Jurassic Stadium</option>
                                <option value="4">Mosasaur Lagoon</option>
                                <option value="5">Redwood Retreat</option>
                                <option value="6">Swamp Explorer</option>
                            </select>
                        </p>
                    </fieldset>
                </form>
                <div>
                    {/* Also need to make it actually do the insert SQL here somehow */}
                    <p><button onClick={() => navTo("/BiologicalAssets")}>Add Asset</button></p>
                </div>
            </article>
        </>
    );
}

export default BiologicalAssetsAddForm;