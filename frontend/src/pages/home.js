import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import './App.css';
import Axios from 'axios';

function dinoHome() {
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
                <p>
                    Additional specialized, common reports may be generated from this page in the future.
                </p>
            </article>
            <article>
                <h3>Financial Reports</h3>
                {/* <!-- These tables will be populated by SQL queries --> */}
                <p>
                    The summary tables below provide high-level overviews of current costs associated with aspects of
                    managing our system of parks and zoological attractions.
                </p>
                <h4>Cost Summary by Sector</h4>
                <div class="scrollableTable">
                    <table>
                        <tr>
                            <th>Sector</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>Administration</td>
                            <td>$200,000.00</td>
                        </tr>
                        <tr>
                            <td>Maintenance</td>
                            <td>$1,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Medical</td>
                            <td>$100,000.00</td>
                        </tr>
                        <tr>
                            <td>Research</td>
                            <td>$3,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Security</td>
                            <td>$2,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Veterinary</td>
                            <td>$1,500,000.00</td>
                        </tr>
                    </table>
                </div>
                <h4>Cost Summary by Park</h4>
                <div class="scrollableTable">
                    <table>
                        <tr>
                            <th>Park</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>Jurassic Park</td>
                            <td>$40,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Jurassic Park: San Diego</td>
                            <td>$200,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Jurassic World</td>
                            <td>$1,000,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Lockwood Manor Research Facility</td>
                            <td>$100,000,000.00</td>
                        </tr>
                        <tr>
                            <td>Site B</td>
                            <td>$50,000,000.00</td>
                        </tr>
                    </table>
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

export default dinoHome;