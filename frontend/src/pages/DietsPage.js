import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function DietsPage ({hostURL}) {
    
    // Diets SQL Endpoints
    const getDietsURL = hostURL + '/api/getDiets';
    const createDietsURL = hostURL + '/api/insertDiets';
    const updateDietsURL = hostURL + '/api/updateDiets';
    const deleteDietsURL = hostURL + '/api/deleteDiets/';

    return (
        <>
        
        </>
    );
}

export default DietsPage;