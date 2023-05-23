// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SelectorSpecies from "../components/selectorSpecies";


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

    // DELETE - Deletes target bio asset and refreshes all 3 tables
    const delBiologicalAsset = (delID) => {
        if (window.confirm(`Are you sure you want to remove Asset #${delID}?`)) {
        Axios.delete(deleteBiologicalAssetsURL + delID)
        .then(() => {Axios.get(getBiologicalAssetsURL)
        .then((response) => {setBiologicalAssetList(response.data);
            console.log(response.data)})
        .then(() => {Axios.get(checkBiologicalAssetsHabitatsURL)
        .then((response) => {setAssetHabMismatchList(response.data);
            console.log(response.data)})
        .then(() => {Axios.get(checkBiologicalAssetsSecurityURL)
        .then((response) => {setAssetSecMismatchList(response.data);
            console.log(response.data)})
        .then(alert(`Biological Asset #${delID} has been removed from the database.`)
            );
          });
        });
      });
     }; 
    };
    // Lol at all the parenthesis. No idea how to clean that up or make it look consistent. Just stack 'em?

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
                console.error('Error!', error);
            }
        }
    }

    // Fully Populate the Bio Asset List (without filters)
    const getAllBioAssets = async ()=> {
        try {
            const response = await Axios.get(getBiologicalAssetsURL)
            setBiologicalAssetList(response.data)
        } catch (error) {
            console.error('Error!', error);
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
                <p>
                    Click the T-Rex fossil button (* in some browsers) in the corresponding row to "fix" (update) the corresponding Biological Asset record, 
                    once the placement issue is resolved.
                </p>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Facility</th>
                            <th>Facility Security</th>
                            <th>Asset Threat</th>
                            <th>Severity</th>
                            <th>Fix</th> 
                        </tr>
                        {/* NEED TO UPDATE QUERY TO GET ID TO - SO UPDATE POPULATES RIGHT */}
                        {assetSecMismatchList.map((val, index)=> {
                            return (
                                <tr key={index}>
                                    <td>{val.idBiologicalAsset}</td>
                                    <td>{val.bioAssetName}</td>
                                    <td>{val.speciesName}</td>
                                    <td>{val.facilityName}</td>
                                    <td>{val.securityRating}</td>
                                    <td>{val.threatLevel}</td>
                                    <td>{val.severity}</td>
                                    <td><button onClick={()=> {navToUpdate(val)}}>*</button></td>
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
                <p>
                    Click the T-Rex fossil button (* in some browsers) in the corresponding row to "fix" (update) the corresponding Biological Asset record, 
                    once the placement issue is resolved.
                </p>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Facility</th>
                            <th>Current Habitat</th>
                            <th>Needed Habitat</th>
                            <th>Fix</th>
                        </tr>
                        {/* NEED TO UPDATE QUERY TO GET ID TO - SO UPDATE POPULATES RIGHT */}
                        {assetHabMismatchList.map((val, index)=> {
                            const filteredHab = val.currentHabitat ? val.currentHabitat : "WARNING: NOT AN ENCLOSURE";
                            return (
                                <tr key={index}>
                                    <td>{val.idBiologicalAsset}</td>
                                    <td>{val.bioAssetName}</td>
                                    <td>{val.speciesName}</td>
                                    <td>{val.facilityName}</td>
                                    <td>{filteredHab}</td>
                                    <td>{val.needsHabitat}</td>
                                    <td><button onClick={()=> {navToUpdate(val)}}>*</button></td>
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
                    a specific species, then hit "Apply" for the filter to take effect. Select "None" and
                    apply it to remove the species filter and view the entire database of biological assets. 
                </p>
                <div className="selectorP">
                    <SelectorSpecies hostURL={hostURL} setSpecies={setSpecies} species={species} isRequired={false}/> <button onClick={speciesFilter}>Apply</button>
                </div>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Home Facility</th>

                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {biologicalAssetList.map((val, index)=> {
                            return (
                                <tr key={index}>
                                    <td>{val.idBiologicalAsset}</td>
                                    <td>{val.bioAssetName}</td>
                                    <td>{val.speciesName}</td>
                                    <td>{val.facilityName}</td>
                                    <td><button onClick={()=> {navToUpdate(val)}}>Update</button></td>
                                    <td><button onClick={()=> {delBiologicalAsset(val.idBiologicalAsset)}}>Delete</button></td>
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