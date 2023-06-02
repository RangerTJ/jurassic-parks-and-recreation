import React, { useState, useEffect } from 'react';


// Citation: Code to map images in src folders heavily based on example code from stackoverflow by user Savior on 9/9/2021.
// URL: https://stackoverflow.com/questions/69111477/how-to-iterate-through-public-assets-images-so-i-can-get-all-images-filename-in
// Link Accessed/Verified on 6/1/2023

// Citation: Code for mapping select menu heavily inspired by the following discussion (posts by ) on stackoverflow
// URL: https://stackoverflow.com/questions/31413053/how-to-use-an-array-as-option-for-react-select-component
// Link Accessed/Verified on 6/1/2023

// Citation: Code for event triggering using onChange event heavily inspired by Abdullah Ch's stackoverflow answer on 8/15/2021
// URL: https://stackoverflow.com/questions/68790381/how-to-use-onchange-in-react-select
// Link Accessed/Verified on 6/1/2023


// If no old value passed, defaults the old value to "null". Also adjusts autoFocus and required rendering aspects as needed.
const ImageSelectorDiets = ({preSelected, isRequired, autoFocus, hostURL, image, setImage}) => {
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

  // Citation: Used slicing method suggested by user Bumptious Q Bangwhistle on stackoverflow on 1/23/2017 to slice image paths to more useful descriptive text for alt text.
  // URL: https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
  // Link Accessed/Verified on 6/1/2023
  // Ternary condition selected to prevent null-selection crash.
  const altText = selected ? selected.substring(14, selected.indexOf('.')) : selected

  return (
    <>
      <div><label htmlFor="dietsImageSelector">Image Selection</label></div>
      <select id="dietsImageSelector" value={selected} onChange={selectionHandler} autoFocus={autoFocus ? true : false} required={isRequired ? true : false}>

        {/* Map the Options after hard-coded default */}
        <option value="">Select an Image (Default - None)</option>
        {filenames.map((imagePath, index) => {
          return <option key={index} value={imagePath}>{imagePath.substring(14, imagePath.indexOf('.'))}</option>;
        })}
      </select>

      {/* Conditionally Render Preview Image (if not null) */}
      {selected && (
          <div>
            <div><label htmlFor="previewImage">Image Preview</label></div>
            <img id="previewImage" src={selected} alt={altText} width="200px" />
          </div>
      )}
    </>
  );
};

export default ImageSelectorDiets;