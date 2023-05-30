// // Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// // URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import staffDefaultImg from '../images/staffImages/default_staff.png';


// HostURL Passed from App.js
function ParksPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    //// Park SQL Endpoints
    const getParksURL = hostURL + '/api/getParks';
    const deleteParksURL = hostURL + '/api/deleteParks/';

    // Parks Table Functions
    const [parksList, setParksList] = useState([])


    // Lightbox stuff placeholder in case of using park images later

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
        getParks();
    }, [])

    // DELETE - Deletes target
    const delParks = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.parkName}?`)) {
                await Axios.delete(deleteParksURL + delVal.idPark);
                const mainViewResponse = await Axios.get(getParksURL);
                setParksList(mainViewResponse.data);
                console.log(mainViewResponse.data);
                alert(`${delVal.parkName} has been removed from the database.`);
           }} catch (error) {
                console.error('Error deleting Park.', error);
                alert('MYSQL Server Error: ' + error.response.data);
            }
    };

    // Get table info
    const getParks = async ()=> {
        try {
            const response = await Axios.get(getParksURL)
            setParksList(response.data)
        } catch (error) {
            console.error('Error populating the view table.', error);
        }
    }

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    const navToUpdate = (updateVal) => {
        const state = {
        oldParkName: updateVal.parkName,
        oldParkDescription: updateVal.parkDescription,
        oldParkLocation: updateVal.parkLocation,
        oldParkPhoto: updateVal.parkPhoto,
        id: updateVal.idPark
    };
        navTo("/ParksUpdate", {state});
    }

    // Render Webpage
    return (
        <>  
            <h2>Parks</h2>
            <article>
                <h3>Add New Park</h3>
                <p>
                Click the "Create" button below to add a new Park to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/ParksAdd")}>Create</button></p>
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
                <h3>View Parks</h3>
                <p>
                    The table below shows existing information for Park entities and includes
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
                            <th>Park</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Photo</th>
                        </tr>
                        {parksList.map((val, index)=> {
                            // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            // No, I didn't make that name up.
                            const altText = val.parksPhoto ? val.parksPhoto.substring(14, val.parksPhoto.indexOf('.')) : "Default"
                            
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delParks(val)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div>#{val.idPark}</div>
                                        <div><strong>{val.parkName}</strong></div>
                                    </td>
                                    <td className="tableDescription">{val.parkDescription}</td>
                                    <td>{val.parkLocation}</td>
                                    {/* May use later if image attribute added */}
                                    <td>
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger. */}
                                        {val.parkPhoto ?
                                        <img src={val.parkPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.parkPhoto)}/>
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
};

export default ParksPage;