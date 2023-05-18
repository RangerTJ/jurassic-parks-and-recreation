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
                            {/* {How to define autofocus here?} */}
                            {/* Can pass a preSelected string that matches a name on the list to auto-select it */}
                            {/* Ex. preSelected={"Spinosaurus"} as a prop */}
                            <SelectorSpecies  hostURL={hostURL}/>
                        </p>
                        <p>
                            <div><label htmlFor="bioAssetName">Name</label></div>
                            <input 
                                type="text" 
                                name="bioAssetName"
                                placeholder="Ex. Meadow Stomper" 
                                required 
                                onChange={(e) => {setName(e.target.value)}
                                }/>
                            {/* <input type="text"
                                        name="bioAssetName" 
                                        id ="bioAssetName"
                                        required 
                                        placeholder="Ex. Meadow Stomper"></input> */}
                        </p>
                        <p>
                            <SelectorFacilities preSelected={"Jurassic Stadium"} hostURL={hostURL}/>
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