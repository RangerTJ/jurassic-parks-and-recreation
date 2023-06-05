import React, { useState, useEffect } from 'react';
import Axios from 'axios';


// If no old value passed, defaults the old value to "null". Also adjusts autoFocus and required rendering aspects as needed.
const SelectorSpecies = ({preSelected, isRequired, autoFocus, hostURL, setSpeciesName}) => {

  // Create useState for the selection and list
  const [selected, setSelected] = useState()
  const [list, setList] = useState([])

  // Selection event handler to pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setSpeciesName(event.target.value)
  };
  
  // Update the field to the preset option any time it's not null
  useEffect(()=> {
    if (preSelected !== null) {setSelected(preSelected);}}, [preSelected])

  // Species SQL Endpoints
  const getListURL = hostURL + '/api/getSpeciesList';

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
      <div><label htmlFor="speciesSelector">Species</label></div>
      <select id="speciesSelector" value={selected} onChange={selectionHandler} autoFocus={autoFocus ? true : false} required={isRequired ? true : false}>
        {/* Set default option then map query results to populate the select menu */}
        <option value="">None (Select a Species)</option>
        {list.map((val, index) => {
          return <option key={index} value={val.speciesName}>{val.speciesName} (Threat: {val.threatLevel}, Needs: {val.habitatName})</option>;
        })}
      </select>
    </>
  );
};


export default SelectorSpecies;