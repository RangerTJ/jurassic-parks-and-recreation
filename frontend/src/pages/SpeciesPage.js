// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Axios from 'axios';
import ImageList from "../components/imageSelectorSpecies";
import ImageSelectorSpecies from "../components/imageSelectorSpecies";



// HostURL Passed from App.js
function SpeciesPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // Species SQL Endpoints
    const getSpeciesURL = hostURL + '/api/getSpecies';
    const createSpeciesURL = hostURL + '/api/insertSpecies';
    const updateSpeciesURL = hostURL + '/api/updateSpecies';
    const deleteSpeciesURL = hostURL + '/api/deleteSpecies/';

    // Species Table Functions
    const [image, setImage] = useState('')
    
    
    return (
        <>
            <h2>Species</h2>
            <h2></h2>
            





            <ImageSelectorSpecies 
                    hostURL={hostURL} 
                    setImage={setImage} 
                    image={image} 
                    isRequired={false}/>
        </>
    );
}

export default SpeciesPage;