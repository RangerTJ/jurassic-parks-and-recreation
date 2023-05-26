// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';
import securityCamera1 from '../images/cameraCompressed.mp4'

// HostURL Passed from App.js
function HomePage({hostURL}) {

    // Index Table SQL Endpoints
    const getParkCostURL = hostURL + '/api/getParkCost';
    const getCategoryCostURL = hostURL + '/api/getCategoryCost';

    // Index Table Functions
    // CRUD operations modeled off tutorial - CITE IN DETAIL LATER (or top of each page?)
    const [parkCostList, setParkCostList] = useState([])
    const [categoryCostList, setCategoryCostList] = useState([])

    // READ Park Costs Table
    useEffect(()=> {
    Axios.get(getParkCostURL).then((response)=> {
        setParkCostList(response.data)
        console.log(response.data)
        })
    }, [])

    // READ Category Costs Table
    useEffect(()=> {
        Axios.get(getCategoryCostURL).then((response)=> {
        setCategoryCostList(response.data)
        console.log(response.data)
        })
    }, []);

    // Render the Home Page
    return(
        <>
        <h2>Home</h2>
            <article>
                <h3>Welcome to DINO!</h3>
                <p>
                    The Digital Information Nexus for Operations (DINO) was designed by Jurassic Parks and Recreation to 
                    assist with managing the complex data involved with operating a network of world-class, prehistoric, 
                    zoological attractions!
                </p>
                <p>
                    To use this database, use the navigational bar above to navigate to the respective entity that you are interested in.
                    All pages display the existing data and have menu options to add new entries, update a specified, existing entry, and 
                    delete a specific entry.
                </p>
            </article>

            <article>
                <h3>Financial Reports</h3>
                <p>
                    The summary tables below provide high-level overviews of current costs associated with aspects of
                    managing our system of parks and zoological attractions.
                </p>
                <h4 className="st-header">Cost Summary by Sector</h4>
                <div className="scrollableST">
                    <div className="st-holder">
                        <table className="summary-table">
                            <tbody>
                            <tr >
                                <th>Sector</th>
                                <th>Cost</th>
                            </tr>
                            {categoryCostList.map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdCategoryCost = val.taskTypeCost ? val.taskTypeCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                return (
                                    <tr key={index} className="st-left">
                                        <td>{val.categoryName}</td>
                                        <td>{usdCategoryCost}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4 className="st-header">Cost Summary by Park</h4>
                <div className="scrollableST">
                    <div className="st-holder">
                        <table>
                            <tbody>
                            <tr >
                                <th>Park</th>
                                <th>Cost</th>
                            </tr>
                            {parkCostList.map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdParkCost = val.parkCost ? val.parkCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                return (
                                    <tr key={index}>
                                        <td className="st-left">{val.parkName}</td>
                                        <td className="st-left">{usdParkCost}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>
            <article>
                <h3>Overview</h3>
                <p>
                    Jurassic Parks &amp; Recreation (JP&R) oversees the technological backend operations of several dinosaur-related theme parks and zoological preserves. Managed parks range from undeveloped islands for biological asset staging (closed to the public) to full-fledged zoological theme parks that can see upwards of 1 million distinct visitors annually (2000-3000 people per day, on average). At a given moment, each park site will have zero to thousands of employees, depending on the scope of operational needs at a given location. 
                </p>
                <p>
                    The largest sites have hundreds of distinct biological assets (primarily dinosaurs, prehistoric marine reptiles, and pterosaurs) of dozens of species with their own management needs. They range from the chicken-sized scavenging Compsognathus to diverse, colossal megafauna like the aquatic Mosasaurus, towering Brachiosaurus, and fearsome Tyrannosaurus Rex. To accommodate the variety of wildlife, operational needs, and visitor needs, park facilities range from simple fenced enclosures to visitor centers, stores, offices, specialized habitat enclosures for specific species, and more. While an undeveloped park may initially have no facilities, a full-fledged zoological theme park might have hundreds of diverse facilities within it. Note that for task-assignment purposes, a ‘facility’ might also simply be an identified (but undeveloped) plot of land within a park. While the vast majority will be physical structures, a patch of land can also be considered a facility (albeit one with limited features).
                </p>
                <p>
                    DINO is focused on empowering park managers to maintain efficient, safe, and secure operations. The three core components to understanding site operations are facilities, employees, and the live assets under a park’s care. DINO provides a tool to comprehensively understand facility status, asset placement, and which employees are involved in working on a given task to support park operations. It contains records of all employees, facilities, and live assets currently within a park and documents relationships between them.
                </p>
                <p>
                    This empowers managers to quickly and easily perform tasks, like assigning a new dinosaur to an appropriate habitat based on its own habitat and diet needs and those of available enclosure facilities. As another example, a park manager could quickly and easily discern whether or not a certain biological asset is secure enough in its current enclosure.
                </p>
            </article>

            {/* Simulated security camera made following 'Replace animated GIFs with video for faster page loads' by Houssein Djirdeh 
            and adapting it for React syntax. Footage recorded in-game footage from Jurassic World Evolution 2
            URL: https://web.dev/replace-gifs-with-videos/ */}
            <article>
                <h2>Security Feed</h2>
                <div>
                    <video autoPlay loop muted>
                        <source src={securityCamera1} type="video/mp4"></source>
                    </video>
                </div>
            </article>
            </>
    )
};

export default HomePage;