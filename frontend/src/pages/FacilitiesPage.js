// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import staffDefaultImg from '../images/staffImages/default_staff.png';


// HostURL Passed from App.js
function FacilitiesPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // Facilities SQL Endpoints
    const getFacilitiesURL = hostURL + '/api/getFacilities';  // TO DO - CREATE USE EFFECT AND USE STATE
    const deleteFacilitiesURL = hostURL + '/api/deleteFacilities/';  // TO DO - NEED TO ADD USE STATES AND CRUD FUNCTIONS FOR THIS; INSERT/UPDATE GO ON RESPECTIVE FORM PAGES

    // Facilities Table Functions
    const [facilitiesList, setFacilitiesList] = useState([])
    const [facility, setFacility] = useState('')

    /* Citation: Creating a Simple Lightbox From Scratch in React by Alexandra Radevich
    URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
    Example code used to begin implementation and modified slightly to suit project needs. 
    All of the lightbox-related code on this page was directly adapted from this tutorial.
    Accessed 5/22/2023. No modification of the following 2x declared useStates and 2x functions.*/
    const [lightboxDisplay, setLightBoxDisplay] = useState(false)
    const [imageToShow, setImageToShow] = useState('')
    
    // Displays lightbox + selected image when triggered
    const showImage = (image) => {  
        setImageToShow(image);
        setLightBoxDisplay(true);
    };
    
    // Hides lightbox when triggered ()
    const hideLightBox = () => {
        setLightBoxDisplay(false)
     }
    /*!!! End of lightbox-tutorial code for function portion of page (see HTML rendering for calling of Lightbox commands) !!!*/

    // READ Populate Facilities Table
    useEffect(()=> {
        getFacilities();
    }, [])

    // DELETE - Deletes target Facility and refreshes Table
    const delFacility = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.facilityName}?`)) {
                await Axios.delete(deleteFacilitiesURL + delVal.idFacility);
                
                const mainViewResponse = await Axios.get(getFacilitiesURL);
                setFacilitiesList(mainViewResponse.data);
                console.log(mainViewResponse.data);
        
                alert(`${delVal.facilityName} has been removed from the database.`);
            }} catch (error) {
                console.error('Error deleting facility.', error);
                alert('MYSQL Server Error: ' + error.response.data);
        }
    };
    
    // Populate Facilities List
    const getFacilities = async ()=> {
        try {
            const response = await Axios.get(getFacilitiesURL)
            setFacilitiesList(response.data)
        } catch (error) {
            console.error('Error populating the view table.', error);
        }
    };

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const navToUpdate = (updateVal) => {
        const state = {
        oldParkName: updateVal.parkName,
        oldFacilityName: updateVal.facilityName,
        oldFacTypeName: updateVal.facTypeName,
        oldHabitatName: updateVal.habitatName,
        oldFacilityLocation: updateVal.facilityLocation,
        oldSecurityRating: updateVal.securityRating,
        oldFacilityPhoto: updateVal.facilityPhoto,
        oldFacilityDescription: updateVal.facilityDescription,
        oldFacilityNote: updateVal.facilityNote,
        id: updateVal.idFacility
    };
        navTo("/FacilitiesUpdate", {state});
    }

    // Render Webpage
    return (
        <>  
            <h2>Facilities</h2>
            <article>
                <h3>Add New Facility</h3>
                <p>
                    Click the "Create" button below to add a new Facility to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/FacilitiesAdd")}>Create</button></p>
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
            {/* Could potentially reuse the bio assets species filter for facility types here */}
            <article>
                <h3>View Facilities</h3>
                <p>
                    The table below shows existing information for park facilities and includes
                    buttons to update or delete them. If you would like to view a larger version of a 
                    non-default photo click it to see a larger version. Then click anywhere again to dismiss the view.
                </p>
                {/* Lightbox example code used from: Creating a Simple Lightbox From Scratch in React by Alexandra Radevich
                URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                Accessed 5/22/2023. Modified with alt text value and custom display class.*/}
                { lightboxDisplay ?
                <div id="lightbox"onClick={hideLightBox} className="lightbox">
                    <img id="lightbox-img" src={imageToShow} atl={imageToShow} className="lightbox-image"></img>
                </div>
                : '' }
                <div className="scrollableTable">
                    <table>
                        <tbody>
                            <tr>
                                <th>Edit</th>
                                <th>Facility</th>
                                <th>Park</th>
                                <th>Details</th>
                                <th>Photo</th>
                                <th>Description</th>
                                <th>Notes</th>

                                {/* <th>Update</th>
                                <th>Delete</th> */}
                            </tr>
                            {facilitiesList.map((val, index)=> {
                            
                            // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            // No, I didn't make that name up.
                            const altText = val.facilityPhoto ? val.facilityPhoto.substring(14, val.facilityPhoto.indexOf('.')) : "Default"
                            const habitatDesc = val.habitatName ? val.habitatName : "NOT ENCLOSURE";
                            
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delFacility(val)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div>#{val.idFacility}</div>
                                        <div><strong>{val.facilityName}</strong></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div><strong>{val.parkName}</strong></div>
                                        <p>{val.parkLocation}</p>
                                    </td>
                                    <td className="tableDescription">
                                        <ul>
                                            <li>{val.facTypeName}</li>
                                            <li>{habitatDesc}</li>
                                            <li>{val.facilityLocation}</li>
                                            <li><strong>Security: {val.securityRating}</strong></li>
                                        </ul>
                                    </td>
                                    <td>
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                        {val.facilityPhoto ?
                                        <img src={val.facilityPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.facilityPhoto)}/>
                                        :
                                        <img src={staffDefaultImg} alt="Default Image" width={160} height={90} />
                                        }
                                    </td>
                                    <td className="tableDescription">{val.facilityDescription}</td>
                                    <td className="tableDescription">{val.facilityNote}</td>
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

export default FacilitiesPage;