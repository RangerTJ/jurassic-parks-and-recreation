import React, { useState } from 'react';

// Add useEffect so it refreshes?
// Add useState to save selection?

// Blend of below citation and ChatGPT syntax recomendation for mapping to a select menu
// Current code copied directly from here by user Savior from Stackoverflow; will adapt as needed
// https://stackoverflow.com/questions/69111477/how-to-iterate-through-public-assets-images-so-i-can-get-all-images-filename-in


// Idea pass in variable to designate folder
// Make folder selectable... from drop down somehow?
// ... or just a component for each image select type and hard code in the folders

const ImageSelectorParks = () => {
  // Use context to retrieve images - Have to hard code for each type of selector because web pack is dumb
  // and require.context won't play nice with variable strings (so cant just pass in the folder endpoint)
  // Redundant and probably a better way to let us pass in the folder, but whatever.
  const images = require.context(`../images/parkImages`, false, /\.(png|jpg|svg)$/);

  // Map available images in directory
  function mapImages(images) {
      return images.keys().map(images);
  }

  // Create useState for the selection
  const [selectedImage, setSelectedImage] = useState()

  // Selection event handler to generate preview / pass on selection data to DB
  const selectionHandler = (event) => {
    setSelectedImage(event.target.value)
  };

  // Website Manipulation
  const filenames = mapImages(images)
  return (
    <>
      <div><label htmlFor="speciesImageSelector">Image Selection</label></div>
      <select id="speciesImageSelector" value={selectedImage} onChange={selectionHandler}>

        {/* Map the Options after hard-coded default */}
        <option value="">Select an Image (Default - None)</option>
        {filenames.map((imagePath, index) => {
          return <option key={index} value={imagePath}>{imagePath}</option>;
        })}
      </select>

      {/* Conditionally Render Preview Image (if not null) */}
      {selectedImage && (
          <div>
            <p><label htmlFor="previewImage">Image Preview</label></p>
            <img id="previewImage" src={selectedImage} alt={selectedImage} width="200px" />
          </div>
        )}
    </>
  );
};

export default ImageSelectorParks