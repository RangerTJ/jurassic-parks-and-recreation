import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// Add useEffect so it refreshes?
// Add useState to save selection?

// Blend of below citation and ChatGPT syntax recomendation for mapping to a select menu
// Current code copied directly from here by user Savior from Stackoverflow; will adapt as needed
// https://stackoverflow.com/questions/69111477/how-to-iterate-through-public-assets-images-so-i-can-get-all-images-filename-in


// Idea pass in variable to designate folder
// Make folder selectable... from drop down somehow?
// ... or just a component for each image select type and hard code in the folders


// Need to add a logic fork for whether it's required or not (for bio assets ONLY, all other selects mandatory in all cases)
// Render a different element depending on which one it is


// I *think* this will work so that if no species is passed, it defaults to null, and otherwise defaults it to the selection
const SelectorFacilities = ({preSelected, isRequired, hostURL, facility, setFacility}) => {

  // Create useState for the selection and list
  // For update, just update pre-selected image to match an input variable first
  const [selected, setSelected] = useState()
  const [list, setList] = useState([])

  // Selection event handler to pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setFacility(event.target.value)
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

  // Website Manipulation
  return (
    <>
    
      <div><label htmlFor="facilitiesSelector">Facility</label></div>
      <select id="facilitiesSelector" value={selected} onChange={selectionHandler} required>

        {/* Map the Options after hard-coded default */}
        <option value="">Select a Facility</option>
        {list.map((val, index) => {
          return <option key={index} value={val.facilityName}>{val.facilityName} (Security: {val.securityRating})</option>;
        })}
      </select>
      <p>{preSelected},{selected} DEBUG STUFF</p>
    </>
  );
};


export default SelectorFacilities