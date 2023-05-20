// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';
import ImageList from "../components/imageSelectorSpecies";
import ImageSelectorSpecies from "../components/imageSelectorSpecies";
import ImageSelectorDiets from "../components/imageSelectorDiets";
import ImageSelectorFacilities from "../components/imageSelectorFacilities";
import ImageSelectorHabitats from "../components/imageSelectorHabitats";
import ImageSelectorParks from "../components/imageSelectorParks";
import ImageSelectorStaff from "../components/imageSelectorStaff";


// HostURL Passed from App.js
function SpeciesPage ({hostURL}) {

    // Species SQL Endpoints
    const getSpeciesURL = hostURL + '/api/getSpecies';
    const createSpeciesURL = hostURL + '/api/insertSpecies';
    const updateSpeciesURL = hostURL + '/api/updateSpecies';
    const deleteSpeciesURL = hostURL + '/api/deleteSpecies/';

    // Species Table Functions
    const [biologicalAssetList, setBiologicalAssetList] = useState([])
    const [assetHabMismatchList, setAssetHabMismatchList] = useState([])
    const [assetSecMismatchList, setAssetSecMismatchList] = useState([])
    const [image, setImage] = useState('')
    
    // ImageList isn't supposed to be here, it goes on the create/update pages, this was just to put it somewhere
    // while I tested the ImageSelector thingie.
    // NOTE: CURRENT IMPLEMENTATION USES EASY/UNIVERSAL setStates since there's only one image per any given table. If this ever changed, we'd need to give unique states for setState to work on submit.
    return (
        <>
            <h2>Test Image Selectors</h2>
            <article>
                <ImageSelectorSpecies 
                    hostURL={hostURL} 
                    setImage={setImage} 
                    image={image} 
                    isRequired={false}/>
                <ImageSelectorDiets 
                    hostURL={hostURL} 
                    setImage={setImage} 
                    image={image} 
                    isRequired={false}/>
                <ImageSelectorFacilities 
                    hostURL={hostURL} 
                    setImage={setImage} 
                    image={image} 
                    isRequired={false}/>
                <ImageSelectorHabitats 
                    hostURL={hostURL} 
                    setImage={setImage} 
                    image={image} 
                    isRequired={false}/>
                <ImageSelectorParks 
                    hostURL={hostURL} 
                    setImage={setImage} 
                    image={image} 
                    isRequired={false}/>
                <ImageSelectorStaff 
                    hostURL={hostURL} 
                    setImage={setImage} 
                    image={image} 
                    isRequired={false}/>
            </article>
        </>
    );
}

export default SpeciesPage;