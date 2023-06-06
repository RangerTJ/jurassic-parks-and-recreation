// Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)

// Basic CRUD operations and React implementation was heavily based on the CRUD React tutorial series created by PedroTech
// URLs - Part1: https://www.youtube.com/watch?v=T8mqZZ0r-RA, Part2: https://www.youtube.com/watch?v=3YrOOia3-mo, Part3: https://www.youtube.com/watch?v=_S2GKnFpdtE
// Link Accessed/Verified on 6/1/2023

// Citation: "How to Use Node Environment Variables with a DotEnv File for Node.js and npm" by Veronica Stork
// Our .env file was set up following the Veronica's guide write-up.
// https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/
// Link Accessed/Verified on 6/1/2023

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
    FROM Parks
    LEFT JOIN Facilities ON Parks.idPark = Facilities.idPark
    LEFT JOIN TasksAssigned ON Facilities.idFacility = TasksAssigned.idFacility
    LEFT JOIN EmployeeTasks ON TasksAssigned.idTaskAssigned = EmployeeTasks.idTaskAssigned
    GROUP BY Parks.parkName
    ORDER BY ParkCost DESC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Employee COSTS - Select
app.get('/api/getEmployeeCost', (req, res) =>{
    const sqlRead = `
    SELECT  Employees.lastName, Employees.firstName, Employees.employeeUsername, SUM(EmployeeTasks.empTaskCost) AS employeeCost
    FROM EmployeeTasks
    LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
    GROUP BY Employees.employeeUsername
    ORDER BY employeeCost DESC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Task COSTS - Select
app.get('/api/getTaskCost', (req, res) =>{
    const sqlRead = `
    SELECT  TasksAssigned.taskName, SUM(EmployeeTasks.empTaskCost) AS taskCost
    FROM EmployeeTasks
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    GROUP BY TasksAssigned.taskName
    ORDER BY taskCost DESC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Facility COSTS - Select
app.get('/api/getFacilityCost', (req, res) =>{
    const sqlRead = `
    SELECT  Facilities.facilityName, Parks.parkName, SUM(EmployeeTasks.empTaskCost) AS facilityCost
    FROM EmployeeTasks
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    GROUP BY Facilities.facilityName
    ORDER BY facilityCost DESC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Bio Asset  COSTS - Select
app.get('/api/getBioAssetCost', (req, res) =>{
    const sqlRead = `
    SELECT  BiologicalAssets.bioAssetName, Species.speciesName, Parks.parkName, SUM(EmployeeTasks.empTaskCost) AS assetCost
    FROM EmployeeTasks
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
    LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    LEFT JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    GROUP BY BiologicalAssets.bioAssetName
    ORDER BY assetCost DESC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});


///////////////////
// PARKS QUERIES //
///////////////////

// CREATE Park
app.post('/api/insertParks', (req, res) =>{
    const parkName = req.body.parkName
    const parkDescription = req.body.parkDescription
    const parkLocation = req.body.parkLocation
    const parkPhoto = req.body.parkPhoto
    const sqlInsert = `
    INSERT INTO Parks                 (parkName, parkDescription, parkLocation, parkPhoto)
    VALUES  (
                                    ?, ?, ?, ?
            );
    `;
    db.query(sqlInsert, [parkName, parkDescription, parkLocation, parkPhoto], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
})

// READ Parks (Table View)
app.get('/api/getParks', (req, res) =>{
    const sqlRead = `
    SELECT * FROM Parks;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// UPDATE Park
app.put('/api/updateParks', (req, res) =>{
    const parkName = req.body.parkName
    const parkDescription = req.body.parkDescription
    const parkLocation = req.body.parkLocation
    const parkPhoto = req.body.parkPhoto
    const idPark = req.body.idPark
    const sqlUpdate = `
    UPDATE Parks
    SET     parkName = ?, parkDescription = ?, parkLocation = ?, parkPhoto = ?
    WHERE idPark = ?;
    `;
    db.query(sqlUpdate, [parkName, parkDescription, parkLocation, parkPhoto, idPark], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// DELETE Park
app.delete('/api/deleteParks/:idPark', (req, res) =>{
    const idPark = req.params.idPark
    const sqlDelete = `
    DELETE
    FROM Parks
    WHERE idPark = ?;
    `;
    db.query(sqlDelete, idPark, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});


////////////////////////////////
// Job Classification Queries //
////////////////////////////////

// CREATE Job Classification
app.post('/api/insertJobClassifications', (req, res) =>{
    const jobTitle = req.body.jobTitle
    const jobDescription = req.body.jobDescription
    const sqlInsert = `
    INSERT INTO JobClassifications  (jobTitle, jobDescription)
    VALUES  (
                    ?, ?
            );
    `;
    db.query(sqlInsert, [jobTitle, jobDescription], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
})

// READ Job Classifications (Table View)
app.get('/api/getJobClassifications', (req, res) =>{
    const sqlRead = `
    SELECT * FROM JobClassifications
    ORDER BY idJobClassification ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

//
// UPDATE Job Classifications
app.put('/api/updateJobClassifications', (req, res) =>{
    const jobTitle = req.body.jobTitle
    const jobDescription = req.body.jobDescription
    const idJobClassification = req.body.idJobClassification
    const sqlUpdate = `
    UPDATE JobClassifications
    SET     jobTitle = ?, jobDescription = ?
    WHERE idJobClassification = ?;
    `;
    db.query(sqlUpdate, [jobTitle, jobDescription, idJobClassification], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

//
// DELETE Job Classifications
app.delete('/api/deleteJobClassifications/:idJobClassification', (req, res) =>{
    const idJobClassification = req.params.idJobClassification
    const sqlDelete = `
    DELETE
    FROM JobClassifications
    WHERE idJobClassification = ?;
    `;
    db.query(sqlDelete, idJobClassification, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Employees Filtered by Job
app.post('/api/filterEmployeesByJob', (req, res) =>{
    const jobTitle = req.body.jobTitle
    const sqlRead = `
    SELECT  Employees.idEmployee, Employees.lastName, Employees.firstName, Employees.employeeUsername, JobClassifications.jobTitle, Employees.hourlyWage,
    Employees.employeePhone, Employees.employeeEmail, Employees.employeeRadio, Employees.employeeNote, Employees.employeePhoto
    FROM Employees
    JOIN JobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
    WHERE JobClassifications.jobTitle = ?
    ORDER BY idEmployee ASC;
    `;
    db.query(sqlRead, jobTitle, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});


///////////////////////////
// Employee Task Queries //
///////////////////////////

// READ - Select Employee Tasks
app.get('/api/getEmployeeTasks', (req, res) =>{
    const sqlRead = `
    SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
            TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
            Employees.employeeUsername
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

// READ - FILTER Employee Tasks by TaskName
app.post('/api/filterEmployeeTasksByTaskName', (req, res) =>{
    const taskName = req.body.taskName
    const sqlRead = `
    SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
            TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
            Employees.employeeUsername
    FROM EmployeeTasks
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
    LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
    WHERE TasksAssigned.taskName = ?
    ORDER BY EmployeeTasks.idEmployeeTask ASC;
    `;
    db.query(sqlRead, taskName, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ - FILTER Employee Tasks by Employee (username)
app.post('/api/filterEmployeeTasksByEmployee', (req, res) =>{
    const employeeUsername = req.body.employeeUsername
    const sqlRead = `
    SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
            TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
            Employees.employeeUsername
    FROM EmployeeTasks
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
    LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
    WHERE Employees.employeeUsername = ?
    ORDER BY EmployeeTasks.idEmployeeTask ASC;
    `;
    db.query(sqlRead, employeeUsername, (err, result)=> {
        console.log(result);
        res.send(result);
    });
});

// READ - FILTER Employee Tasks by Task + Employee (username)
app.post('/api/filterEmployeeTasksByTaskAndEmployee', (req, res) =>{
    const taskName = req.body.taskName
    const employeeUsername = req.body.employeeUsername
    const sqlRead = `
    SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
            TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
            Employees.employeeUsername
    FROM EmployeeTasks
    LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
    LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
    LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
    WHERE TasksAssigned.taskName = ? AND Employees.employeeUsername = ?
    ORDER BY EmployeeTasks.idEmployeeTask ASC;
    `;
    db.query(sqlRead, [taskName, employeeUsername], (err, result)=> {
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

//////////////////////////////
//  Tasks Assigned Queries  //
//////////////////////////////

// READ - Select Assigned Tasks
app.get('/api/getTasksAssigned', (req, res) => {
    const sqlRead = `
    SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
            TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd, BiologicalAssets.bioAssetName, Parks.parkName
    FROM TasksAssigned
    LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
    LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    ORDER BY TasksAssigned.idTaskAssigned ASC;
    `;
    db.query(sqlRead, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// FILTER by Open Tasks (no post needed)
app.get('/api/filterTasksAssignedByOpenTask', (req, res) => {
    const sqlRead = `
    SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
            TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd, BiologicalAssets.bioAssetName, Parks.parkName
    FROM TasksAssigned
    LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
    LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    WHERE TasksAssigned.TaskEnd IS NULL
    ORDER BY TasksAssigned.idTaskAssigned ASC;
    `;
    db.query(sqlRead, [], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// FILTER by Closed Tasks (no post needed)
app.get('/api/filterTasksAssignedByClosedTask', (req, res) => {
    const sqlRead = `
    SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
            TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd, BiologicalAssets.bioAssetName, Parks.parkName
    FROM TasksAssigned
    LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
    LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    WHERE TasksAssigned.TaskEnd IS NOT NULL
    ORDER BY TasksAssigned.idTaskAssigned ASC;
    `;
    db.query(sqlRead, [], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

//CREATE - Assigned Task Entry
app.post('/api/insertTasksAssigned', (req, res) => {
    const facilityName = req.body.facilityName
    const bioAssetName = req.body.bioAssetName
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
    db.query(sqlInsert, [facilityName, bioAssetName, taskName, taskDescription, taskStart, taskEnd], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// UPDATE Task Entry
app.put('/api/updateTasksAssigned', (req, res) =>{

    const facilityName = req.body.facilityName
    const bioAssetName = req.body.bioAssetName
    const taskName = req.body.taskName
    const taskDescription = req.body.taskDescription
    const taskStart = req.body.taskStart
    const taskEnd = req.body.taskEnd
    const idTaskAssigned = req.body.idTaskAssigned
    const sqlUpdate = `
    UPDATE TasksAssigned
    SET     idFacility =            (SELECT idFacility FROM Facilities WHERE facilityName = ?),
            idBiologicalAsset =     (SELECT idBiologicalAsset FROM BiologicalAssets WHERE bioAssetName = ?),
            taskname = ?, taskDescription = ?,
            taskStart = ?, taskEnd = ?
    WHERE idTaskAssigned = ?;
    `;
    db.query(sqlUpdate, [facilityName, bioAssetName, taskName, taskDescription, taskStart, taskEnd, idTaskAssigned], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// DELETE Assigned Task
app.delete('/api/deleteTasksAssigned/:idTaskAssigned', (req, res) =>{
    const idTaskAssigned = req.params.idTaskAssigned
    const sqlDelete = `
    DELETE
    FROM TasksAssigned
    WHERE idTaskAssigned = ?;
    `;
    db.query(sqlDelete, idTaskAssigned, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

/* To work on after CRUD complete
READ Tasks Assigned Filtered by Category
app.post('/api/filterTasksByCategory', (req, res) =>{
    const categoryName = req.body.categoryName
    const sqlRead = `
    SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
            TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd
    FROM TasksAssigned
    LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
    LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
    LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    WHERE TasksAssigned.categoryName = ?
    ORDER BY TasksAssigned.idTaskAssigned ASC;
    `;
    db.query(sqlRead, categoryName, (err, result)=> {
        console.log(result);
        res.send(result);
    });
}); */



//////////////////////////
//  Facilities Queries  //
//////////////////////////

// READ Facilities
app.get('/api/getFacilities', (req, res) =>{
    const sqlRead = `
    SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
            Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
            Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
    FROM Facilities
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
    LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
    ORDER BY idFacility ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Facilities BY PARK
app.post('/api/filterFacilitiesByPark', (req, res) =>{
    const parkName = req.body.parkName
    const sqlRead = `
    SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
            Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
            Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
    FROM Facilities
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
    LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
    WHERE Parks.parkName = ?
    ORDER BY idFacility ASC;
    `;
    db.query(sqlRead, parkName, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Facilities BY TYPE
app.post('/api/filterFacilitiesByType', (req, res) =>{
    const facTypeName = req.body.facTypeName
    const sqlRead = `
    SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
            Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
            Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
    FROM Facilities
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
    LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
    WHERE FacilityTypes.facTypeName = ?
    ORDER BY idFacility ASC;
    `;
    db.query(sqlRead, facTypeName, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Facilities BY TYPE AND PARK
app.post('/api/filterFacilitiesParkAndType', (req, res) =>{
    const facTypeName = req.body.facTypeName
    const parkName = req.body.parkName
    const sqlRead = `
    SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
            Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
            Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
    FROM Facilities
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
    LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
    WHERE FacilityTypes.facTypeName = ? AND Parks.parkName = ?
    ORDER BY idFacility ASC;
    `;
    db.query(sqlRead, [facTypeName, parkName], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Add Facility
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
                    (SELECT idHabitat FROM Habitats WHERE habitatName = ?), 
                    ?, ?, ?, ?, ?, ?
            );
    `;
    db.query(sqlInsert, [parkName, facTypeName, habitatName, facilityName, facilityDescription, facilityLocation, securityRating, facilityPhoto, facilityNote], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Update Facility
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Delete Facility
app.delete('/api/deleteFacilities/:idFacility', (req, res) =>{
    const idFacility = req.params.idFacility
    const sqlDelete = `
    DELETE
    FROM Facilities
    WHERE idFacility = ?;
    `;
    db.query(sqlDelete, idFacility, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});


////////////////////////////
// Facility Types QUERIES //
////////////////////////////

//
// CREATE Facility Type
app.post('/api/insertFacilityTypes', (req, res) =>{
    const facTypeName = req.body.facTypeName
    const facTypeDescription = req.body.facTypeDescription
    const sqlInsert = `
    INSERT INTO FacilityTypes       (facTypeName, facTypeDescription)
    VALUES                          (?, ?);
    `;
    db.query(sqlInsert, [facTypeName, facTypeDescription], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
})

// READ Facility Type (Table View)
app.get('/api/getFacilityTypes', (req, res) =>{
    const sqlRead = `
    SELECT * FROM FacilityTypes
    ORDER BY idFacilityType ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// UPDATE Facility Type
app.put('/api/updateFacilityTypes', (req, res) =>{
    const facTypeName = req.body.facTypeName
    const facTypeDescription = req.body.facTypeDescription
    const idFacilityType = req.body.idFacilityType
    const sqlUpdate = `
    UPDATE FacilityTypes
    SET     facTypeName = ?, facTypeDescription = ?
    WHERE idFacilityType = ?;
    `;
    db.query(sqlUpdate, [facTypeName, facTypeDescription, idFacilityType], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

//
// DELETE Facility Type
app.delete('/api/deleteFacilityTypes/:idFacilityType', (req, res) =>{
    const idFacilityType = req.params.idFacilityType
    const sqlDelete = `
    DELETE
    FROM FacilityTypes
    WHERE idFacilityType = ?;
    `;
    db.query(sqlDelete, idFacilityType, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});


//////////////////////////////
// Biological Asset Queries //
//////////////////////////////

// READ List All Assets
app.get('/api/getBiologicalAssets', (req, res) =>{
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Species.threatLevel, Species.speciesPhoto, Diets.dietName  
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    JOIN Diets ON Species.idDiet = Diets.idDiet
    ORDER BY idBiologicalAsset ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Habitat Alert
app.get('/api/checkBiologicalAssetsHabitats', (req, res) =>{
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, currentHab.habitatName AS currentHabitat, speciesHab.habitatName AS needsHabitat, Species.speciesPhoto
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    LEFT JOIN Habitats currentHab ON Facilities.idHabitat = currentHab.idHabitat
    JOIN Habitats speciesHab ON Species.idHabitat = speciesHab.idHabitat
    WHERE Species.idHabitat != Facilities.idHabitat OR Facilities.idHabitat IS NULL
    ORDER BY facilityName, speciesName, bioAssetName;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Security Alert
app.get('/api/checkBiologicalAssetsSecurity', (req, res) =>{
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Facilities.securityRating, Species.threatLevel, Species.threatLevel - Facilities.securityRating AS severity, Species.speciesPhoto
    FROM BiologicalAssets
    JOIN Species on BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Facilities on BiologicalAssets.idFacility = Facilities.idFacility
    WHERE Facilities.securityRating < Species.threatLevel
    ORDER BY severity, Facilities.facilityName, BiologicalAssets.bioAssetName;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Assets Filtered by Species
app.post('/api/filterBioAssetsBySpecies', (req, res) =>{
    const speciesName = req.body.speciesName
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Species.speciesPhoto, Diets.dietName
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Diets ON Species.idDiet = Diets.idDiet
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    WHERE Species.speciesName = ?
    ORDER BY idBiologicalAsset ASC;
    `;
    db.query(sqlRead, speciesName, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Assets Filtered by Facility
app.post('/api/filterBioAssetsByFacility', (req, res) =>{
    const facilityName = req.body.facilityName
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Species.speciesPhoto, Diets.dietName
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Diets ON Species.idDiet = Diets.idDiet
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    WHERE Facilities.facilityName = ?
    ORDER BY idBiologicalAsset ASC;
    `;
    db.query(sqlRead, facilityName, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// READ Assets Filtered by Species + Facility
app.post('/api/filterBioAssetsBySpeciesAndFacility', (req, res) =>{
    const speciesName = req.body.speciesName
    const facilityName = req.body.facilityName
    const sqlRead = `
    SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Species.speciesPhoto, Diets.dietName
    FROM BiologicalAssets
    JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    JOIN Diets ON Species.idDiet = Diets.idDiet
    JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
    WHERE Species.speciesName = ? AND Facilities.facilityName = ?
    ORDER BY idBiologicalAsset ASC;
    `;
    db.query(sqlRead, [speciesName, facilityName], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

//////////////////////////////
//     Species Queries      //
//////////////////////////////

// Read Species
app.get('/api/getSpecies', (req, res) => {
    const sqlRead = `
    SELECT Species.idSpecies, Species.speciesName, Diets.dietName, Habitats.habitatName, Species.speciesDescription,
       Species.threatLevel, Species.speciesPhoto
    FROM Species
    LEFT JOIN Diets ON Species.idDiet = Diets.idDiet
    LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
    ORDER BY idSpecies ASC;
    `;
    db.query(sqlRead, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Filter Species by Diet
app.post('/api/getSpeciesByDiet', (req, res) => {
    const dietName = req.body.dietName
    const sqlRead = `
    SELECT Species.idSpecies, Species.speciesName, Diets.dietName, Habitats.habitatName, Species.speciesDescription,
    Species.threatLevel, Species.speciesPhoto
    FROM Species
    LEFT JOIN Diets ON Species.idDiet = Diets.idDiet
    LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
    WHERE Diets.dietName = ?
    ORDER BY idSpecies ASC;
    `;
    db.query(sqlRead, [dietName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Filter by Species Habitat
app.post('/api/getSpeciesByHabitat', (req, res) => {
    const habitatName = req.body.habitatName
    const sqlRead = `
    SELECT Species.idSpecies, Species.speciesName, Diets.dietName, Habitats.habitatName, Species.speciesDescription,
    Species.threatLevel, Species.speciesPhoto
    FROM Species
    LEFT JOIN Diets ON Species.idDiet = Diets.idDiet
    LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
    WHERE Habitats.habitatName = ?
    ORDER BY idSpecies ASC;
    `;
    db.query(sqlRead, [habitatName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Filter by Species Both
app.post('/api/getSpeciesByDietAndHabitat', (req, res) => {
    const dietName = req.body.dietName
    const habitatName = req.body.habitatName
    const sqlRead = `
    SELECT Species.idSpecies, Species.speciesName, Diets.dietName, Habitats.habitatName, Species.speciesDescription,
       Species.threatLevel, Species.speciesPhoto
    FROM Species
    LEFT JOIN Diets ON Species.idDiet = Diets.idDiet
    LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
    WHERE Diets.dietName = ? AND Habitats.habitatName = ?
    ORDER BY idSpecies ASC;
    `;
    db.query(sqlRead, [dietName, habitatName], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Create Species
app.post('/api/insertSpecies', (req, res) => {
    const dietName = req.body.dietName
    const habitatName = req.body.habitatName
    const speciesName = req.body.speciesName
    const speciesDescription = req.body.speciesDescription
    const threatLevel = req.body.threatLevel
    const speciesPhoto = req.body.speciesPhoto
    const sqlInsert =`
    INSERT INTO Species             (idDiet, idHabitat, speciesName, speciesDescription, threatLevel, speciesPhoto)
    VALUES  (
                (SELECT idDiet FROM Diets WHERE dietName = ?), 
                (SELECT idHabitat FROM Habitats WHERE habitatName = ?), 
                ?, ?, ?, ?
            );
    `;
    db.query(sqlInsert, [dietName, habitatName, speciesName, speciesDescription, threatLevel, speciesPhoto], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Update Species
app.put('/api/updateSpecies', (req, res) => {
    const dietName = req.body.dietName
    const habitatName = req.body.habitatName
    const speciesName = req.body.speciesName
    const speciesDescription = req.body.speciesDescription
    const threatLevel = req.body.threatLevel
    const speciesPhoto = req.body.speciesPhoto
    const idSpecies = req.body.idSpecies
    const sqlUpdate = `
    UPDATE Species
    SET     idDiet =                (SELECT idDiet FROM Diets WHERE dietName = ?),
            idHabitat =             (SELECT idHabitat FROM Habitats WHERE habitatName = ?),
            speciesName = ?, speciesDescription = ?, threatLevel = ?, speciesPhoto = ?
    WHERE   idSpecies = ?;
    `;
    db.query(sqlUpdate, [dietName, habitatName, speciesName, speciesDescription, threatLevel, speciesPhoto, idSpecies], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Delete Species
app.delete('/api/deleteSpecies/:idSpecies', (req, res) => {
    const idSpecies = req.params.idSpecies
    const sqlDelete = `
    DELETE
    FROM Species
    WHERE idSpecies = ?;
    `;
    db.query(sqlDelete, idSpecies, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

//////////////////////
//  Diets QUERIES   //
//////////////////////

// Read Diets
app.get('/api/getDiets', (req,res) => {
    const sqlRead = `
    SELECT * FROM Diets
    ORDER BY idDiet ASC;
    `;
    db.query(sqlRead, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Create Diets
app.post('/api/insertDiets', (req, res) => {
    const dietName = req.body.dietName
    const dietDescription = req.body.dietDescription
    const dietIcon = req.body.dietIcon
    const sqlInsert = `
    INSERT INTO Diets               (dietName, dietDescription, dietIcon)
    VALUES  (?, ?, ?);
    `;
    db.query(sqlInsert, [dietName, dietDescription, dietIcon], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Update Diets
app.put('/api/updateDiets', (req, res) => {
    const dietName = req.body.dietName
    const dietDescription = req.body.dietDescription
    const dietIcon = req.body.dietIcon
    const idDiet = req.body.idDiet
    const sqlUpdate = `
    UPDATE Diets
    SET     dietName = ?, dietDescription = ?, dietIcon = ?
    WHERE idDiet = ?;
    `;
    db.query(sqlUpdate, [dietName, dietDescription, dietIcon, idDiet], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Delete Diets
app.delete('/api/deleteDiets/:idDiet', (req, res) => {
    const idDiet = req.params.idDiet
    const sqlDelete = `
    DELETE
    FROM Diets
    WHERE idDiet = ?;
    `;
    db.query(sqlDelete, idDiet, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});



//////////////////////
// Habitats QUERIES //
//////////////////////

// Read Habitats
app.get('/api/getHabitats', (req, res) =>{
    const sqlRead = `
    SELECT * FROM Habitats
    ORDER BY idHabitat ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Create Habitat
app.post('/api/insertHabitats', (req, res) =>{
    const habitatName = req.body.habitatName
    const habitatDescription = req.body.habitatDescription
    const habitatPhoto = req.body.habitatPhoto
    const sqlInsert = `
    INSERT INTO Habitats            (habitatName, habitatDescription, habitatPhoto)
    VALUES (
                                    ?, ?, ?
            );
    `;
    db.query(sqlInsert, [habitatName, habitatDescription, habitatPhoto], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Update Habitat
app.put('/api/updateHabitats', (req, res) =>{
    const habitatName = req.body.habitatName
    const habitatDescription = req.body.habitatDescription
    const habitatPhoto = req.body.habitatPhoto
    const idHabitat = req.body.idHabitat
    const sqlUpdate = `
    UPDATE Habitats
    SET     habitatName = ?, habitatDescription = ?, habitatPhoto = ?
    WHERE   idHabitat = ?;
    `;
    db.query(sqlUpdate, [habitatName, habitatDescription, habitatPhoto, idHabitat], (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Delete Habitat
app.delete('/api/deleteHabitats/:idHabitat', (req, res) =>{
    const idHabitat = req.params.idHabitat
    const sqlDelete = `
    DELETE
    FROM Habitats
    WHERE idHabitat = ?
    `;
    db.query(sqlDelete, idHabitat, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
})

// READ TASK CATEGORIES - Select
app.get('/api/getTaskCategories', (req, res) =>{
    const sqlRead = `
    SELECT * FROM TaskCategories
    ORDER BY idTaskCategory;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

////////////////////////
// SELECT LIST ROUTES //
////////////////////////

// Species Selector
app.get('/api/getSpeciesList', (req, res) =>{
    const sqlRead = `
    SELECT speciesName, threatLevel, habitatName
    FROM Species
    LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
    ORDER BY speciesName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Diets Selector
app.get('/api/getDietsList', (req, res) => {
    const sqlRead = `
    SELECT dietName
    FROM Diets
    ORDER BY dietName ASC;
    `;
    db.query(sqlRead, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Facility Selector
app.get('/api/getFacilitiesList', (req, res) =>{
    const sqlRead = `
    SELECT facilityName, securityRating, parkName, habitatName
    FROM Facilities
    LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
    LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
    ORDER BY parkName, facilityName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Assigned Task Selector (filters out completed tasks, which assume no more work needs to be assigned)
app.get('/api/getTasksAssignedList', (req, res) =>{
    const sqlRead = `
    SELECT taskName, taskStart
    FROM TasksAssigned
    WHERE taskEnd IS NULL
    ORDER BY taskName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Assigned Task Selector (returns everything)
app.get('/api/getFullTasksAssignedList', (req, res) =>{
    const sqlRead = `
    SELECT taskName, taskStart
    FROM TasksAssigned
    ORDER BY taskName ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Employee Selector (First/Last + Username) + Job
app.get('/api/getEmployeesList', (req, res) =>{
    const sqlRead = `
    SELECT lastName, firstName, employeeUsername, jobTitle
    FROM Employees
    JOIN JobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
    ORDER BY lastName, firstName, employeeUsername ASC;
    `;
    db.query(sqlRead, (err, result)=> {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
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
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});

// Biological Assets Selector
app.get('/api/getBiologicalAssetsList', (req, res) => {
    const sqlRead = `
    SELECT BiologicalAssets.bioAssetName, BiologicalAssets.idBiologicalAsset, Species.speciesName
    FROM BiologicalAssets
    LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
    ORDER BY bioAssetName ASC;
    `;
    db.query(sqlRead, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.sqlMessage)
        } else {
            console.log(result)
            res.send(result);
        };
    });
});


//////////////////
// Start Server //
//////////////////

app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
});
