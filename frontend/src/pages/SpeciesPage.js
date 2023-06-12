// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Axios from 'axios';
import defaultImg from '../images/tableDefaultPreview.png';
import SelectorDietTypes from "../components/selectorDiets";
import SelectorHabitats from "../components/selectorHabitats";


// HostURL Passed from App.js
function SpeciesPage ({hostURL, deleteButtonSound}) {

    // Navigation Function
    const navTo = useNavigate();

    // Species SQL Endpoints
    const getSpeciesURL = hostURL + '/api/getSpecies';
    const deleteSpeciesURL = hostURL + '/api/deleteSpecies/';
    const filterSpeciesByDietURL = hostURL + '/api/getSpeciesByDiet';
    const filterSpeciesByHabitatURL = hostURL + '/api/getSpeciesByHabitat';
    const filterSpeciesByDietAndHabitatURL = hostURL + '/api/getSpeciesByDietAndHabitat';

    // Species Table Functions
    const [speciesList, setSpeciesList] = useState([])
    const [dietName, setDietName] = useState('');
    const [habitatName, setHabitatName] = useState('');

    // READ Populate Species Table
    useEffect(() => {
        getSpecies();
    }, [])

    // READ Populate Species List
    const getSpecies = async () => {
        try {
            const response = await Axios.get(getSpeciesURL)
            setSpeciesList(response.data)
        }
        catch (error) {
            console.error('Error populating the Species table.', error);
        }
    };

    // READ Changes to Employee Tasks Table (Filter Changes)
    useEffect(() => {
        SpeciesFilters();
    }, [dietName, habitatName]);

    // Handle two filters and let them be used concurrently
    const SpeciesFilters = async () => {
        // If both filters selected, apply return of both selections
        if(dietName && habitatName) {
            try {
                const response = await Axios.post(filterSpeciesByDietAndHabitatURL, {dietName: dietName, habitatName: habitatName})
                setSpeciesList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (dietName && habitatName==='') {
            // If just Diets selected, return diets filter
            try {
                const response = await Axios.post(filterSpeciesByDietURL, {dietName: dietName})
                setSpeciesList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (dietName==='' && habitatName) {
            // If just Habitats selected, return habitats filter
            try {
                const response = await Axios.post(filterSpeciesByHabitatURL, {habitatName: habitatName})
                setSpeciesList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        }
        // If neither filter selected, return everything
        else {
            await getSpecies();
        }
    }

    // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
    // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
    // Link Accessed/Verified on 6/1/2023
    const navToUpdate = (updateVal) => {
        const state = {
        oldDietName: updateVal.dietName,
        oldHabitatName: updateVal.habitatName,
        oldSpeciesName: updateVal.speciesName,
        oldSpeciesDescription: updateVal.speciesDescription,
        oldThreatLevel: updateVal.threatLevel,
        oldSpeciesPhoto: updateVal.speciesPhoto,
        id: updateVal.idSpecies
    };
        navTo("/SpeciesUpdate", {state});
    }

    // DELETE - Deletes target Species and refreshes Table
    const delSpecies = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.speciesName}?`)) {
                deleteButtonSound.play();
                await Axios.delete(deleteSpeciesURL + delVal.idSpecies);

                const mainViewResponse = await Axios.get(getSpeciesURL);
                setSpeciesList(mainViewResponse.data);
                console.log(mainViewResponse.data);
                
                alert(`${delVal.speciesName} has been removed from the database.`);
        }} catch (error) {
            console.error('Error deleting Species.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

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
    
    
    return (
        <>
            <h2>Species</h2>
            <article>
                <h3>Add New Species</h3>
                <p>
                    Click the "Create" button below to add a new Species to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/SpeciesAdd")}>Create</button></p>
                </div>
            </article>
            <article>
                <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Biological Assets.
                    You are <strong>restricted</strong> from <strong>deleting</strong> a Species, if it has been assigned to a Biological Asset.
                </p>
            </article>
            <article>
                <h3>View Species</h3>
                <p>
                    The table below shows existing information for Biological Asset Species and includes
                    buttons to update or delete them. If you would like to view a larger version of a 
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
                <p>
                    You can use the Diet or Habitat selectors below to concurrently filter the species Table.
                    Select "None" for either filter to remove it.
                </p>
            
                <div className="inlineDiv">
                    <div className="selectorP"><SelectorDietTypes hostURL={hostURL} setDietName={setDietName} dietName={dietName} isRequired={false}/></div>
                    <div className="selectorP"><SelectorHabitats hostURL={hostURL} setHabitatName={setHabitatName} habitatName={habitatName} isRequired={false}/></div>
                </div>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                            <tr>
                                <th>Edit</th>
                                <th>Species</th>
                                <th>Description</th>
                                <th>Diet</th>
                                <th>Habitat</th>
                                <th>Threat Level</th>
                                <th>Species Photo</th>  
                            </tr>

                            {speciesList.map((val, index) => {
                                // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                                // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                                // Link Accessed/Verified on 6/1/2023
                                const altText = val.speciesPhoto ? val.speciesPhoto.substring(14, val.speciesPhoto.indexOf('.')) : "Default"
                            
                                return (
                                    <tr key={index}>
                                        <td className="buttonHolder">
                                            <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                            <div><button className="tableButton" onClick={()=> {delSpecies(val)}}>*</button></div>
                                        </td>
                                        <td className="tableDescription">
                                            <div>#{val.idSpecies}</div>
                                            <div><strong>{val.speciesName}</strong></div>
                                        </td>
                                        <td className="tableDescription">
                                            <div>{val.speciesDescription}</div>
                                        </td>
                                        <td className="tableDescription">
                                            <div>{val.dietName}</div>
                                        </td>
                                        <td className="tableDescription">
                                            <div>{val.habitatName}</div>
                                        </td>
                                        <td className="tableDescription">
                                            <div>{val.threatLevel}</div>
                                        </td>
                                        <td className="imageHolder">
                                            {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                            URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                            Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                            {val.speciesPhoto ?
                                            <img src={val.speciesPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.speciesPhoto)}/>
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

export default SpeciesPage;
