// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function TaskCategoriesUpdateForm ({hostURL}) {

    // Follows reference strategy to read state object, as suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const location = useLocation();
    const { id, oldCategoryName} = location.state;

    // Task Categories SQL Endpoint
    const updateTaskCategoriesURL = hostURL + '/api/updateTaskCategories';
    const navTo = useNavigate();

    // Task Category States for the Form
    const [categoryName, setCategoryName] = useState('')

    // Pre-sets all the old values into the fields
    useEffect(()=> {
        setCategoryName(oldCategoryName);
    }, [])

    // UPDATE - Submit Changes to a Task Category then return to Task Categories page
    const update = async () => {
        try {
            if (categoryName) {
                await Axios.put(updateTaskCategoriesURL, {
                    categoryName: categoryName,
                    idTaskCategory: id,
                });
                alert(`${categoryName}'s database record has been updated!`)
                navTo('/TaskCategories');
                } else {
                    alert("Please fill out all required fields and try again.")
                }
        } catch (error) {
            console.error('Error updating Category.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        };
    };

    return (
        <>
            <h2>Update Task Category</h2>
            <article>
                <p>
                    If you would like to update this entry, enter new values for its attributes below
                    and click the "Save" button.
                </p>
                <form>
                    <fieldset>
                        <legend>Information</legend>
                            <div className="selectorP">
                            <div><label htmlFor="categoryName">Name</label></div>
                                <input 
                                    type="text"
                                    id="categoryName"
                                    name="categoryName"
                                    placeholder="Ex. IT, Medical, etc." 
                                    required
                                    value={categoryName}
                                    autoFocus
                                    onChange={(e) => {setCategoryName(e.target.value)}
                                    }/>
                                <div>Original: {oldCategoryName}</div>
                            </div>
                            
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={update}>Save</button></p>
                </div>
            </article>
        </>
    );
}

export default TaskCategoriesUpdateForm;