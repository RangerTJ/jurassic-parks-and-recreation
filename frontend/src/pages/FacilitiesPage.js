// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import defaultImg from '../images/tableDefaultPreview.png';
import SelectorParks from "../components/selectorParks";
import SelectorFacilityTypes from "../components/selectorFacilityTypes";


// HostURL Passed from App.js
function FacilitiesPage ({hostURL, deleteButtonSound}) {

    // Safe Delete Sound (error handling to prevent SFX fail from messing up CRUD operation)
    const delSound = () => {
        try {
            deleteButtonSound.play();
        } catch (error) {
            console.error("SFX Error")
        }
    }

    // Navigation Function
    const navTo = useNavigate();

    // Facilities SQL Endpoints
    const getFacilitiesURL = hostURL + '/api/getFacilities';
    const deleteFacilitiesURL = hostURL + '/api/deleteFacilities/';
    const filterFacilitiesByParkURL = hostURL + '/api/filterFacilitiesByPark'
    const filterFacilitiesByTypeURL = hostURL + '/api/filterFacilitiesByType'
    const filterFacilitiesParkAndTypeURL = hostURL + '/api/filterFacilitiesParkAndType'

    // Facilities Table Functions
    const [facilitiesList, setFacilitiesList] = useState([])
    const [parkName, setParkName] = useState('')
    const [facTypeName, setFacTypeName] = useState('')

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

    // READ Facilities Table
    useEffect(()=> {
        getFacilities();
    }, [])

    // READ Changes to Facilities Table (Filter Changes)
    useEffect(() => {
        facilitiesFilters();
    }, [parkName, facTypeName]);

    // Handle two filters and let them be used concurrently
    const facilitiesFilters = async () => {
        // If both filters selected, apply return of both selections
        if(parkName && facTypeName) {
            try {
                const response = await Axios.post(filterFacilitiesParkAndTypeURL, {parkName : parkName, facTypeName: facTypeName})
                setFacilitiesList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (parkName && facTypeName==='') {
            // If just Parks selected, return parks filter
            try {
                const response = await Axios.post(filterFacilitiesByParkURL, {parkName : parkName})
                setFacilitiesList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (parkName==='' && facTypeName) {
            // If just Types selected, return types filter
            try {
                const response = await Axios.post(filterFacilitiesByTypeURL, {facTypeName : facTypeName})
                setFacilitiesList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        }
        // If neither filter selected, return everything
        else {
            await getFacilities();
        }
    }

    // DELETE - Deletes target Facility and refreshes Table
    const delFacility = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.facilityName}?`)) {
                delSound();
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
    // Link Accessed/Verified on 6/1/2023
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
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Biological Assets.
                    You are <strong>restricted</strong> from <strong>deleting</strong> a Facility, if it has been assigned to a Biological Asset.
                </p>
            </article>
            {/* Could potentially reuse the bio assets species filter for facility types here */}
            <article>
                <h3>View Facilities</h3>
                <p>
                    The table below shows existing information for park facilities and includes
                    buttons to update or delete them. If you would like to view a larger version of a 
                    non-default photo click it to see an expanded view. Click anywhere again to dismiss it.
                </p>
                <p>
                    You can use the Park and Facility Type selectors below to concurrently filter Facilities by these attributes.
                    Select "None" to remove the respective filter.
                </p>
                <div className="inlineDiv">
                    <div className="selectorP"><SelectorParks hostURL={hostURL} setParkName={setParkName} parkName={parkName} isRequired={false}/></div>
                    <div className="selectorP"><SelectorFacilityTypes hostURL={hostURL} setFacTypeName={setFacTypeName} facTypeName={facTypeName} isRequired={false}/></div>
                </div>
                {/* Lightbox example code used from: Creating a Simple Lightbox From Scratch in React by Alexandra Radevich
                URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                Accessed 5/22/2023. Modified with alt text value and custom display class.*/}
                { lightboxDisplay ?
                <div id="lightbox"onClick={hideLightBox} className="lightbox">
                    <img id="lightbox-img" src={imageToShow} alt={imageToShow} className="lightbox-image"></img>
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
                            </tr>
                            {facilitiesList.map((val, index)=> {
                            
                            // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            // Link Accessed/Verified on 6/1/2023
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
                                            <li><strong>Location: </strong>{val.facilityLocation}</li>
                                            <li><strong>Security: {val.securityRating}</strong></li>
                                        </ul>
                                    </td>
                                    <td className="imageHolder">
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                        {val.facilityPhoto ?
                                        <img src={val.facilityPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.facilityPhoto)}/>
                                        :
                                        <img src={defaultImg} alt="Default" width={160} height={90} />
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