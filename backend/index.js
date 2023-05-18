// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

// .env set up following:
// https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql");
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

// Middleware loaded from tutorial video to handle SQL
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

///////////////////////
// HOME PAGE QUERIES //
///////////////////////

// READ PARK COSTS - Select
app.get('/api/getParkCost', (req, res) =>{
    const sqlTaskCategoryRead = `
    SELECT  Parks.parkName, SUM(EmployeeTasks.empTaskCost) AS parkCost
    FROM TaskCategories
    LEFT JOIN EmployeeTasks ON TaskCategories.idTaskCategory = EmployeeTasks.idTaskCategory
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    JOIN Parks ON Facilities.idPark = Parks.idPark
    GROUP BY Parks.parkName
    ORDER BY ParkCost DESC;
    `;
    db.query(sqlTaskCategoryRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ CATEGORY COSTS - Select
app.get('/api/getCategoryCost', (req, res) =>{
    const sqlTaskCategoryRead = `
    SELECT  TaskCategories.categoryName, SUM(EmployeeTasks.empTaskCost) AS taskTypeCost
    FROM TaskCategories
    LEFT JOIN EmployeeTasks ON TaskCategories.idTaskCategory = EmployeeTasks.idTaskCategory
    GROUP BY TaskCategories.categoryName
    ORDER BY TaskTypeCost DESC;
    `;
    db.query(sqlTaskCategoryRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

//////////////////////////////
// Biological Asset Queries //
//////////////////////////////

// READ List All Assets
app.get('/api/getBiologicalAssets', (req, res) =>{
    const sqlTaskCategoryRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName 
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    ORDER BY idBiologicalAsset ASC;
    `;
    db.query(sqlTaskCategoryRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ Habitat Alert
app.get('/api/checkBiologicalAssetsHabitats', (req, res) =>{
    const sqlTaskCategoryRead = `
    SELECT BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName AS currentWrongHome, currentHab.habitatName AS currentHabitat, speciesHab.habitatName AS needsHabitat
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    LEFT JOIN Habitats currentHab ON Facilities.idHabitat = currentHab.idHabitat
    JOIN Habitats speciesHab ON Species.idHabitat = speciesHab.idHabitat
    WHERE Species.idHabitat != Facilities.idHabitat OR Facilities.idHabitat IS NULL
    ORDER BY facilityName, speciesName, bioAssetName;
    `;
    db.query(sqlTaskCategoryRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ Security Alert
app.get('/api/checkBiologicalAssetsSecurity', (req, res) =>{
    const sqlTaskCategoryRead = `
    SELECT BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Facilities.securityRating, Species.threatLevel, Species.threatLevel - Facilities.securityRating AS severity
    FROM BiologicalAssets
    JOIN Species on BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities on BiologicalAssets.idFacility = Facilities.idFacility
    WHERE Facilities.securityRating < Species.threatLevel
    ORDER BY severity, facilities.facilityName, BiologicalAssets.bioAssetName;
    `;
    db.query(sqlTaskCategoryRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// DELETE Biological Asset
app.delete('/api/deleteBiologicalAssets/:idBiologicalAsset', (req, res) =>{
    const idBiologicalAsset = req.params.idBiologicalAsset
    const sqlBiologicalAssetDelete = `
    DELETE
    FROM BiologicalAssets
    WHERE idBiologicalAsset = ?`;
    db.query(sqlBiologicalAssetDelete, idBiologicalAsset, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});


///////////////////////////
// TASK CATEGORY QUERIES //
///////////////////////////

// CREATE TASK CATEGORIES - Post message to browser after doing a test insert (based on tutorial example)
app.post('/api/insertTaskCategories', (req, res) =>{
    const categoryName = req.body.categoryName
    const sqlTaskCategoryInsert = "INSERT INTO `TaskCategories` (categoryName) VALUES (?);";
    db.query(sqlTaskCategoryInsert, [categoryName], (err, result)=> {
        console.log(result);
        res.send(result);
    })
})

// READ TASK CATEGORIES - Select
app.get('/api/getTaskCategories', (req, res) =>{
    const sqlTaskCategoryRead = "SELECT * FROM `TaskCategories`;";
    db.query(sqlTaskCategoryRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// UPDATE TASK CATEGORIES
app.put('/api/updateTaskCategories', (req, res) =>{
    const idTaskCategory = req.body.idTaskCategory
    const categoryName = req.body.categoryName
    console.log(categoryName);
    const sqlTaskCategoryUpdate = `
    UPDATE TaskCategories
    SET     categoryName = ?
    WHERE idTaskCategory = ?;`;
    db.query(sqlTaskCategoryUpdate, [categoryName, idTaskCategory], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// DELETE TASK CATEGORIES
app.delete('/api/deleteTaskCategories/:idTaskCategory', (req, res) =>{
    const idTaskCategory = req.params.idTaskCategory
    const sqlTaskCategoryDelete = `
    DELETE
    FROM TaskCategories
    WHERE idTaskCategory = ?`;
    db.query(sqlTaskCategoryDelete, idTaskCategory, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});


/////////////////////////////////////////
// Test Connection to the MySQL server //
/////////////////////////////////////////
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;}});


//////////////////
// Start Server //
//////////////////

app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
});
