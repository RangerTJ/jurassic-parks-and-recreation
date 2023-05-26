// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function JobClassificationsPage ({hostURL}) {

   // Navigation Function
   const navTo = useNavigate();

   //// JobClassifications SQL Endpoints
   const getJobClassificationsURL = hostURL + '/api/getJobClassifications';
   const createJobClassificationsURL = hostURL + '/api/insertJobClassifications';
   const updateJobClassificationsURL = hostURL + '/api/updateJobClassifications';
   const deleteJobClassificationsURL = hostURL + '/api/deleteJobClassifications/';

   // Bio Asset Table Functions
   const [jobClassificationsList, setJobClassificationsList] = useState([])
   const [jobClassification, setJobClassification] = useState('')

   // READ Populate Table on load
   useEffect(()=> {
       getJobClassifications();
   }, [])


   // ** Delete the manual refresh later and see if using the use-effect when parksList is modified works instead - was spam refreshing on just a load? **
   // DELETE - Deletes target
   const delJobClassifications = async (delID) => {
       try {
           if (window.confirm(`Are you sure you want to Job Classification #${delID}?`)) {
               await Axios.delete(deleteJobClassificationsURL + delID);
               
               const mainViewResponse = await Axios.get(getJobClassificationsURL);
               setJobClassificationsList(mainViewResponse.data);
               console.log(mainViewResponse.data);
       
               alert(`Job Classification #${delID} has been removed from the database.`);
           }} catch (error) {
               console.error('Error deleting Park.', error);
       }
   };

   // Get table info
   const getJobClassifications = async ()=> {
       try {
           const response = await Axios.get(getJobClassificationsURL)
           setJobClassificationsList(response.data)
       } catch (error) {
           console.error('Error populating the view table.', error);
       }
   }

   // UPDATE Primer: Passes an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
   // Follows general strategy suggested by stackoverflow user Abdulazeez Jimoh on 10/25/2022
   // URL: https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
   const navToUpdate = (updateVal) => {
       const state = {
       oldJobTitle: updateVal.jobTitle,
       oldJobDescription: updateVal.jobDescription,
       id: updateVal.idJobClassification
   };
       navTo("/JobClassificationsUpdate", {state});
   }

   // Render Webpage
   return (
       <>  
           {/* End experimental copy/paste */}
           <h2>Job Classifications</h2>
           <article>
               <h3>Add New Job Classification</h3>
               <p>
                    Click the "Create" button below to add a new Job Classification to the DINO database.
               </p>
               <div>
                   <p><button onClick={() => navTo("/JobClassificationAdd")}>Create</button></p>
               </div>
           </article>
           <article>
               <h3>Edit and Delete</h3>
               <p>
                   To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                   buttons on the left side of the asset's corresponding column to enter the edit menu or delete
                   it from the database, respectively.
               </p>
           </article>
           {/* Could potentially reuse the bio assets species filter for job titles here or do a last name search or something */}
           <article>
               <h3>View Job Classifications</h3>
               <p>
                   The table below shows existing information for Job Classification entities and includes
                   buttons to update or delete them.
               </p>
               <div className="scrollableTable">
                   <table>
                       <tbody>
                       <tr>
                           <th>Edit</th>
                           <th>Job Title</th>
                           <th>Description</th>
                       </tr>
                       {jobClassificationsList.map((val, index)=> {
                           return (
                               <tr key={index}>
                                   <td>
                                       <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>

                                       {/* ** Edit later tonight - pass whole object to delete for better errors messages ** */}
                                       <div><button className="tableButton" onClick={()=> {delJobClassifications(val.idJobClassification)}}>*</button></div>
                                   </td>
                                   <td className="tableDescription">
                                       <div>Job Code #{val.idJobClassification}</div>
                                       <div><strong>{val.jobTitle}</strong></div>
                                   </td>
                                   <td className="tableDescription">{val.jobDescription}</td>
                                   <td>{val.parkLocation}</td>
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

export default JobClassificationsPage;