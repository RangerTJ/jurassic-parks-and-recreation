// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023

/* Method for detecting if object is empty by using keys length (count) based on the solution suggest in 
stackoverflow post by user Dhaval Chaudhary on 9/16/2016. Accessed on 6/3/2023.
This criteria was used to determine whether to conditionally render mismatch articles and tables conditionally displayed on this page.
URL: https://stackoverflow.com/questions/2673121/how-to-check-if-object-has-any-properties-in-javascript */


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorSpecies from "../components/selectorSpecies";
import defaultImg from '../images/tableDefaultPreview.png';
import SelectorFacilities from "../components/selectorFacilities";


// HostURL Passed from App.js
function BiologicalAssetsPage ({hostURL, deleteButtonSound}) {

    // Navigation Function
    const navTo = useNavigate();

    // BiologicalAssets SQL Endpoints
    const getBiologicalAssetsURL = hostURL + '/api/getBiologicalAssets';  // Get All Assets
    const deleteBiologicalAssetsURL = hostURL + '/api/deleteBiologicalAssets/';  // 
    const checkBiologicalAssetsHabitatsURL = hostURL + '/api/checkBiologicalAssetsHabitats';  // Habitat mismatches
    const checkBiologicalAssetsSecurityURL = hostURL + '/api/checkBiologicalAssetsSecurity';  // Security mismatches
    const filterBioAssetsBySpeciesURL = hostURL + '/api/filterBioAssetsBySpecies';  // Species Filter
    const filterBioAssetsByFacilityURL = hostURL + '/api/filterBioAssetsByFacility';  // Facility Filter
    const filterBioAssetsBySpeciesAndFacilityURL = hostURL + '/api/filterBioAssetsBySpeciesAndFacility';  // Species + Facility Filter


    // Bio Asset Table Functions
    const [biologicalAssetList, setBiologicalAssetList] = useState([])
    const [assetHabMismatchList, setAssetHabMismatchList] = useState([])
    const [assetSecMismatchList, setAssetSecMismatchList] = useState([])
    const [speciesName, setSpeciesName] = useState('')
    const [facilityName, setFacilityName] = useState('')

    // READ Populate Biological Asset Table
    useEffect(()=> {
        getAllBioAssets();
    }, [])

    // READ Asset Habitat Alerts
    useEffect(()=> {
        Axios.get(checkBiologicalAssetsHabitatsURL).then((response)=> {
            setAssetHabMismatchList(response.data)
            console.log(response.data)
        })
    }, [])

    // READ Asset Security Alerts
    useEffect(()=> {
        Axios.get(checkBiologicalAssetsSecurityURL).then((response)=> {
        setAssetSecMismatchList(response.data)
        console.log(response.data)
        })
    }, []);

    // READ Changes to Species Table
    useEffect(() => {
        assetFilters();
    }, [speciesName, facilityName]);


    // Handle two filters and let them be used concurrently
    const assetFilters = async () => {
        // If both filters selected, apply return of both selections
        if(speciesName && facilityName) {
            try {
                const response = await Axios.post(filterBioAssetsBySpeciesAndFacilityURL, {speciesName: speciesName, facilityName: facilityName})
                setBiologicalAssetList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (speciesName && facilityName==='') {
            // If just Species selected, return species filter
            try {
                const response = await Axios.post(filterBioAssetsBySpeciesURL, {speciesName: speciesName})
                setBiologicalAssetList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        } else if (speciesName==='' && facilityName) {
            // If just Facilities selected, return facilities filter
            try {
                const response = await Axios.post(filterBioAssetsByFacilityURL, {facilityName: facilityName})
                setBiologicalAssetList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        }
        // If neither filter selected, return everything
        else {
            await getAllBioAssets();
        }
    }

    // DELETE - Deletes target Bio asset and refreshes all 3 tables
    const delBiologicalAsset = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.bioAssetName}?`)) {
                await Axios.delete(deleteBiologicalAssetsURL + delVal.idBiologicalAsset);
                
                const mainViewResponse = await Axios.get(getBiologicalAssetsURL);
                setBiologicalAssetList(mainViewResponse.data);
                console.log(mainViewResponse.data);
        
                const habMismatchResponse = await Axios.get(checkBiologicalAssetsHabitatsURL);
                setAssetHabMismatchList(habMismatchResponse.data);
                console.log(habMismatchResponse.data);
        
                const securityMismatchResponse = await Axios.get(checkBiologicalAssetsSecurityURL);
                setAssetSecMismatchList(securityMismatchResponse.data);
                console.log(securityMismatchResponse.data);

                deleteButtonSound.play();
                alert(`${delVal.bioAssetName} has been removed from the database.`);
            }} catch (error) {
                console.error('Error deleting biological asset.', error);
                alert('MYSQL Server Error: ' + error.response.data);
            }
    };
    
    // Fully Populate the Bio Asset List (without filters)
    const getAllBioAssets = async ()=> {
        try {
            const response = await Axios.get(getBiologicalAssetsURL)
            setBiologicalAssetList(response.data)
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
        oldName: updateVal.bioAssetName,
        oldSpecies: updateVal.speciesName,
        oldFacility: updateVal.facilityName,
        oldThreatLevel: updateVal.threatLevel,
        id: updateVal.idBiologicalAsset
    };
        navTo("/BiologicalAssetsUpdate", {state});
    }

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

    // Render Webpage
    return (
        <>
            <h2>Biological Assets</h2>
            <article>
                <h3>Add New Biological Asset</h3>
                <p>
                    In addition to being a way of identifying a unique creature managed by a given park, Biological Assets entities
                    also allow a many-to-many relationship between Species and Facilities, so that many different species can be affiliated
                    with multiple facilities (via the different species of assets that may be assigned to a given facility).
                </p>
                <p>
                    Deleting a Facility or Species is <strong>restricted</strong> as long as they are referenced by a Biological Asset.
                    Updates to any affiliated parent entities will cascade. As such, it is not possible to sever a link between Species and
                    Facilities by deleting a Biological Asset.
                </p>
                <p>
                    Click the "Create" button below to add a new Biological Asset to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/BiologicalAssetsAdd")}>Create</button></p>
                </div>
            </article>
            <article>
                <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Tasks Assigned.
                    If you <strong>delete</strong> a Biological Asset, their record in any Task Assignment will be set to <strong>null</strong>.
                </p>
                <p>
                    You may edit or delete a Biological Asset entry in any of the tables that may appear on this page. 
                    In addition to the View Biological Assets table, tables for
                    habitat and security misalignments will appear if any issues are detected.
                </p>

                {/* Lightbox example code used from: Creating a Simple Lightbox From Scratch in React by Alexandra Radevich
                URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                Accessed 5/22/2023. Modified with alt text value and custom display class.*/}
                { lightboxDisplay ?
                <div id="lightbox"onClick={hideLightBox} className="lightbox">
                    <img id="lightbox-img" src={imageToShow} alt={imageToShow} className="lightbox-image"></img>
                </div>
                : '' }

            </article>
            {/* Conditionally render article/table ONLY if a security mismatch is detected */}
            {Object.keys(assetSecMismatchList).length ?
                <article>
                    <h3>Security Risks</h3>
                    <p>
                        The table below shows detected security risks where an asset's current threat level is greater than its current facility's security rating.
                    </p>
                    <div className="scrollableTable">
                        <table>
                            <tbody>
                            <tr>
                                <th>Edit</th>
                                <th>Species Photo</th>
                                <th>Asset</th>
                                <th>Species</th>
                                <th>Facility</th>
                                <th>Facility Security</th>
                                <th>Asset Threat</th>
                                <th>Severity</th>
                                
                            </tr>
                            {assetSecMismatchList.map((val, index)=> {
                                const altText = val.speciesPhoto ? val.speciesPhoto.substring(14, val.speciesPhoto.indexOf('.')) : "Default";
                                return (
                                    <tr key={index}>
                                        <td className="buttonHolder">
                                            <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                            <div><button className="tableButton" onClick={()=> {delBiologicalAsset(val)}}>*</button></div>
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
                                        <td className="tableDescription">
                                            <div>#{val.idBiologicalAsset}</div>
                                            <div><strong>{val.bioAssetName}</strong></div>
                                        </td>
                                        <td>{val.speciesName}</td>
                                        <td>{val.facilityName}</td>
                                        <td>{val.securityRating}</td>
                                        <td>{val.threatLevel}</td>
                                        <td>{val.severity}</td>
                                    </tr>
                                )}
                            )}
                            </tbody>
                        </table>
                    </div>
                </article>
            : null}
            {/* End of conditional security mismatch section */}
            {/* Conditionally render article/table ONLY if a habitat mismatch is detected */}
            {Object.keys(assetHabMismatchList).length ? 
                <article>
                    <h3>Habitat Misalignment</h3>
                    <p>
                        The following table summarizes any known mismatch between the habitat that a specific Biological Asset needs, and the
                        habitat found in its current enclosure facility.
                    </p>
                    <div className="scrollableTable">
                        <table>
                            <tbody>
                            <tr>
                                <th>Edit</th>
                                <th>Species Photo</th>
                                <th>Asset</th>
                                <th>Species</th>
                                <th>Facility</th>
                                <th>Habitat Misalignment</th>
                            </tr>
                            {assetHabMismatchList.map((val, index)=> {
                                const filteredHab = val.currentHabitat ? val.currentHabitat : "WARNING: NOT AN ENCLOSURE";
                                const altText = val.speciesPhoto ? val.speciesPhoto.substring(14, val.speciesPhoto.indexOf('.')) : "Default";
                                return (
                                    <tr key={index}>
                                        <td className="buttonHolder">
                                            <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                            <div><button className="tableButton" onClick={()=> {delBiologicalAsset(val)}}>*</button></div>
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
                                        <td className="tableDescription">
                                            <div>#{val.idBiologicalAsset}</div>
                                            <div><strong>{val.bioAssetName}</strong></div>
                                        </td>
                                        <td>{val.speciesName}</td>
                                        <td>{val.facilityName}</td>
                                        <td className="tableDescription">
                                            <ul>
                                                <li>Current: {filteredHab}</li>
                                                <li>Needs: {val.needsHabitat}</li>
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                            )}
                            </tbody>
                        </table>
                    </div>
                </article>
            : null}
            {/* End of conditional security mismatch section */}
            <article>
                <h3>View Biological Assets</h3>
                <p>
                    The table below shows existing information for Biological Assets entities and includes
                    buttons to update or delete them.
                </p>
                <p>
                    You can use the Species or Facility selectors below to concurrently filter the table.
                    Select "None" for either filter to remove it.
                </p>
                <div>
                    <div className="selectorP"><SelectorSpecies hostURL={hostURL} setSpeciesName={setSpeciesName} speciesName={speciesName} isRequired={false}/></div>
                    <div className="selectorP"><SelectorFacilities hostURL={hostURL} setFacilityName={setFacilityName} facilityName={facilityName} isRequired={false}/></div>
                </div>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th className="buttonHolder">Edit</th>
                            <th>Species Photo</th>
                            <th>Asset</th>
                            <th>Species</th>
                            <th>Home Facility</th>
                        </tr>
                        {biologicalAssetList.map((val, index)=> {
                            const altText = val.speciesPhoto ? val.speciesPhoto.substring(14, val.speciesPhoto.indexOf('.')) : "Default";
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delBiologicalAsset(val)}}>*</button></div>
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
                                    <td className="tableDescription">
                                        <div>#{val.idBiologicalAsset}</div>
                                        <div><strong>{val.bioAssetName}</strong></div>
                                    </td>
                                    <td>
                                        <div><strong>{val.speciesName}</strong></div>
                                        <div>{val.dietName}</div>
                                    </td>
                                    <td>{val.facilityName}</td>
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

export default BiologicalAssetsPage;