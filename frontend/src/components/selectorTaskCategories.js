import React, { useState, useEffect } from 'react';
import Axios from 'axios';


////////////////
// TO DO: ALL //
////////////////


// Blend of below citation and ChatGPT syntax recomendation for mapping to a select menu
// Current code copied directly from here by user Savior from Stackoverflow; will adapt as needed
// https://stackoverflow.com/questions/69111477/how-to-iterate-through-public-assets-images-so-i-can-get-all-images-filename-in


// I *think* this will work so that if no species is passed, it defaults to null, and otherwise defaults it to the selection
const SelectorTaskCategories = ({preSelected, isRequired, autofocus, hostURL, categoryName, setCategoryName}) => {

  // Create useState for the selection and list
  // For update, just update pre-selected image to match an input variable first
  const [selected, setSelected] = useState()
  const [list, setList] = useState([])

  // Selection event handler to pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setCategoryName(event.target.value)
  };
  
  // Update the field to the preset option any time it's null
  useEffect(()=> {
    if (preSelected !== null) {setSelected(preSelected);}}, [preSelected])

  // BiologicalAssets SQL Endpoints
  const getListURL = hostURL + '/api/getTaskCategoriesList';

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
      <div><label htmlFor="taskCategorySelector">Category</label></div>
      <select id="taskCategorySelector" value={selected} onChange={selectionHandler} autofocus={autofocus ? true : false} required={isRequired ? true : false}>
        {/* Set default option then map query results to populate the select menu */}
        <option value="">None (Select a Category)</option>
        {list.map((val, index) => {
          return <option key={index} value={val.categoryName}>{val.categoryName}</option>;
        })}
      </select>
      {/* <p>{preSelected},{selected} DEBUG STUFF</p> */}
    </>
  );
};


export default SelectorTaskCategories