// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE

// Citation: "How to Use Node Environment Variables with a DotEnv File for Node.js and npm" by Veronica Stork
// Our .env file was set up following the Veronica's guide write-up.
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
    const sqlRead = `
    SELECT  Parks.parkName, SUM(EmployeeTasks.empTaskCost) AS parkCost
    FROM TaskCategories
    LEFT JOIN EmployeeTasks ON TaskCategories.idTaskCategory = EmployeeTasks.idTaskCategory
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    JOIN Parks ON Facilities.idPark = Parks.idPark
    GROUP BY Parks.parkName
    ORDER BY ParkCost DESC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ CATEGORY COSTS - Select
app.get('/api/getCategoryCost', (req, res) =>{
    const sqlRead = `
    SELECT  TaskCategories.categoryName, SUM(EmployeeTasks.empTaskCost) AS taskTypeCost
    FROM TaskCategories
    LEFT JOIN EmployeeTasks ON TaskCategories.idTaskCategory = EmployeeTasks.idTaskCategory
    GROUP BY TaskCategories.categoryName
    ORDER BY TaskTypeCost DESC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});


///////////////////////
// Employees Queries //
///////////////////////

// READ - Select Employees
app.get('/api/getEmployees', (req, res) =>{
    const sqlRead = `
    SELECT  Employees.idEmployee, Employees.lastName, Employees.firstName, Employees.employeeUsername, JobClassifications.jobTitle, Employees.hourlyWage,
    Employees.employeePhone, Employees.employeeEmail, Employees.employeeRadio, Employees.employeeNote, Employees.employeePhoto
    FROM Employees
    JOIN JobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
    ORDER BY idEmployee ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// CREATE Employee
app.post('/api/insertEmployees', (req, res) =>{
    const jobTitle = req.body.jobTitle
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const employeeUsername = req.body.employeeUsername
    const hourlyWage = req.body.hourlyWage
    const employeePhone = req.body.employeePhone
    const employeeEmail = req.body.employeeEmail
    const employeeRadio = req.body.employeeRadio
    const employeeNote = req.body.employeeNote
    const employeePhoto = req.body.employeePhoto
    const sqlInsert = `
    INSERT INTO Employees           (idJobClassification, firstName, lastName, employeeUsername, hourlyWage, employeePhone, employeeEmail,
                                    employeeRadio, employeeNote, employeePhoto)
    VALUES  (
                                    (SELECT idJobClassification FROM JobClassifications WHERE jobTitle = ?), 
                                    ?, ?, ?, ?, ?, ?, ?, ?, ?
            );
    `;
    db.query(sqlInsert, [jobTitle, firstName, lastName, employeeUsername, hourlyWage, employeePhone, employeeEmail, employeeRadio, employeeNote, employeePhoto], (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// UPDATE Employee
app.put('/api/updateEmployees', (req, res) =>{
    const jobTitle = req.body.jobTitle
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const hourlyWage = req.body.hourlyWage
    const employeeUsername = req.body.employeeUsername
    const employeePhone = req.body.employeePhone
    const employeeEmail = req.body.employeeEmail
    const employeeRadio = req.body.employeeRadio
    const employeeNote = req.body.employeeNote
    const employeePhoto = req.body.employeePhoto
    const idEmployee = req.body.idEmployee
    const sqlUpdate = `
    UPDATE Employees
    SET     idJobClassification =   (SELECT idJobClassification FROM JobClassifications WHERE jobTitle = ?),
            firstName = ?, lastName = ?, employeeUsername = ?, hourlyWage = ?,
            employeePhone = ?, employeeEmail = ?, employeeRadio = ?, 
            employeeNote = ?, employeePhoto = ?
    WHERE idEmployee = ?;
    `;
    db.query(sqlUpdate, [jobTitle, firstName, lastName, employeeUsername, hourlyWage, employeePhone, employeeEmail, employeeRadio, employeeNote, employeePhoto, idEmployee], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// DELETE Employee
app.delete('/api/deleteEmployees/:idEmployeeTask', (req, res) =>{
    const idEmployee = req.params.idEmployeeTask
    const sqlDelete = `
    DELETE
    FROM Employees
    WHERE idEmployee = ?;
    `;
    db.query(sqlDelete, idEmployee, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});


///////////////////////////
// Employee Task Queries //
///////////////////////////

// READ - Select Employee Tasks
app.get('/api/getEmployeeTasks', (req, res) =>{
    const sqlRead = `
    SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
            TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd
    FROM EmployeeTasks
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
    LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
    ORDER BY EmployeeTasks.idEmployeeTask ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// CREATE Employee Task Entry
app.post('/api/insertEmployeeTasks', (req, res) =>{
    const taskName = req.body.taskName
    const employeeUsername = req.body.employeeUsername
    const categoryName = req.body.categoryName
    const taskHoursWorked = req.body.taskHoursWorked
    const empTaskCost = req.body.empTaskCost
    const empTaskStart = req.body.empTaskStart
    const empTaskEnd = req.body.empTaskEnd
    const sqlInsert = `
    INSERT INTO EmployeeTasks       (idTaskAssigned, idEmployee, idTaskCategory, taskHoursWorked, empTaskCost, empTaskStart, empTaskEnd)
    VALUES  (
                    (SELECT idTaskAssigned FROM TasksAssigned WHERE taskName = ?),
                    (SELECT idEmployee FROM Employees WHERE employeeUsername = ?),
                    (SELECT idTaskCategory FROM TaskCategories WHERE categoryName = ?),
                    ?, ?, ?, ?
            );
    `;
    db.query(sqlInsert, [taskName, employeeUsername, categoryName, taskHoursWorked, empTaskCost, empTaskStart, empTaskEnd], (err, result)=> {
        console.log(result);
        res.send(result);
    });
});


// UPDATE Employee Task Entry
app.put('/api/updateEmployeeTasks', (req, res) =>{
    const taskName = req.body.taskName
    const employeeUsername = req.body.employeeUsername
    const categoryName = req.body.categoryName
    const taskHoursWorked = req.body.taskHoursWorked
    const empTaskCost = req.body.empTaskCost
    const empTaskStart = req.body.empTaskStart
    const empTaskEnd= req.body.empTaskEnd
    const idEmployeeTask = req.body.idEmployeeTask
    const sqlUpdate = `
    UPDATE EmployeeTasks
    SET     idEmployee =            (SELECT idEmployee FROM Employees WHERE employeeUsername = ?),
            idTaskCategory =        (SELECT idTaskCategory FROM TaskCategories WHERE categoryName = ?),
            idTaskAssigned =        (SELECT idTaskAssigned FROM TasksAssigned WHERE taskName = ?),
            taskHoursWorked = ?, empTaskCost = ?, 
            empTaskStart = ?, empTaskEnd = ?
    WHERE idEmployeeTask = ?;
    `;
    db.query(sqlUpdate, [employeeUsername, categoryName, taskName, taskHoursWorked, empTaskCost, empTaskStart, empTaskEnd, idEmployeeTask], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// DELETE Employee Task
app.delete('/api/deleteEmployeeTasks/:idEmployeeTask', (req, res) =>{
    const idEmployeeTask = req.params.idEmployeeTask
    const sqlDelete = `
    DELETE
    FROM EmployeeTasks
    WHERE idEmployeeTask = ?;
    `;
    db.query(sqlDelete, idEmployeeTask, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});

//////////////////////////////
//  Tasks Assigned Queries  //
//////////////////////////////

// READ - Select Assigned Tasks
app.get('/api/getAssignedTasks', (req, res) => {
    const sqlRead = `
    SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
            TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd
    FROM TasksAssigned
    LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
    LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    ORDER BY TasksAssigned.idTaskAssigned ASC;
    `;
    db.query(sqlRead, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

//CREATE - Assigned Task Entry
app.post('/api/insertAssignedTasks', (req, res) => {
    const taskName = req.body.taskName
    const taskDescription = req.body.taskDescription
    const taskStart = req.body.taskStart
    const taskEnd = req.body.taskEnd
    const sqlInsert = `
    INSERT INTO TasksAssigned       (idFacility, idBiologicalAsset, taskName, taskDescription, taskStart, taskEnd)
        VALUES  (       
                    (SELECT idFacility FROM Facilities WHERE facilityName = ?),
                    (SELECT idBiologicalAsset FROM BiologicalAssets WHERE bioAssetName = ?), 
                    ?, ?, ?, ?
            );
        `;
    db.query(sqlInsert, [taskName, taskDescription, taskStart, taskEnd], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

// UPDATE Employee Task Entry
app.put('/api/updateAssignedTasks', (req, res) =>{
    const taskName = req.body.taskName
    const taskDescription = req.body.taskDescription
    const taskStart = req.body.taskStart
    const taskEnd = req.body.taskEnd
    const sqlUpdate = `
    UPDATE AssignedTasks
    SET     idFacility =            (SELECT idFacility FROM Facilities WHERE facilityName = ?),
            idBiologicalAsset =     (SELECT idBiologicalAsset FROM BiologicalAssets WHERE bioAssetName = ?),
            taskname = ?, taskDescription = ?,
            taskStart = ?, taskEnd = ?
    WHERE idAssignedTask = ?;
    `;
    db.query(sqlUpdate, [taskName, taskDescription, taskStart, taskEnd], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// DELETE Assigned Task
app.delete('/api/deletetAssignedTasks/:idAssignedTask', (req, res) =>{
    const idAssignedTask = req.params.idAssignedTask
    const sqlDelete = `
    DELETE
    FROM AssignedTasks
    WHERE idAssignedTask = ?;
    `;
    db.query(sqlDelete, idAssignedTask, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});


//////////////////////////
//  Facilities Queries  //
//////////////////////////

// READ
app.get('/api/getFacilities', (req, res) =>{
    const sqlRead = `
    SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
            Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
            Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote
    FROM Facilities
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
    LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
    ORDER BY idFacility ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Add
app.post('/api/insertFacilities', (req, res) =>{
    const parkName = req.body.parkName
    const facTypeName = req.body.facTypeName
    const habitatName = req.body.habitatName
    const facilityName = req.body.facilityName
    const facilityDescription = req.body.facilityDescription
    const facilityLocation = req.body.facilityLocation
    const securityRating = req.body.securityRating
    const facilityPhoto = req.body.facilityPhoto
    const facilityNote = req.body.facilityNote
    const sqlInsert = `
    INSERT INTO Facilities              (idPark, idFacilityType, idHabitat, facilityName, facilityDescription, 
                                        facilityLocation, securityRating, facilityPhoto, facilityNote)
    VALUES  (       
                    (SELECT idPark FROM Parks WHERE parkName = ?), 
                    (SELECT idFacilityType FROM FacilityTypes WHERE facTypeName = ?), 
                    (SELECT idHabitat FROM Habitat WHERE habitatName = ?), 
                    ?, ?, ?, ?, ?, ?
            );
    `;
    db.query(sqlInsert, [parkName, facTypeName, habitatName, facilityName, facilityDescription, facilityLocation, securityRating, facilityPhoto, facilityNote], (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Update
app.put('/api/updateFacilities', (req, res) =>{
    const parkName = req.body.parkName
    const facTypeName = req.body.facTypeName
    const habitatName = req.body.habitatName
    const facilityName = req.body.facilityName
    const facilityDescription = req.body.facilityDescription
    const facilityLocation = req.body.facilityLocation
    const securityRating = req.body.securityRating
    const facilityPhoto = req.body.facilityPhoto
    const facilityNote = req.body.facilityNote
    const idFacility = req.body.idFacility
    const sqlUpdate = `
    UPDATE Facilities
    SET     idPark =                (SELECT idPark FROM Parks WHERE parkName = ?),
            idFacilityType =        (SELECT idFacilityType FROM FacilityTypes WHERE facTypeName = ?),
            idHabitat =             (SELECT idHabitat FROM Habitats WHERE habitatName = ?),
            facilityName = ?, facilityDescription = ?, facilityLocation = ?, 
            securityRating = ?, facilityPhoto = ?, facilityNote = ?
    WHERE idFacility = ?;
    `;
    db.query(sqlUpdate, [parkName, facTypeName, habitatName, facilityName, facilityDescription, facilityLocation, securityRating, facilityPhoto, facilityNote, idFacility], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// Delete
app.delete('/api/deleteFacilities/:idFacility', (req, res) =>{
    const idFacility = req.params.idFacility
    const sqlDelete = `
    DELETE
    FROM Facilities
    WHERE idFacility = ?;
    `;
    db.query(sqlDelete, idFacility, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});



//////////////////////////////
// Biological Asset Queries //
//////////////////////////////

// READ List All Assets
app.get('/api/getBiologicalAssets', (req, res) =>{
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName 
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    ORDER BY idBiologicalAsset ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ Habitat Alert
app.get('/api/checkBiologicalAssetsHabitats', (req, res) =>{
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, currentHab.habitatName AS currentHabitat, speciesHab.habitatName AS needsHabitat
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    LEFT JOIN Habitats currentHab ON Facilities.idHabitat = currentHab.idHabitat
    JOIN Habitats speciesHab ON Species.idHabitat = speciesHab.idHabitat
    WHERE Species.idHabitat != Facilities.idHabitat OR Facilities.idHabitat IS NULL
    ORDER BY facilityName, speciesName, bioAssetName;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ Security Alert
app.get('/api/checkBiologicalAssetsSecurity', (req, res) =>{
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Facilities.securityRating, Species.threatLevel, Species.threatLevel - Facilities.securityRating AS severity
    FROM BiologicalAssets
    JOIN Species on BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities on BiologicalAssets.idFacility = Facilities.idFacility
    WHERE Facilities.securityRating < Species.threatLevel
    ORDER BY severity, Facilities.facilityName, BiologicalAssets.bioAssetName;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// CREATE Biological Asset
app.post('/api/insertBiologicalAssets', (req, res) =>{
    const speciesName = req.body.speciesName
    const facilityName = req.body.facilityName
    const bioAssetName = req.body.bioAssetName
    const sqlInsert = `
    INSERT INTO BiologicalAssets    (idSpecies, idFacility, bioAssetName)
    VALUES (
                    (SELECT idSpecies FROM Species WHERE speciesName = ?),
                    (SELECT idFacility FROM Facilities WHERE facilityName = ?),
                    ?
            );
    `;
    db.query(sqlInsert, [speciesName, facilityName, bioAssetName], (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// UPDATE Biological Asset
app.put('/api/updateBiologicalAssets', (req, res) =>{
    const speciesName = req.body.speciesName
    const facilityName = req.body.facilityName
    const bioAssetName = req.body.bioAssetName
    const idBiologicalAsset = req.body.idBiologicalAsset
    const sqlUpdate = `
    UPDATE BiologicalAssets
    SET     idSpecies =             (SELECT idSpecies FROM Species WHERE speciesName = ?),
            idFacility =            (SELECT idFacility FROM Facilities WHERE facilityName = ?),
            bioAssetName = ?
    WHERE   idBiologicalAsset = ?;
    `;
    db.query(sqlUpdate, [speciesName, facilityName, bioAssetName, idBiologicalAsset], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// READ Assets Filtered by Species
app.post('/api/filterBioAssetsBySpecies', (req, res) =>{
    const speciesName = req.body.speciesName
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName 
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    WHERE Species.speciesName = ?
    ORDER BY idBiologicalAsset ASC;
    `;
    db.query(sqlRead, speciesName, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// DELETE Biological Asset
app.delete('/api/deleteBiologicalAssets/:idBiologicalAsset', (req, res) =>{
    const idBiologicalAsset = req.params.idBiologicalAsset
    const sqlDelete = `
    DELETE
    FROM BiologicalAssets
    WHERE idBiologicalAsset = ?`;
    db.query(sqlDelete, idBiologicalAsset, (err, result)=> {
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
    const sqlInsert = `
    INSERT INTO TaskCategories (categoryName) VALUES (?);
    `;
    db.query(sqlInsert, [categoryName], (err, result)=> {
        console.log(result);
        res.send(result);
    })
})

// READ TASK CATEGORIES - Select
app.get('/api/getTaskCategories', (req, res) =>{
    const sqlRead = `
    SELECT * FROM TaskCategories;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// UPDATE TASK CATEGORIES
app.put('/api/updateTaskCategories', (req, res) =>{
    const idTaskCategory = req.body.idTaskCategory
    const categoryName = req.body.categoryName
    const sqlUpdate = `
    UPDATE TaskCategories
    SET     categoryName = ?
    WHERE idTaskCategory = ?;
    `;
    db.query(sqlUpdate, [categoryName, idTaskCategory], (err, result)=> {
        if (err) console.log(err); else console.log(result);
        res.send(result);
    });
});

// DELETE TASK CATEGORIES
app.delete('/api/deleteTaskCategories/:idTaskCategory', (req, res) =>{
    const idTaskCategory = req.params.idTaskCategory
    const sqlDelete = `
    DELETE
    FROM TaskCategories
    WHERE idTaskCategory = ?`;
    db.query(sqlDelete, idTaskCategory, (err, result)=> {
        if (err) console.log(err);
        res.send(result);
    });
});

////////////////////////
// SELECT LIST ROUTES //
////////////////////////

// Biological Asset Selector
app.get('/api/getSpeciesList', (req, res) =>{
    const sqlRead = `
    SELECT speciesName, threatLevel
    FROM Species
    ORDER BY speciesName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Facility Selector
app.get('/api/getFacilitiesList', (req, res) =>{
    const sqlRead = `
    SELECT facilityName, securityRating
    FROM Facilities
    ORDER BY facilityName, securityRating ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Assigned Task Selector
app.get('/api/getTasksAssignedList', (req, res) =>{
    const sqlRead = `
    SELECT taskName, taskStart
    FROM TasksAssigned
    ORDER BY taskName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Employee Selector (First/Last + Username)
app.get('/api/getEmployeesList', (req, res) =>{
    const sqlRead = `
    SELECT lastName, firstName, employeeUsername
    FROM Employees
    ORDER BY lastName, firstName, employeeUsername ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Task Category Selector
app.get('/api/getTaskCategoriesList', (req, res) =>{
    const sqlRead = `
    SELECT categoryName
    FROM TaskCategories
    ORDER BY categoryName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Job Selector
app.get('/api/getJobClassificationsList', (req, res) =>{
    const sqlRead = `
    SELECT jobTitle
    FROM JobClassifications
    ORDER BY jobTitle ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Parks Selector
app.get('/api/getParksList', (req, res) =>{
    const sqlRead = `
    SELECT parkName
    FROM Parks
    ORDER BY parkName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Habitats Selector
app.get('/api/getHabitatsList', (req, res) =>{
    const sqlRead = `
    SELECT habitatName
    FROM Habitats
    ORDER BY habitatName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// Facility Types Selector
app.get('/api/getFacilityTypesList', (req, res) =>{
    const sqlRead = `
    SELECT facTypeName
    FROM FacilityTypes
    ORDER BY idFacilityType ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        console.log(result);
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
