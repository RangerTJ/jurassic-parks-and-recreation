// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function BiologicalAssetsUpdateForm ({hostURL}) {

    // BiologicalAssets SQL Endpoints
    const updateBiologicalAssetsURL = hostURL + '/api/updateBiologicalAssets';
    const navTo = useNavigate();

    return (
        <>
            <h2>Update Biological Asset</h2>
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
                            {/* Pre-selects the current option based on input ID */}
                            <div><label for="assetSpecies" class="required">Species</label></div>
                            <select name="assetSpecies" id="assetSpecies" autofocus required>
                                <option value="" hidden>Choose an option</option>
                                <option value="1">Tyrannosaurus Rex</option>
                                <option value="2">Velociraptor</option>
                                <option value="3">Triceratops</option>
                            </select>
                        </p>
                        <p>
                            {/* Pre-selects the current option based on input ID */}
                            <div><label for="bioAssetName" class="required">Name</label></div>
                            <input type="text"
                                        name="bioAssetName" 
                                        id ="bioAssetName"
                                        required 
                                        placeholder="Ex. Meadow Stomper"></input>
                        </p>
                        <p>
                            {/* <!-- Populated by SQL query --> */}
                            {/* Pre-selects the current option based on input ID */}
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
                    {/* Also need to make it actually do the SET SQL here somehow */}
                    <p><button onClick={() => navTo("/BiologicalAssets")}>Save</button></p>
                </div>
            </article>
        </>
    );
}

export default BiologicalAssetsUpdateForm;