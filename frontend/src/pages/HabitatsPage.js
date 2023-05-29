// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import staffDefaultImg from '../images/staffImages/default_staff.png';  // TEMP

//////////////////////
// REMINDER: REMOVING/DEPRECATING SIZE ATTRIBUTE (eliminate references to it later)
/////////////////////

// HostURL Passed from App.js
function HabitatsPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // Habitats SQL Endpoints
    const getHabitatsURL = hostURL + '/api/getHabitats';
    const deleteHabitatsURL = hostURL + '/api/deleteHabitats/';

    // Habitat States
    const [habitatsList, setHabitatsList] = useState([])

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

    // READ Populate Table on load
    useEffect(()=> {
        getHabitats();
    }, [])

    // DELETE - Deletes target Habitat and refreshes Table
    const delHabitats = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.habitatName}?`)) {
                await Axios.delete(deleteHabitatsURL + delVal.idHabitat);
                
                const mainViewResponse = await Axios.get(getHabitatsURL);
                setHabitatsList(mainViewResponse.data);
                console.log(mainViewResponse.data);
        
                alert(`${delVal.habitatName} has been removed from the database.`);
            }} catch (error) {
                console.error('Error deleting Habitat.', error);
        }
    };

    // Get Habitats List
    const getHabitats = async ()=> {
        try {
            const response = await Axios.get(getHabitatsURL)
            setHabitatsList(response.data)
        } catch (error) {
            console.error('Error populating the view table.', error);
        }
    }

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const navToUpdate = (updateVal) => {
        const state = {
        oldHabitatName: updateVal.habitatName,
        oldHabitatDescription: updateVal.habitatDescription,
        oldHabitatSize: updateVal.habitatSize,
        oldHabitatPhoto: updateVal.habitatPhoto,
        id: updateVal.idHabitat
    };
        navTo("/HabitatsUpdate", {state});
    }

    // Render Webpage
    return (
        <>  
            <h2>Habitats</h2>
            <article>
                <h3>Add New Habitat</h3>
                <p>
                Click the "Create" button below to add a new Habitat to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/HabitatsAdd")}>Create</button></p>
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
                <h3>View Habitats</h3>
                <p>
                    The table below shows existing information for Habitat entities and includes
                    buttons to update or delete them.
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
                            <th>Habitat</th>
                            <th>Description</th>
                            {/* Size will be deprecated/deleted from DDL */}
                            <th>Size</th>
                            <th>Photo</th>
                        </tr>
                        {habitatsList.map((val, index)=> {
                            // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            // No, I didn't make that name up.
                            const altText = val.habitatPhoto ? val.habitatPhoto.substring(14, val.habitatPhoto.indexOf('.')) : "Default"
                            
                            return (
                                <tr key={index}>
                                    <td>
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>

                                        {/* ** Edit later tonight - pass whole object to delete for better errors messages ** */}
                                        <div><button className="tableButton" onClick={()=> {delHabitats(val)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div>#{val.idHabitat}</div>
                                        <div><strong>{val.habitatName}</strong></div>
                                    </td>
                                    <td className="tableDescription">{val.habitatDescription}</td>
                                    {/* Size will be deprecated/deleted from DDL */}
                                    <td>{val.habitatSize}</td>
                                    <td>
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger. */}
                                        {val.habitatPhoto ?
                                        <img src={val.habitatPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.habitatPhoto)}/>
                                        :
                                        <img src={staffDefaultImg} alt="Default Image" width={160} height={90} />
                                        }
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

export default HabitatsPage;