// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // May not need?
import Axios from 'axios';
import defaultImg from '../images/tableDefaultPreview.png';


// HostURL Passed from App.js
function DietsPage ({hostURL, deleteButtonSound}) {

    // Safe Delete Sound (error handling to prevent SFX fail from messing up CRUD operation)
    const delSound = () => {
        try {
            deleteButtonSound.play();
        } catch (error) {
            console.error("")
        }
    }

    // Navigation Function
    const navTo = useNavigate();
    
    // Diets SQL Endpoints
    const getDietsURL = hostURL + '/api/getDiets';
    const deleteDietsURL = hostURL + '/api/deleteDiets/';

    // States
    const [dietsList, setDietsList] = useState([])

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
    

    // READ Populate Table on Page Load
    useEffect(() => {
        getDiets();
    }, []);

    // DELETE Function
    const delDiets = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.dietName}?`)) {
                delSound();
                await Axios.delete(deleteDietsURL + delVal.idDiet);

                const mainViewResponse = await Axios.get(getDietsURL);
                setDietsList(mainViewResponse.data);
                console.log(mainViewResponse.data);
                
                alert(`${delVal.dietName} has been removed from the database.`);
        }} catch (error) {
            console.error('Error deleting Diet.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    // Get Table
    const getDiets = async () => {
        try {
            const response = await Axios.get(getDietsURL)
            setDietsList(response.data)
        }
        catch (error) {
            console.error('Error populating the table.', error);
        }
    };

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const navToUpdate = (updateVal) => {
        const state = {
            oldDietName: updateVal.dietName,
            oldDietDescription: updateVal.dietDescription,
            oldDietIcon: updateVal.dietIcon,
            id: updateVal.idDiet
    };
        navTo("/DietsUpdate", {state});
    }


    // Render Page
    return (
        <>
            <h2>Diets</h2>
            <article>
                <h3>Add New Diet</h3>
                <p>
                    Click the "Create" button below to add a new Diet to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/DietsAdd")}>Create</button></p>
                </div>
            </article>
            <article>
            <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Species.
                    You are <strong>restricted</strong> from <strong>deleting</strong> a Diet, if it has been assigned to a Species.
                </p>
            </article>
            <article>
                <h3>View Diets</h3>
                <p>
                    The table below shows existing information for Diet entities and includes buttons to update or delete them.
                    If you would like to view a larger version of a 
                    non-default photo click it to see an expanded view. Click anywhere again to dismiss it.
                </p>
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
                                <th>Diet</th>
                                <th>Description</th>
                                <th>Icon</th>
                            </tr>
                            {dietsList.map((val, index) => {

                            // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            // Link Accessed/Verified on 6/1/2023
                            const altText = val.facilityPhoto ? val.facilityPhoto.substring(14, val.facilityPhoto.indexOf('.')) : "Default"

                                return (
                                    <tr key={index}>
                                        <td className="buttonHolder">
                                            <div><button className="tableButton" onClick={() => {navToUpdate(val)}}>Edit</button></div>
                                            <div><button className="tableButton" onClick={() => {delDiets(val)}}>*</button></div>
                                        </td>
                                        <td className="tableDescription">
                                            <div>#{val.idDiet}</div>
                                            <div><strong>{val.dietName}</strong></div>
                                        </td>
                                        <td className="tableDescription">
                                            <div>{val.dietDescription}</div>
                                        </td>
                                        <td className="imageHolder">
                                            {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                            URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                            Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                            {val.dietIcon ?
                                            <img src={val.dietIcon} alt={altText} width={160} height={90} onClick={() => showImage(val.dietIcon)}/>
                                            :
                                            <img src={defaultImg} alt="Default" width={160} height={90} />
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    );
}

export default DietsPage;