import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function FacilitiesPage ({hostURL}) {

    // Facilities SQL Endpoints
    const getFacilitiesURL = hostURL + '/api/getFacilities';
    const createFacilitiesURL = hostURL + '/api/insertFacilities';
    const updateFacilitiesURL = hostURL + '/api/updateFacilities';
    const deleteFacilitiesURL = hostURL + '/api/deleteFacilities/';

    return (
        <>
        
        </>
    );
}

export default FacilitiesPage;