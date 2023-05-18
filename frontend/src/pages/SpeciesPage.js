import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function SpeciesPage ({hostURL}) {

    // Species SQL Endpoints
    const getSpeciesURL = hostURL + '/api/getSpecies';
    const createSpeciesURL = hostURL + '/api/insertSpecies';
    const updateSpeciesURL = hostURL + '/api/updateSpecies';
    const deleteSpeciesURL = hostURL + '/api/deleteSpecies/';

    return (
        <>
        
        </>
    );
}

export default SpeciesPage;