// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Front-end CRUD/filter error-handling implementations and the returned HTML layout for the page were entirely hand-crafted by our own team members, unless otherwise noted.

// Basic CRUD operations, React implementation, and HTML value mapping was heavily based on code from the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import defaultImg from '../images/tableDefaultPreview.png';
import SelectorJobClassifications from "../components/selectorJobClassifications";


// HostURL Passed from App.js
function EmployeesPage ({hostURL, deleteButtonSound}) {

    // Safe Delete Sound (error handling to prevent SFX fail from messing up CRUD operation)
    const delSound = () => {
        try {
            deleteButtonSound.play();
        } catch (error) {
            console.error("SFX Error")
        }
    }

    // Navigation Function
    const navTo = useNavigate();

    // Employees SQL Endpoints
    const getEmployeesURL = hostURL + '/api/getEmployees';
    const deleteEmployeesURL = hostURL + '/api/deleteEmployees/';
    const filterEmployeesByJobURL = hostURL + '/api/filterEmployeesByJob/';

    // Employee States
    const [employeesList, setEmployeesList] = useState([])
    const [jobTitle, setJobTitle] = useState('')

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

    // READ Populate Employee Table
    useEffect(()=> {
        getEmployees();
    }, [])

    // READ Changes to Employees Table
    useEffect(() => {
        jobsFilter();
    }, [jobTitle]);

    // READ Apply Jobs Filter to Employees Table
    const jobsFilter = async () => {
        if(jobTitle === "") {
            await getEmployees();
        }
        else {
            try {
                const response = await Axios.post(filterEmployeesByJobURL, {jobTitle : jobTitle})
                setEmployeesList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error applying the filter to the View table.', error);
            }
        }
    }

    // DELETE - Deletes target Employee and refreshes table
    const delEmployee = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.firstName} ${delVal.lastName}?`)) {
                delSound();
                await Axios.delete(deleteEmployeesURL + delVal.idEmployee);
                
                const mainViewResponse = await Axios.get(getEmployeesURL);
                setEmployeesList(mainViewResponse.data);
                console.log(mainViewResponse.data);
                
                alert(`${delVal.firstName} ${delVal.lastName} has been removed from the database.`);
        }} catch (error) {
            console.error('Error deleting employee.', error);
            alert('MYSQL Server Error: ' + error.response.data);
        }
    };

    //Populate Employee List
    const getEmployees = async ()=> {
        try {
            const response = await Axios.get(getEmployeesURL)
            setEmployeesList(response.data)
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
        oldLastName: updateVal.lastName,
        oldFirstName: updateVal.firstName,
        oldEmployeeUsername: updateVal.employeeUsername,
        oldJobTitle: updateVal.jobTitle,
        oldHourlyWage: updateVal.hourlyWage,
        oldEmployeePhone: updateVal.employeePhone,
        oldEmployeeEmail: updateVal.employeeEmail,
        oldEmployeeRadio: updateVal.employeeRadio,
        oldEmployeePhoto: updateVal.employeePhoto,
        oldEmployeeNote: updateVal.employeeNote,
        id: updateVal.idEmployee
    };
        navTo("/EmployeesUpdate", {state});
    }

    // Render Webpage
    return (
        <>  
            <h2>Employees</h2>
            <article>
                <h3>Add New Employee</h3>
                <p>
                    Click the "Create" button below to add a new Employee to the DINO database.
                </p>
                <div>
                    <p><button onClick={() => navTo("/EmployeesAdd")}>Create</button></p>
                </div>
            </article>
            <article>
                <h3>Edit and Delete</h3>
                <p>
                    To edit or delete any entity within the database, simply click the "Edit" or "<span className="demoRex">*</span>"
                    buttons on the left side of the corresponding row to enter the edit menu or delete
                    it from the database, respectively. Be aware that <strong>updates</strong> will <strong>cascade</strong> to Employee Tasks.
                    If you <strong>delete</strong> an employee, their record in any Employee Tasks will be set to <strong>null</strong>.
                </p>
            </article>
            <article>
                <h3>View Employees</h3>
                <p>
                    The table below shows existing information for Employee entities and includes
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
                    You can use the Job Title selector below to filter for
                    employees that have a specific job. Select "None" to remove the filter and view the entire 
                    table of Employees. 
                </p>
                <div className="selectorP">
                    <SelectorJobClassifications hostURL={hostURL} setJobTitle={setJobTitle} jobTitle={jobTitle} isRequired={false}/>
                </div>
                <div className="scrollableTable">
                    <table>
                        <tbody>
                        <tr>
                            <th>Edit</th>
                            <th>Employee</th>
                            <th>Job</th>
                            <th>Contact</th>
                            <th>Photo</th>
                            <th>Notes</th>
                        </tr>
                        {employeesList.map((val, index)=> {
                            const wage = val.hourlyWage ? val.hourlyWage.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : '$0.00';
                            
                            // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
                            // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
                            // Link Accessed/Verified on 6/1/2023
                            const altText = val.employeePhoto ? val.employeePhoto.substring(14, val.employeePhoto.indexOf('.')) : "Default"
                            const radio = val.employeeRadio ? val.employeeRadio : "N/A"

                            return (
                                <tr key={index}>
                                    <td className="buttonHolder">
                                        <div><button className="tableButton" onClick={()=> {navToUpdate(val)}}>Edit</button></div>
                                        <div><button className="tableButton" onClick={()=> {delEmployee(val)}}>*</button></div>
                                    </td>
                                    <td className="tableDescription">
                                        <div>#{val.idEmployee}</div>
                                        <div><strong>{val.lastName}, {val.firstName}</strong></div>
                                        <div>({val.employeeUsername})</div>
                                    </td>
                                    <td>{val.jobTitle} ({wage}/hr)</td>
                                    <td className="tableDescription">
                                        <ul>
                                            <li>{val.employeePhone}</li>
                                            <li>{val.employeeEmail}</li>
                                            <li>Radio Callsign: {radio}</li>
                                        </ul>
                                    </td>
                                    <td className="imageHolder">
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                        {val.employeePhoto ?
                                        <img src={val.employeePhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.employeePhoto)}/>
                                        :
                                        <img src={defaultImg} alt="Default" width={160} height={90} />
                                        }
                                    </td>
                                    <td className="tableDescription">{val.employeeNote}</td>
                                </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                </div>                                  
            </article>
        </>
    );
};

export default EmployeesPage;