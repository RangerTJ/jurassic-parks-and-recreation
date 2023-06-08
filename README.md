# DINO: CS340 Project for Jurassic Parks and Recreation #
Digital Information Nexus for Operations (DINO) is a database program used to simulate managing day to day operations at the various parks (canon or otherwise) from the Jurassic Park franchise. It is capable of handling basic CRUD operations for the following park entities:  
* Parks
* Facilities
* Biological Assets
* Employees
* Tasks Assigned
* Employee Tasks
* Species
* Diets
* Habitats
* Facility Types
* Job Classifications  
* Task Categories  

In the interest of keeping the server code submission file size small, our assignment submission package will omit the media files used by the website (in addition to omitting the libraries used within it). Omitted media includes the background image, "security feed" video, main logo, placeholder images, and all the images used by the image selectors on create/update forms. The site's media can be viewed within the site itself at: http://flip3.engr.oregonstate.edu:1543/

## Setup Guide ##
Before you can do anything with this program, you need to make sure that the PC hosting both the backend and frontend have Node.js installed and ready to use (at least version 16.5).  

To set the site up, first clone this repo into a folder. Once this is done, set up the front-end and back-end .env files with proper credentials, ports, and host URLs so that the backend can connect to the MYSQL server hosting the site database (which can be generated from DDL.sql on the SQL server) and so the the front-end can connect to the back-end and use it to process UI requests through the SQL server. Make sure to run 'npm install' in both frontend and backend folders so that all dependencies are in place before attempting to run any part of this program. 

Once all dependencies are in place, you may start up the back-end server's index.js file (on a forever loop for production), then start up the front-end ('npm start' for dev mode or 'npm run build' for production). At this point (assuming the SQL server is online and connected), the site should be fully operational.  

## Code Citations ##
* CRUD React tutorial series created by PedroTech
    * Tutorial code used as the basis for setting up the React backend and all CRUD operations, and mapping response values into the rendered site HTML elements. 
    * URL
        * Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA
        * Part2: https://www.youtube.com/watch?v=3YrOOia3-mo
        * Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
        * Accessed/Verified on 6/1/2023
* “Creating a Simple Lightbox From Scratch in React” by Alexandra Radevich
    * Example code used to begin implementation and modified slightly to suit project needs. All of the lightbox-related code in our project was directly adapted from this tutorial.
    * URL
        * https://medium.com/swlh/creating-a-simple-lightbox-from-scratch-in-react-caea84f90960
        * Accessed/Verified 5/22/2023.
* "Everything about Stroke Text in CSS" by codingdudecom
    * Used as a reference for CSS text styling.
    * URL
        * https://dev.to/codingdudecom/everything-about-stroke-text-in-css-561i
        * Accessed/Verified on 6/1/2023
* "How to use @font-face in CSS" by Chris Coyler
    * Used as reference code style and syntax for font-face styling.
    * URL
        * https://css-tricks.com/snippets/css/using-font-face-in-css/
        * Accessed/Verified on 6/1/2023
* "How to Use Node Environment Variables with a DotEnv File for Node.js and npm" by Veronica Stork
    * Code, syntax and style for our .env file implementation was based on this guide.
    * URL
        * https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/
        * Accessed/Verified on 6/1/2023
* “Replace animated GIFs with video for faster page loads” by Houssein Djirdeh
    * Used code to embed the “security feed” footage on the home page (adapted for React).
    * URL
        * https://web.dev/replace-gifs-with-videos/
        * Accessed/Verified on 6/1/2023
* “Window: scrollTo() method” from mdn web docs
    * Code syntax used to create 'scroll back to top' input for app.js.
    * URL
        * https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
        * Accessed 6/6/2023
* Stackoverflow post by user Dhaval Chaudhary on 9/16/2016. 
    * JS code for detecting if a JS object is empty by using keys length (count). Used as part of logic to conditionally render parts of the Biological Assets page, but only when needed.
    * URL
        * https://stackoverflow.com/questions/2673121/how-to-check-if-object-has-any-properties-in-javascript
        * Accessed/Verified on 6/3/2023.
* Stackoverflow post by user Abdulazeez Jimoh on 10/25/2022
    * Suggested strategy used as the basis for passing an object containing "current" (old) attributes to the useNavigate() function, navTo(), to the edit page.
    * URL
        * https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
        * Accessed/Verified on 6/1/2023
* Stackoverflow post by user Savior on 9/9/2021.
    * Code to map images in src folders heavily based on example code provided in the post.
    * URL
        * https://stackoverflow.com/questions/69111477/how-to-iterate-through-public-assets-images-so-i-can-get-all-images-filename-in
        * Accessed/Verified on 6/1/2023
* Stackoverflow discussion “How to use an array as option for react select component” 
    * Code for mapping select menu heavily inspired by the following discussion, borrowing ideas and concepts from multiple posts from the entire discussion.
    * URL
        * https://stackoverflow.com/questions/31413053/how-to-use-an-array-as-option-for-react-select-component
        * Accessed/Verified on 6/1/2023
* Stackoverflow post by Abdullah Ch on 8/15/2021
    * Heavily inspired by provided code for event triggering using onChange event 
    * URL
        * https://stackoverflow.com/questions/68790381/how-to-use-onchange-in-react-select
        * Link Accessed/Verified on 6/1/2023
* Stackoverflow post by Bumptious Q Bangwhistle on 1/23/2017
    * Used slicing method suggested by user  to slice image paths to more useful descriptive text for alt text.
    * URL
        * https://stackoverflow.com/questions/9133102/how-to-grab-substring-before-a-specified-character-in-javascript
        * Accessed/Verified on 6/1/2023

## Media Citations ##
* The Jurassic Park font is used non-commercially for educational project purposes under a freeware, non-commercial license. Created by Jens R. Ziehn.
    * https://www.fontspace.com/jurassic-park-font-f3555  
* Park "photos" and "Security Feed" were in-game screenshots and footage taken by the site authors from Jurassic World Evolution 2, by Frontier Studios.
    * https://www.jurassicworldevolution2.com/
* Special thanks to Mark Hjorth for putting together the beautiful easter egg that we've linked to in a hidden spot on the website.
    * https://github.com/MarkHjorth/nedry.  

### Additional Image Credits ###
* Hesperornis (Nobu Tamura)  
    * https://commons.wikimedia.org/wiki/File:Hesperornis_BW_(white_background).jpg  
* Thescelosaurus (Nobu Tamura)  
    * https://commons.wikimedia.org/wiki/File:Thescelosaurus_BW3.jpg  
* Diplocaulus (Nobu Tamura)  
    * https://commons.wikimedia.org/wiki/File:Diplocaulus_BW.jpg  
* Metriorhynchus (Nobu Tamura)  
    * https://commons.wikimedia.org/wiki/File:Metriorhynchus_BW.jpg  
* Eustreptospondylus (ДиБгд at Russian Wikipedia Hands fixed by FunkMonk.)  
    * https://commons.wikimedia.org/wiki/File:Eustrept1DB1.jpg  
