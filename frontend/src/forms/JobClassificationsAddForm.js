// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function JobClassificationsAddForm ({hostURL}) {

    // Job Classification SQL Endpoint
    const createJobClassificationsURL = hostURL + '/api/insertJobClassifications';
    const navTo = useNavigate();

    // Job Classification States for the Form
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')

    // CREATE - Insert Job Classification then return to asset home
    const submit = async () => {
        try {
            if (jobTitle && jobDescription) {
                await Axios.post(createJobClassificationsURL, {
                    jobTitle: jobTitle,
                    jobDescription: jobDescription,
                });
                alert(`Job Classification ${jobTitle} has been added to the database!`);
                navTo('/JobClassifications');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch(error) {
                console.error('Error inserting Job Classifications Type.', error)
        }
    };

    return (
        <>
            <h2>Add Job Classification</h2>
            <article>
                <p>
                    If you would like to add a new Job Classification to the database, enter values for its attributes below
                    and click the "Add Job" button.
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
                    <p><button onClick={submit}>Add Job</button></p>
                </div>
            </article>
        </>
    );
}

export default JobClassificationsAddForm;