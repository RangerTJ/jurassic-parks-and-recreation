// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function TaskCategoryPage({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // TaskCategories SQL Endpoints
    const getTaskCategoriesURL = hostURL + '/api/getTaskCategories';
    const deleteTaskCategoriesURL = hostURL + '/api/deleteTaskCategories/';

    // Task Category useStates
    const [taskCategoriesList, setTaskCategoriesList] = useState([])

   // READ Populate Table on load
   useEffect(()=> {
    getTaskCategories();
}, [])

    // ** Delete the manual refresh later and see if using the use-effect when parksList is modified works instead - was spam refreshing on just a load? **
    // DELETE - Deletes target
    const delTaskCategories = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to delete ${delVal.categoryName}?`)) {
                await Axios.delete(deleteTaskCategoriesURL + delVal.idTaskCategory);
                
                const mainViewResponse = await Axios.get(getTaskCategoriesURL);
                setTaskCategoriesList(mainViewResponse.data);
                console.log(mainViewResponse.data);
        
                alert(`${delVal.categoryName} has been removed from the database.`);
            }} catch (error) {
                console.error('Error deleting Category.', error);
        }
    };

    // Get table info
    const getTaskCategories = async ()=> {
        try {
            const response = await Axios.get(getTaskCategoriesURL)
            setTaskCategoriesList(response.data)
        } catch (error) {
            console.error('Error populating the view table.', error);
        }
    }

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const navToUpdate = (updateVal) => {
        const state = {
        oldCategoryName: updateVal.categoryName,
        id: updateVal.idTaskCategory
    };
        navTo("/TaskCategoriesUpdate", {state});
    }

    // Render Webpage
   return (
        <>  
            <h2>Task Categories</h2>
            <article>
                <h3>Add New Category</h3>
                <p>
                    Click the "Create" button below to add a new Task Category to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/TaskCategoriesAdd")}>Create</button></p>
                </div>
            </article>
            <article>
                <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively.
                </p>
            </article>
            <article>
                <h3>View Task Categories</h3>
                <p>
                    The table below shows existing information for Task idTaskCategory entities and includes
                    buttons to update or delete them.
                </p>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>Category</th>
                        </tr>
                        {taskCategoriesList.map((val, index)=> {
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delTaskCategories(val)}}>*</button></div>
                                    </td>
                                    <td  className="tableDescription">
                                        <div>#{val.idTaskCategory}</div>
                                        <div>{val.categoryName}</div>
                                    </td>
                                </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                </div>                                  
            </article>
        </>
    );
}
export default TaskCategoryPage;