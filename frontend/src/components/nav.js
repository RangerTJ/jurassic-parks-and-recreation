// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

import React from 'react';
import { Link } from 'react-router-dom';

function Nav() { return (
    <>
        <nav>
        <Link to="/" >Home</Link>
        <Link to="/Parks" >Parks</Link>
        <Link to="/Facilities" >Facilities</Link>
        <Link to="/FacilityTypes" >Facility Types</Link>
        <Link to="/Employees" >Employees</Link>
        <Link to="/JobClassifications" >Job Classifications</Link>
        <Link to="/TasksAssigned" >Tasks Assigned</Link>
        <Link to="/EmployeeTasks" >Employee Tasks</Link>
        <Link to="/TaskCategories" >Task Categories</Link>
        <Link to="/BiologicalAssets" >Biological Assets</Link>
        <Link to="/Species" >Species</Link>
        <Link to="/Diets" >Diets</Link>
        <Link to="/Habitats" >Habitats</Link>
      </nav>
    </>
    );
};

export default Nav;