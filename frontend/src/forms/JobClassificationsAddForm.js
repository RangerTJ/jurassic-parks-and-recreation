// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic form functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function JobClassificationsAddForm ({hostURL, createButtonSound}) {

    // Job Classification SQL Endpoint
    const createJobClassificationsURL = hostURL + '/api/insertJobClassifications';
    const navTo = useNavigate();

    // Job Classification States for the Form
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')

    // CREATE - Insert Job Classification then return to Job Classifications page
    const submit = async () => {
        try {
            if (jobTitle && jobDescription) {
                await Axios.post(createJobClassificationsURL, {
                    jobTitle: jobTitle,
                    jobDescription: jobDescription,
                });
                createButtonSound.play();
                alert(`Job Classification ${jobTitle} has been added to the database!`);
                navTo('/JobClassifications');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
            console.error('Error inserting Job Classifications Type.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Job Classification</h2>
            <article>
                <p>
                    If you would like to add a new Job Classification to the database, enter values for its attributes below
                    and click the "Add Job" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
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
                                    autoFocus
                                    onChange={(e) => {setJobTitle(e.target.value)}
                                    }/>
                            </div>
                            <div><label htmlFor="jobDescription">Description</label></div>
                            <textarea
                                    name="jobDescription"
                                    id ="jobDescription"
                                    cols="40" rows="5" 
                                    min="5" max="255"
                                    placeholder="Ex. Patrols park, assists visitors, and manages wildlife."
                                    required
                                    onChange={(e) => {setJobDescription(e.target.value)}
                                    }></textarea>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Job</button> <button onClick={()=> navTo('/JobClassifications')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default JobClassificationsAddForm;