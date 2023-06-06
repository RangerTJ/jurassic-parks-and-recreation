// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)

import React, { useState, useEffect } from 'react';
import Axios from 'axios';


// If no old value passed, defaults the old value to "null". Also adjusts autoFocus and required rendering aspects as needed.
const SelectorFacilityTypes = ({preSelected, isRequired, autoFocus, hostURL, setFacTypeName}) => {

  // Create useState for the selection and list
  // For update, just update pre-selected image to match an input variable first
  const [selected, setSelected] = useState()
  const [list, setList] = useState([])

  // Selection event handler to pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setFacTypeName(event.target.value)
  };
  
  // Update the field to the preset option any time it's null
  useEffect(()=> {
    if (preSelected !== null) {setSelected(preSelected);}}, [preSelected])

  // FacilityTypes SQL Endpoint
  const getListURL = hostURL + '/api/getFacilityTypesList';

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
      <div><label htmlFor="facTypeSelector">Facility Type</label></div>
      <select id="facTypeSelector" value={selected} onChange={selectionHandler} autoFocus={autoFocus ? true : false} required={isRequired ? true : false}>
        {/* Set default option then map query results to populate the select menu */}
        <option value="">None (Select a Type)</option>
        {list.map((val, index) => {
          return <option key={index} value={val.facTypeName}>{val.facTypeName}</option>;
        })}
      </select>
    </>
  );
};


export default SelectorFacilityTypes;