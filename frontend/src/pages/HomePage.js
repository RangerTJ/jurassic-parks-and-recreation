// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import Axios from 'axios';
import securityCamera1 from '../images/cameraCompressed.mp4'

// HostURL Passed from App.js
function HomePage({hostURL}) {

    // Index Table SQL Endpoints
    const getParkCostURL = hostURL + '/api/getParkCost';
    const getCategoryCostURL = hostURL + '/api/getCategoryCost';
    const getEmployeeCostURL = hostURL + '/api/getEmployeeCost';
    const getTaskCostURL = hostURL + '/api/getTaskCost';
    const getFacilityCostURL = hostURL + '/api/getFacilityCost';
    const getBioAssetCostURL = hostURL + '/api/getBioAssetCost';

    // Index Table Functions
    const [parkCostList, setParkCostList] = useState([])
    const [categoryCostList, setCategoryCostList] = useState([])
    const [employeeCostList, setEmployeeCostList] = useState([])
    const [taskCostList, setTaskCostList] = useState([])
    const [facilityCostList, setFacilityCostList] = useState([])
    const [bioAssetCostList, setBioAssetCostList] = useState([])

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

    // READ Employee Costs Table
    useEffect(()=> {
        Axios.get(getEmployeeCostURL).then((response)=> {
        setEmployeeCostList(response.data)
        console.log(response.data)
        })
    }, []);

    // READ Task Costs Table
    useEffect(()=> {
        Axios.get(getTaskCostURL).then((response)=> {
        setTaskCostList(response.data)
        console.log(response.data)
        })
    }, []);

    // READ Facility Costs Table
    useEffect(()=> {
        Axios.get(getFacilityCostURL).then((response)=> {
        setFacilityCostList(response.data)
        console.log(response.data)
        })
    }, []);

    // READ BioAsset Costs Table
    useEffect(()=> {
        Axios.get(getBioAssetCostURL).then((response)=> {
        setBioAssetCostList(response.data)
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
                    delete a specific entry. At any point you may click the red (with gold border) '<strong>^</strong>' icon on bottom right side of the screen to 
                    scroll to the top of the current page.
                </p>
            </article>
            {/* Simulated security camera made following 'Replace animated GIFs with video for faster page loads' by Houssein Djirdeh 
            and adapting it for React syntax. Footage recorded in-game footage from Jurassic World Evolution 2
            URL: https://web.dev/replace-gifs-with-videos/ 
            Link Accessed/Verified on 6/1/2023*/}
            <article>
                <h3>Security Feed</h3>
                <div>
                    <video autoPlay loop muted title="Security Camera Feed">
                        <source src={securityCamera1} type="video/mp4"></source>
                    </video>
                </div>
            </article>
            <article>
                <h3>Financial Reports</h3>
                <p>
                    The summary tables below provide high-level overviews of current costs associated with aspects of
                    managing our system of parks and zoological attractions. Note that for the 'Top 10' style tables below, if there
                    are fewer than 10 related entities with EmployeeTasks relating to them, the tables will
                    have fewer than 10 elements displayed. Note, the tables are independent, so there's overlap in the cost reported between tables.
                    'Most Expensive Employees' refers to costs-affiliated the employee was involved in, not necessarily their overhead cost
                    (since things like supplies, etc. are factored into the Employee Task Report's cost figure).
                </p>
                <h4 className="st-header">Cost Summary by Sector</h4>
                <div className="scrollableST">
                    <div className="st-holder">
                        <table>
                            <tbody>
                            <tr>
                                <th>Rank</th>
                                <th>Sector</th>
                                <th>Cost</th>
                            </tr>
                            {categoryCostList.map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdCategoryCost = val.taskTypeCost ? val.taskTypeCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                const rank = index + 1
                                return (
                                    <tr key={index}>
                                        <td>{rank}</td>
                                        <td className="st-left">{val.categoryName}</td>
                                        <td className="st-left">{usdCategoryCost}</td>
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
                                <th>Rank</th>
                                <th>Park</th>
                                <th>Cost</th>
                            </tr>
                            {parkCostList.map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdParkCost = val.parkCost ? val.parkCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                const rank = index + 1
                                return (
                                    <tr key={index}>
                                        <td>{rank}</td>
                                        <td className="st-left">{val.parkName}</td>
                                        <td className="st-left">{usdParkCost}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4 className="st-header">Top 10 Highest Impact Employees</h4>
                <div className="scrollableST">
                    <div className="st-holder">
                        <table>
                            <tbody>
                            <tr >
                                <th>Rank</th>
                                <th>Employee</th>
                                <th>Associated Costs</th>
                            </tr>
                            {employeeCostList.slice(0, 10).map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdEmployeeCost = val.employeeCost ? val.employeeCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                const rank = index + 1
                                return (
                                    <tr key={index}>
                                        <td>{rank}</td>
                                        <td className="st-left">{val.lastName}, {val.firstName}</td>
                                        <td className="st-left">{usdEmployeeCost}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4 className="st-header">Top 10 Most Expensive Tasks</h4>
                <div className="scrollableST">
                    <div className="st-holder">
                        <table>
                            <tbody>
                            <tr >
                                <th>Rank</th>
                                <th>Task</th>
                                <th>Cost</th>
                            </tr>
                            {taskCostList.slice(0, 10).map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdTaskCost = val.taskCost ? val.taskCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                const rank = index + 1
                                return (
                                    <tr key={index}>
                                        <td>{rank}</td>
                                        <td className="st-left">{val.taskName}</td>
                                        <td className="st-left">{usdTaskCost}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4 className="st-header">Top 10 Most Expensive Facilities</h4>
                <div className="scrollableST">
                    <div className="st-holder">
                        <table>
                            <tbody>
                            <tr >
                                <th>Rank</th>
                                <th>Facility</th>
                                <th>Park</th>
                                <th>Cost</th>
                            </tr>
                            {facilityCostList.slice(0, 10).map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdFacilityCost = val.facilityCost ? val.facilityCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                const rank = index + 1
                                return (
                                    <tr key={index}>
                                        <td>{rank}</td>
                                        <td className="st-left">{val.facilityName}</td>
                                        <td className="st-left">{val.parkName}</td>
                                        <td className="st-left">{usdFacilityCost}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <h4 className="st-header">Top 10 Most Expensive Biological Assets</h4>
                <div className="scrollableST">
                    <div className="st-holder">
                        <table>
                            <tbody>
                            <tr >
                                <th>Rank</th>
                                <th>Asset</th>
                                <th>Species</th>
                                <th>Park</th>
                                <th>Cost</th>
                            </tr>
                            {bioAssetCostList.slice(0, 10).map((val, index)=> {
                                // Convert cost to USD or set to 0 USD if there is a null entry
                                const usdBioAssetCost = val.assetCost ? val.assetCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                                const rank = index + 1
                                return (
                                    <tr key={index}>
                                        <td>{rank}</td>
                                        <td className="st-left">{val.bioAssetName}</td>
                                        <td className="st-left">{val.speciesName}</td>
                                        <td className="st-left">{val.parkName}</td>
                                        <td className="st-left">{usdBioAssetCost}</td>
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
            </>
    )
};

export default HomePage;