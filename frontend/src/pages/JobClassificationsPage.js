import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';


// HostURL Passed from App.js
function JobClassificationsPage ({hostURL}) {

    // JobClassifications SQL Endpoints
    const getJobClassificationsURL = hostURL + '/api/getJobClassifications';
    const createJobClassificationsURL = hostURL + '/api/insertJobClassifications';
    const updateJobClassificationsURL = hostURL + '/api/updateJobClassifications';
    const JobClassificationsURL = hostURL + '/api/deleteJobClassifications/';

    return (
        <>
        
        </>
    );
}

export default JobClassificationsPage;