import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function FacilityTypesPage ({hostURL}) {

    // FacilityTypes SQL Endpoints
    const getFacilityTypesURL = hostURL + '/api/getFacilityTypes';
    const createFacilityTypesURL = hostURL + '/api/insertFacilityTypes';
    const updateFacilityTypesURL = hostURL + '/api/updateFacilityTypes';
    const deleteFacilityTypesURL = hostURL + '/api/deleteFacilityTypes/';

    return (
        <>
        
        </>
    );
}

export default FacilityTypesPage;