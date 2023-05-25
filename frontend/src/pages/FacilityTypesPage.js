// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function FacilityTypesPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // FacilityTypes SQL Endpoints
    const getFacilityTypesURL = hostURL + '/api/getFacilityTypes';
    const createFacilityTypesURL = hostURL + '/api/insertFacilityTypes';
    const updateFacilityTypesURL = hostURL + '/api/updateFacilityTypes';
    const deleteFacilityTypesURL = hostURL + '/api/deleteFacilityTypes/';

    // Bio Asset Table Functions
    const [facilityTypesList, setFacilityTypesList] = useState([])
    const [facilityType, setFacilityType] = useState('')

    // READ Populate Table on load
    useEffect(()=> {
        getFacilityTypes();
    }, [])

    const delFacilityTypes = async (delID) => {
        try {
            if (window.confirm(`Are you sure you want to remove Facility Type #${delID}?`)) {
                await Axios.delete(deleteFacilityTypesURL + delID);
                
                const mainViewResponse = await Axios.get(getFacilityTypesURL);
                setFacilityTypesList(mainViewResponse.data);
                console.log(mainViewResponse.data);
        
                alert(`Facility Type #${delID} has been removed from the database.`);
            }} catch (error) {
                console.error('Error deleting Facility Type.', error);
        }
    };

    // Get table info
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
                    buttons on the left side of the asset's corresponding column to enter the edit menu or delete
                    it from the database, respectively.
                </p>
            </article>
            {/* Could potentially reuse the bio assets species filter for job titles here or do a last name search or something */}
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
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                        {facilityTypesList.map((val, index)=> {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>

                                        {/* ** Edit later - pass whole object to delete for better errors messages ** */}
                                        <div><button className="tableButton" onClick={()=> {delFacilityTypes(val.idFacilityType)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div>Type #{val.idFacilityType}</div>
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