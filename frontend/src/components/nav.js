import React from 'react';
import { Link } from 'react-router-dom';

function Nav() { return (
    <>
        <nav>
        <Link to="/Index" >Home</Link>
        <Link to="/Parks" >Parks</Link>
        <Link to="/Facilities" >Facilities</Link>
        <Link to="/BiologicalAssets" >Biological Assets</Link>
        <Link to="/Employees" >Employees</Link>
        <Link to="/TasksAssigned" >Tasks Assigned</Link>
        <Link to="/EmployeeTasks" >Employee Tasks</Link>
        <Link to="/TaskCategories" >Task Categories</Link>
        <Link to="/Species" >Species</Link>
        <Link to="/Diets" >Diets</Link>
        <Link to="/Habitats" >Habitats</Link>
        <Link to="/FacilityTypes" >Facility Types</Link>
        <Link to="/JobClassifications" >Job Classifications</Link>
      </nav>
    </>
    );
};

export default Nav;