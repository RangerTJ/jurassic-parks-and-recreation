// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorSpecies from "../components/selectorSpecies";
import defaultImg from '../images/tableDefaultPreview.png';


// HostURL Passed from App.js
function BiologicalAssetsPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // BiologicalAssets SQL Endpoints
    const getBiologicalAssetsURL = hostURL + '/api/getBiologicalAssets';  // TO DO - CREATE USE EFFECT AND USE STATE
    const deleteBiologicalAssetsURL = hostURL + '/api/deleteBiologicalAssets/';  // TO DO - NEED TO ADD USE STATES AND CRUD FUNCTIONS FOR THIS; INSERT/UPDATE GO ON RESPECTIVE FORM PAGES
    const checkBiologicalAssetsHabitatsURL = hostURL + '/api/checkBiologicalAssetsHabitats';  // Habitat report for welcome screen
    const checkBiologicalAssetsSecurityURL = hostURL + '/api/checkBiologicalAssetsSecurity';  // Security report for welcome screen
    const filterBioAssetsBySpeciesURL = hostURL + '/api/filterBioAssetsBySpecies';  // Security report for welcome screen


    // Bio Asset Table Functions
    const [biologicalAssetList, setBiologicalAssetList] = useState([])
    const [assetHabMismatchList, setAssetHabMismatchList] = useState([])
    const [assetSecMismatchList, setAssetSecMismatchList] = useState([])
    const [species, setSpecies] = useState('')

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
        speciesFilter();
    }, [species]);


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
        
                alert(`${delVal.bioAssetName} has been removed from the database.`);
            }} catch (error) {
                console.error('Error deleting biological asset.', error);
                alert('MYSQL Server Error: ' + error.response.data);
            }
    };

    // READ Apply Species Filter to Bio Asset Table
    const speciesFilter = async () => {
        if(species === "") {
            await getAllBioAssets();
        }
        else {
            try {
                const response = await Axios.post(filterBioAssetsBySpeciesURL, {speciesName : species })
                setBiologicalAssetList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        }
    }
    
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
                    it from the database, respectively.
                </p>
                {/* Lightbox example code used from: Creating a Simple Lightbox From Scratch in React by Alexandra Radevich
                URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                Accessed 5/22/2023. Modified with alt text value and custom display class.*/}
                { lightboxDisplay ?
                <div id="lightbox"onClick={hideLightBox} className="lightbox">
                    <img id="lightbox-img" src={imageToShow} atl={imageToShow} className="lightbox-image"></img>
                </div>
                : '' }
            </article>
            <article>
                <h3>Security Risks</h3>
                <p>
                    The table below shows detected security risks where an asset's current threat level is greater than its current facility's security rating.
                    These risks should be mitigated as soon as possible by transferring an at-risk asset to an appropriate enclosure at the soonest opportunity. 
                    Both facility security and threat potential of an asset are rated on a scale of 1-10. If a facility security is equal to an asset threat level, 
                    that means that the asset is fully contained with a 99.9% confidence index that the asset cannot escape or harm guests/staff. 
                    The severity deferential between an asset and its current containment strength is rated on a scale of 1-9. More severe security misalignment 
                    should be heavily prioritized over less severe misalignments. For example, a severity of 1 implies that under worst-case conditions, an asset could 
                    escape containment. A severity of 9 indicates that the asset could break out of containment at any time, and that they are incredibly likely to do so.
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
                        {/* NEED TO UPDATE QUERY TO GET ID TO - SO UPDATE POPULATES RIGHT */}
                        {assetSecMismatchList.map((val, index)=> {
                            const altText = val.speciesPhoto ? val.speciesPhoto.substring(14, val.speciesPhoto.indexOf('.')) : "Default";
                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delBiologicalAsset(val.idBiologicalAsset)}}>*</button></div>
                                    </td>
                                    <td>
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                        {val.speciesPhoto ?
                                        <img src={val.speciesPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.speciesPhoto)}/>
                                        :
                                        <img src={defaultImg} alt="Default Image" width={160} height={90} />
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
            <article>
                <h3>Habitat Misalignment</h3>
                <p>
                    The following table summarizes any known mismatch between the habitat that a specific Biological Asset needs, and the
                    habitat found in its current enclosure facility. Once a misalignment has been resolved by moving an asset to an appropriate
                    facility, the "update" button next to the BiologicalAsset record can be used to update the database. These misalignments should
                    be resolved as soon as possible to minimize stress on assets (and thus trickle-down impacts like behavioral issues and escape attempts).
                    While not as critical as a security mismatch, it is still important that assets are assigned to appropriate habitats to ensure that they
                    are happy and healthy.
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
                                        <div><button className="tableButton" onClick={()=> {delBiologicalAsset(val.idBiologicalAsset)}}>*</button></div>
                                    </td>
                                    <td>
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                        {val.speciesPhoto ?
                                        <img src={val.speciesPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.speciesPhoto)}/>
                                        :
                                        <img src={defaultImg} alt="Default Image" width={160} height={90} />
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
            <article>
                <h3>View Biological Assets</h3>
                <p>
                    The table below shows existing information for Biological Assets entities and includes
                    buttons to update or delete them. You can use the species selector below to filter for
                    a specific species. Select "None" to remove the species filter and view the entire 
                    database of biological assets. 
                </p>
                <div className="selectorP">
                    <SelectorSpecies hostURL={hostURL} setSpecies={setSpecies} species={species} isRequired={false}/>
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
                                    <td>
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                        {val.speciesPhoto ?
                                        <img src={val.speciesPhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.speciesPhoto)}/>
                                        :
                                        <img src={defaultImg} alt="Default Image" width={160} height={90} />
                                        }
                                    </td>
                                    <td className="tableDescription">
                                        <div>#{val.idBiologicalAsset}</div>
                                        <div><strong>{val.bioAssetName}</strong></div>
                                    </td>
                                    <td>{val.speciesName}</td>
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