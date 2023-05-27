// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import staffDefaultImg from '../images/staffImages/default_staff.png';


// HostURL Passed from App.js
function EmployeesPage ({hostURL}) {

    // Navigation Function
    const navTo = useNavigate();

    // BiologicalAssets SQL Endpoints
    const getEmployeesURL = hostURL + '/api/getEmployees';  // TO DO - CREATE USE EFFECT AND USE STATE
    const deleteEmployeesURL = hostURL + '/api/deleteEmployees/';  // TO DO - NEED TO ADD USE STATES AND CRUD FUNCTIONS FOR THIS; INSERT/UPDATE GO ON RESPECTIVE FORM PAGES

    // Bio Asset Table Functions
    const [employeesList, setEmployeesList] = useState([])
    const [employee, setEmployee] = useState('')

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

    // READ Populate Biological Asset Table
    useEffect(()=> {
        getEmployees();
    }, [])

    // DELETE - Deletes target bio asset and refreshes all 3 tables
    const delEmployee = async (delVal) => {
        try {
            if (window.confirm(`Are you sure you want to remove ${delVal.firstName} ${delVal.lastName}?`)) {
                await Axios.delete(deleteEmployeesURL + delVal.idEmployee);
                
                const mainViewResponse = await Axios.get(getEmployeesURL);
                setEmployeesList(mainViewResponse.data);
                console.log(mainViewResponse.data);
        
                alert(`${delVal.firstName} ${delVal.lastName} has been removed from the database.`);
            }} catch (error) {
                console.error('Error deleting employee.', error);
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
            {/* End experimental copy/paste */}
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
                    it from the database, respectively.
                </p>
            </article>
            {/* Could potentially reuse the bio assets species filter for job titles here or do a last name search or something */}
            <article>
                <h3>View Employees</h3>
                <p>
                    The table below shows existing information for Employee entities and includes
                    buttons to update or delete them. If you would like to view a larger version of a 
                    non-default photo click it to see a larger version. Then click anywhere again to dismiss the view.
                </p>
                {/* Lightbox example code used from: Creating a Simple Lightbox From Scratch in React by Alexandra Radevich
                URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                Accessed 5/22/2023. Modified with alt text value and custom display class.*/}
                { lightboxDisplay ?
                <div id="lightbox"onClick={hideLightBox} className="lightbox">
                    <img id="lightbox-img" src={imageToShow} atl={imageToShow} className="lightbox-image"></img>
                </div>
                : '' }
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
                            // No, I didn't make that name up.
                            const altText = val.employeePhoto ? val.employeePhoto.substring(14, val.employeePhoto.indexOf('.')) : "Default"
                            const radio = val.employeeRadio ? val.employeeRadio : "N/A"

                            return (
                                <tr key={index}>
                                    <td>
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
                                    <td>
                                        {/* Lightbox tutorial by Alexandra Radevich provided the code for the on-click trigger here
                                        URL: https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
                                        Accessed 5/22/2023. No modification of code for on-click trigger.*/}
                                        {val.employeePhoto ?
                                        <img src={val.employeePhoto} alt={altText} width={160} height={90} onClick={() => showImage(val.employeePhoto)}/>
                                        :
                                        <img src={staffDefaultImg} alt="Default Image" width={160} height={90} />
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