// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


// HostURL Passed from App.js
function JobClassificationsPage ({hostURL, deleteButtonSound}) {

   // Navigation Function
   const navTo = useNavigate();

   //// JobClassifications SQL Endpoints
   const getJobClassificationsURL = hostURL + '/api/getJobClassifications';
   const deleteJobClassificationsURL = hostURL + '/api/deleteJobClassifications/';

   // Job Table States
   const [jobClassificationsList, setJobClassificationsList] = useState([])

   // READ Populate Table on load
   useEffect(()=> {
       getJobClassifications();
   }, [])

   // DELETE - Deletes target
   const delJobClassifications = async (delVal) => {
       try {
           if (window.confirm(`Are you sure you want to delete ${delVal.jobTitle}?`)) {
               await Axios.delete(deleteJobClassificationsURL + delVal.idJobClassification);
               
               const mainViewResponse = await Axios.get(getJobClassificationsURL);
               setJobClassificationsList(mainViewResponse.data);
               console.log(mainViewResponse.data);

               deleteButtonSound.play();
               alert(`${delVal.jobTitle} has been removed from the database.`);
           }} catch (error) {
               console.error('Error deleting Job.', error);
               alert('MYSQL Server Error: ' + error.response.data);
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
   // Link Accessed/Verified on 6/1/2023
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
           <h2>Job Classifications</h2>
           <article>
               <h3>Add New Job Classification</h3>
               <p>
                    Click the "Create" button below to add a new Job Classification to the DINO database.
               </p>
               <div>
                   <p><button onClick={() => navTo("/JobClassificationsAdd")}>Create</button></p>
               </div>
           </article>
           <article>
               <h3>Edit and Delete</h3>
               <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Employees.
                    You are <strong>restricted</strong> from <strong>deleting</strong> a Job Classification, if it has been assigned to an Employee.
                </p>
           </article>
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
                           <th>Job</th>
                           <th>Description</th>
                       </tr>
                       {jobClassificationsList.map((val, index)=> {
                           return (
                               <tr key={index}>
                                   <td className="buttonHolder">
                                       <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                       <div><button className="tableButton" onClick={()=> {delJobClassifications(val)}}>*</button></div>
                                   </td>
                                   <td className="tableDescription">
                                       <div>#{val.idJobClassification}</div>
                                       <div><strong>{val.jobTitle}</strong></div>
                                   </td>
                                   <td className="tableDescription">{val.jobDescription}</td>
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