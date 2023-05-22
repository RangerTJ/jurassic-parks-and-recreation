// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

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
            <h2> * Under Construction +</h2>
        </>
    );
}

export default HabitatsPage;