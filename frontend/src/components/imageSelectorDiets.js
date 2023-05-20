import React, { useState, useEffect } from 'react';


// Blend of below citation and ChatGPT syntax recomendation for mapping to a select menu
// Current code copied directly from here by user Savior from Stackoverflow; will adapt as needed
// https://stackoverflow.com/questions/69111477/how-to-iterate-through-public-assets-images-so-i-can-get-all-images-filename-in


// 
const ImageSelectorDiets = ({preSelected, isRequired, autoFocus, hostURL, image, setImage}) => {
  // Use context to retrieve images - Have to hard code for each type of selector because web pack is dumb (cant just pass in the folder endpoint as a variable)
  const images = require.context(`../images/dietImages`, false, /\.(png|jpg|svg)$/);

  // Map available images in directory
  function mapImages(images) {
      return images.keys().map(images);
  }

    // Create useState for the selection and list
    const [selected, setSelected] = useState()

  // Selection event handler to generate preview / pass on selection data to DB
  const selectionHandler = (event) => {
    setSelected(event.target.value)
    setImage(event.target.value)
  };

  // Update the field to the preset option any time it's not null
  useEffect(()=> {
    if (preSelected !== null) {setSelected(preSelected);}}, [preSelected])

  // Website Manipulation
  const filenames = mapImages(images)
  return (
    <>
      <div><label htmlFor="speciesImageSelector">Image Selection</label></div>
      <select id="speciesImageSelector" value={selected} onChange={selectionHandler} autoFocus={autoFocus ? true : false} required={isRequired ? true : false}>

        {/* Map the Options after hard-coded default */}
        <option value="">Select an Image (Default - None)</option>
        {filenames.map((imagePath, index) => {
          return <option key={index} value={imagePath}>{imagePath}</option>;
        })}
      </select>
      {/* <p>{preSelected},{selected} DEBUG STUFF</p> */}

      {/* Conditionally Render Preview Image (if not null) */}
      {selected && (
          <div>
            <div><label htmlFor="previewImage">Image Preview</label></div>
            <img id="previewImage" src={selected} alt={selected} width="200px" />
          </div>
      )}
    </>
  );
};

export default ImageSelectorDiets