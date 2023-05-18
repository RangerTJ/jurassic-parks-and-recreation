// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function BiologicalAssetsPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // BiologicalAssets SQL Endpoints
    const getBiologicalAssetsURL = hostURL + '/api/getBiologicalAssets';  // TO DO - CREATE USE EFFECT AND USE STATE
    const deleteBiologicalAssetsURL = hostURL + '/api/deleteBiologicalAssets/';  // TO DO - NEED TO ADD USE STATES AND CRUD FUNCTIONS FOR THIS; INSERT/UPDATE GO ON RESPECTIVE FORM PAGES
    const checkBiologicalAssetsHabitatsURL = hostURL + '/api/checkBiologicalAssetsHabitats';  // Habitat report for welcome screen
    const checkBiologicalAssetsSecurityURL = hostURL + '/api/checkBiologicalAssetsSecurity';  // Security report for welcome screen


    // Bio Asset Table Functions
    // CRUD operations modeled off tutorial - CITE IN DETAIL LATER (or top of each page?)
    const [biologicalAssetList, setbiologicalAssetList] = useState([])
    const [assetHabMismatchList, setAssetHabMismatchList] = useState([])
    const [assetSecMismatchList, setAssetSecMismatchList] = useState([])

    // READ Populate Biological Asset Table
    useEffect(()=> {
        Axios.get(getBiologicalAssetsURL).then((response)=> {
            setbiologicalAssetList(response.data)
            console.log(response.data)
            })
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
    
    // DELETE - Apparently sending a response from server fixed it so it refreshes automatically
    // NEED TO MODIFY TO REFRESH ALL 3x TABLES, ONLY REFRESHES MAIN ALL ASSET TABLE RIGHT NOW
    const delBiologicalAsset = (delID) => {
        Axios.delete(deleteBiologicalAssetsURL + delID)
        .then(() => {Axios.get(getBiologicalAssetsURL)
        .then((response) => {setbiologicalAssetList(response.data);
            console.log(response.data);
            });
        });
    };

    return (
        <>
            <h2>Biological Assets</h2>
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
                <div class="scrollableTable">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Facility</th>
                            <th>Facility Security</th>
                            <th>Asset Threat</th>
                            <th>Severity</th>
                        </tr>
                        {assetSecMismatchList.map((val)=> {
                            return (
                                <tr>
                                    <td>{val.bioAssetName}</td>
                                    <td>{val.speciesName}</td>
                                    <td>{val.facilityName}</td>
                                    <td>{val.securityRating}</td>
                                    <td>{val.threatLevel}</td>
                                    <td>{val.severity}</td>
                                </tr>
                            )
                        })}
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
                <div class="scrollableTable">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Facility</th>
                            <th>Current Habitat</th>
                            <th>Needed Habitat</th>
                        </tr>
                        {assetHabMismatchList.map((val)=> {
                            // Set off the alarm bells for null habitats, because it means fun times in the park
                            // May want to add an update/fix button column to quickly address problems without having to chase them down in the DB list
                            // That or add a search filter to shrink the list
                            const filteredHab = val.currentHabitat ? val.currentHabitat : "WARNING: NOT AN ENCLOSURE";
                            return (
                                <tr>
                                    <td>{val.bioAssetName}</td>
                                    <td>{val.speciesName}</td>
                                    <td>{val.currentWrongHome}</td>
                                    <td>{filteredHab}</td>
                                    <td>{val.needsHabitat}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </article>
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
                <h3>View Biological Assets</h3>
                <p>
                    The table below shows existing information for Biological Assets entities and includes
                    buttons to update or delete them.
                </p>
                <div class="scrollableTable">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Species</th>
                            <th>Name</th>
                            <th>Home Facility</th>

                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {biologicalAssetList.map((val)=> {
                            // May want to add an update/fix button column to quickly address problems without having to chase them down in the DB list
                            // That or add a search filter to shrink the list
                            return (
                                <tr>
                                    <td>{val.idBiologicalAsset}</td>
                                    <td>{val.bioAssetName}</td>
                                    <td>{val.speciesName}</td>
                                    <td>{val.facilityName}</td>
                                    <td><button onClick={() => navTo("/BiologicalAssetsUpdate")}>Update</button></td>
                                    {/* TODO: ADD DELETE FUNCTIONALITY ON CLICK */}
                                    <td><button onClick={()=> {delBiologicalAsset(val.idBiologicalAsset)}}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </article>
        </>
    );
}

export default BiologicalAssetsPage;