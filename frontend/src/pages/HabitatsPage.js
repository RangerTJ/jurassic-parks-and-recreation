import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function HabitatsPage ({hostURL}) {

    // Habitats SQL Endpoints
    const getHabitatsURL = hostURL + '/api/getHabitats';
    const createHabitatsURL = hostURL + '/api/insertHabitats';
    const updateHabitatsURL = hostURL + '/api/updateHabitats';
    const deleteHabitatsURL = hostURL + '/api/deleteHabitats/';

    return (
        <>
        
        </>
    );
}

export default HabitatsPage;