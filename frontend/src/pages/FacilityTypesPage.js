// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function FacilityTypesPage ({hostURL, deleteButtonSound}) {

    // Navigation Function
    const navTo = useNavigate();

    // FacilityTypes SQL Endpoints
    const getFacilityTypesURL = hostURL + '/api/getFacilityTypes';
    const deleteFacilityTypesURL = hostURL + '/api/deleteFacilityTypes/';

    // Facility Type Table Functions
    const [facilityTypesList, setFacilityTypesList] = useState([])

    // READ Populate Table on load
    useEffect(()=> {
        getFacilityTypes();
    }, [])

    // DELETE - Deletes target Facility Type and refreshes Table
    const delFacilityTypes = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.facTypeName}?`)) {
                deleteButtonSound.play();
                await Axios.delete(deleteFacilityTypesURL + delVal.idFacilityType);
                
                const mainViewResponse = await Axios.get(getFacilityTypesURL);
                setFacilityTypesList(mainViewResponse.data);
                console.log(mainViewResponse.data);
                                
                alert(`${delVal.facTypeName} has been removed from the database.`);
        }} catch (error) {
            console.error('Error deleting Facility Type.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    // Populate Facility Types List
    const getFacilityTypes = async ()=> {
        try {
            const response = await Axios.get(getFacilityTypesURL)
            setFacilityTypesList(response.data)
        } catch (error) {
            console.error('Error populating the view table.', error);
        }
    }

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const navToUpdate = (updateVal) => {
        const state = {
        oldFacTypeName: updateVal.facTypeName,
        oldFacTypeDescription: updateVal.facTypeDescription,
        id: updateVal.idFacilityType
    };
        navTo("/FacilityTypesUpdate", {state});
    }

    // Render Webpage
    return (
        <>  
            <h2>Facility Types</h2>
            <article>
                <h3>Add New Facility Type</h3>
                <p>
                    Click the "Create" button below to add a new Facility Type to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/FacilityTypesAdd")}>Create</button></p>
                </div>
            </article>
            <article>
                <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Facilities.
                    You are <strong>restricted</strong> from <strong>deleting</strong> a Facility Type, if it has been assigned to a Facility.
                </p>
            </article>
            <article>
                <h3>View Facility Types</h3>
                <p>
                    The table below shows existing information for Facility Type entities and includes
                    buttons to update or delete them.
                </p>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                        {facilityTypesList.map((val, index)=> {
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delFacilityTypes(val)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div>#{val.idFacilityType}</div>
                                        <div><strong>{val.facTypeName}</strong></div>
                                    </td>
                                    <td className="tableDescription">{val.facTypeDescription}</td>
                                </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                </div>                                  
            </article>
        </>
    );
};

export default FacilityTypesPage;