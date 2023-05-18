import React from 'react';
import { Link } from 'react-router-dom';

function nav() { return (
    <>
        <nav>
        <Link to="index.html" >Home</Link>
        <Link to="parks.html" >Parks</Link>
        <Link to="facilities.html" >Facilities</Link>
        <Link to="biologicalAssets.html" >Biological Assets</Link>
        <Link to="employees.html" >Employees</Link>
        <Link to="tasksAssigned.html" >Tasks Assigned</Link>
        <Link to="employeeTasks.html" >Employee Tasks</Link>
        <Link to="taskCategories.html" >Task Categories</Link>
        <Link to="species.html" >Species</Link>
        <Link to="diets.html" >Diets</Link>
        <Link to="habitats.html" >Habitats</Link>
        <Link to="facilityTypes.html" >Facility Types</Link>
        <Link to="jobClassifications.html" >Job Classifications</Link>
      </nav>
    </>
    );
};

export default nav;