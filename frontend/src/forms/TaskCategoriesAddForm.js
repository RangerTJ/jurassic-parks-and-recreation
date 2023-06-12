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
function TaskCategoriesAddForm ({hostURL, createButtonSound}) {

    // Task Categories SQL Endpoint
    const createTaskCategoriesURL = hostURL + '/api/insertTaskCategories';
    const navTo = useNavigate();

    // Task Category States for the Form
    const [categoryName, setCategoryName] = useState('')

    // CREATE - Insert New Task Category then return to Task Categories page
    const submit = async () => {
        try {
            if (categoryName) {
                createButtonSound.play();
                await Axios.post(createTaskCategoriesURL, {
                    categoryName: categoryName,
                });
                alert(`${categoryName} has been added to the database!`);
                navTo('/TaskCategories');
            } else {
                alert("Please fill out all required fields and try again.")
            }
        } catch(error) {
            console.error('Error inserting Category.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    return (
        <>
            <h2>Add Category</h2>
            <article>
                <p>
                    If you would like to add a new Task Category to the database, enter values for its attributes below
                    and click the "Add Category" button.
                    A red border around an input field means that it is required and that it still needs a valid input.
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
                                    autoFocus
                                    onChange={(e) => {setCategoryName(e.target.value)}
                                    }/>
                            </div>
                    </fieldset>
                </form>
                <div>
                    <p><button onClick={submit}>Add Category</button> <button onClick={()=> navTo('/TaskCategories')}>Cancel</button></p>
                </div>
            </article>
        </>
    );
}

export default TaskCategoriesAddForm;