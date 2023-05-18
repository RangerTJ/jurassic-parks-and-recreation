import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function ParksPage ({hostURL}) {

    // Park SQL Endpoints
    const getParksURL = hostURL + '/api/getParks';
    const createParksURL = hostURL + '/api/insertParks';
    const updateParksURL = hostURL + '/api/updateParks';
    const deleteParksURL = hostURL + '/api/deleteParks/';

    return (
        <>
        
        </>
    );
}

export default ParksPage;