// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
// Basic selector component functions and HTML layout created by the team, unless otherwise noted in general page or section-specific citation comments, 
// using standard JS and React syntax and built-in functions.

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023

import React, { useState, useEffect } from 'react';
import Axios from 'axios';


// If no old value passed, defaults the old value to "null". Also adjusts autoFocus and required rendering aspects as needed.
const SelectorFacilities = ({preSelected, isRequired, autoFocus, hostURL, setFacilityName}) => {

  // Create useState for the selection and list
  // For update, just update pre-selected image to match an input variable first
  const [selected, setSelected] = useState()
  const [list, setList] = useState([])

  // Selection event handler to pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setFacilityName(event.target.value)
  };

  // Update pre-selected
  useEffect(()=> {setSelected(preSelected)}, []);
  
  // Facilities SQL Endpoints
  const getListURL = hostURL + '/api/getFacilitiesList';

  // Populate list
  useEffect(()=> {
    Axios.get(getListURL).then((response)=> {
    setList(response.data)
    console.log(response.data)
    })
  }, []);

  // Autofocus and isRequired elements passed in can tailor it to use on different pages
  return (
    <>
      <div><label htmlFor="facilitiesSelector">Facility</label></div>
      <select id="facilitiesSelector" value={selected} onChange={selectionHandler} autoFocus={autoFocus ? true : false} required={isRequired ? true : false}>
        {/* Set default option then map query results to populate the select menu */}
        <option value="">None (Select a Facility)</option>
        {list.map((val, index) => {
      if (val.habitatName !== null) {
        return (
          <option key={index} value={val.facilityName}>{val.parkName}, {val.facilityName} (Security: {val.securityRating}, {val.habitatName})</option>
        );
      } else {
        return (
          <option key={index} value={val.facilityName}>{val.parkName}, {val.facilityName} (Security: {val.securityRating}, NOT ENCLOSURE)</option>
        );
      }
    })}
      </select>
    </>
  );
};


export default SelectorFacilities;