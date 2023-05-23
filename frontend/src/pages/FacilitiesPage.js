// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import staffDefaultImg from '../images/staffImages/default_staff.png';


// HostURL Passed from App.js
function FacilitiesPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // BiologicalAssets SQL Endpoints
    const getFacilitiesURL = hostURL + '/api/getFacilities';  // TO DO - CREATE USE EFFECT AND USE STATE
    const deleteFacilitiesURL = hostURL + '/api/deleteFacilities/';  // TO DO - NEED TO ADD USE STATES AND CRUD FUNCTIONS FOR THIS; INSERT/UPDATE GO ON RESPECTIVE FORM PAGES

    // Bio Asset Table Functions
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

    // READ Populate Biological Asset Table
    useEffect(()=> {
        getFacilities();
    }, [])

    // DELETE - Deletes target bio asset and refreshes all 3 tables
    const delFacility = (delID) => {
        if (window.confirm(`Are you sure you want to remove Facility #${delID}?`)) {
        Axios.delete(deleteFacilitiesURL + delID)
        .then(() => {Axios.get(getFacilitiesURL)
        .then((response) => {setFacilitiesList(response.data);
            console.log(response.data)})
        .then(alert(`Facility #${delID} has been removed from the database.`)
            );
          });
     }; 
    };

    //Populate Facilities List
    const getFacilities = ()=> {
        Axios.get(getFacilitiesURL)
        .then((response)=> {setFacilitiesList(response.data)})
    }

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
            {/* End experimental copy/paste */}
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
            {/* Could potentially reuse the bio assets species filter for job titles here or do a last name search or something */}
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Park</th>
                                <th>Details</th>
                                {/* <th>Type</th>
                                <th>Habitat</th>
                                <th>Location</th>
                                <th>Security</th> */}
                                <th>Photo</th>
                                <th>Description</th>
                                <th>Notes</th>

                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            {facilitiesList.map((val, index)=> {
                            
                            // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            // No, I didn't make that name up.
                            const altText = val.facilityPhoto ? val.facilityPhoto.substring(14, val.facilityPhoto.indexOf('.')) : "Default"
                            const habitatDesc = val.habitatName ? val.habitatName : "NOT ENCLOSURE";
                            
                            return (
                                <tr key={index}>
                                    <td>{val.idFacility}</td>
                                    <td>{val.facilityName}</td>
                                    <td>{val.parkName}</td>
                                    <td className="tableDescription">
                                        <div>{val.facTypeName}.</div>
                                        <div>{habitatDesc}.</div>
                                        <div>{val.facilityLocation}</div>
                                        <div><strong>Security: {val.securityRating}</strong></div>
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
                                    <td><button onClick={()=> {navToUpdate(val)}}>Update</button></td>
                                    <td><button onClick={()=> {delFacility(val.idFacility)}}>Delete</button></td>
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