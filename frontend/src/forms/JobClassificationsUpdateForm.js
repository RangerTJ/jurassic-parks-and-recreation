// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function JobClassificationsUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const location = useLocation();
    const { id, oldJobTitle, oldJobDescription} = location.state;

    // Job Classification SQL Endpoint
    const updateJobClassificationsURL = hostURL + '/api/updateJobClassifications';
    const navTo = useNavigate();

    // Job Classification States for the Form
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setJobTitle(oldJobTitle);
        setJobDescription(oldJobDescription);
    }, [])

    // UPDATE - Submit Changes to a Job Classification then return to Job Classifications page
    const update = async () => {
        try {
            if (jobTitle && jobDescription) {
                await Axios.put(updateJobClassificationsURL, {
                    jobTitle: jobTitle,
                    jobDescription: jobDescription,
                    idJobClassification: id,
                });
                alert(`${jobTitle}'s database record has been updated!`)
                navTo('/JobClassifications');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
            console.error('Error updating Facility Type.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Update Job Classification</h2>
            <article>
                <p>
                    If you would like to update this entry, enter new values for its attributes below
                    and click the "Save" button.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                                <div><label htmlFor="jobTitle">Name</label></div>
                                <input 
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    placeholder="Ex. Ranger" 
                                    required
                                    value={jobTitle}
                                    autoFocus
                                    onChange={(e) => {setJobTitle(e.target.value)}
                                    }/>
                                <div>Original: {oldJobTitle}</div>
                            </div>
                            <div><label htmlFor="jobDescription">Description</label></div>
                            <textarea
                                    name="jobDescription"
                                    id ="jobDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Patrols park, assists visitors, and manages wildlife."
                                    required
                                    value={jobDescription}
                                    onChange={(e) => {setJobDescription(e.target.value)}
                                    }></textarea>
                            <div>Original: {oldJobDescription}</div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button> <button onClick={()=> navTo('/JobClassifications')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default JobClassificationsUpdateForm;