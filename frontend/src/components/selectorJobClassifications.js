import React, { useState, useEffect } from 'react';
import Axios from 'axios';


// If no old value passed, defaults the old value to "null". Also adjusts autoFocus and required rendering aspects as needed.
const SelectorJobClassifications = ({preSelected, isRequired, autoFocus, hostURL, setJobTitle}) => {

  // Create useState for the selection and list
  // For update, just update pre-selected image to match an input variable first
  const [selected, setSelected] = useState()
  const [list, setList] = useState([])

  // Selection event handler to pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setJobTitle(event.target.value)
  };
  
  // Update the field to the preset option any time it's null
  useEffect(()=> {
    if (preSelected !== null) {setSelected(preSelected);}}, [preSelected])

  // JobClassifications SQL Endpoints
  const getListURL = hostURL + '/api/getJobClassificationsList';

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
      <div><label htmlFor="jobClassificationsSelector">Job Title</label></div>
      <select id="jobClassificationsSelector" value={selected} onChange={selectionHandler} autoFocus={autoFocus ? true : false} required={isRequired ? true : false}>
        {/* Set default option then map query results to populate the select menu */}
        <option value="">None (Select a Job)</option>
        {list.map((val, index) => {
          return <option key={index} value={val.jobTitle}>{val.jobTitle}</option>;
        })}
      </select>
    </>
  );
};


export default SelectorJobClassifications;