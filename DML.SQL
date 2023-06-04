-- Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
-- : colon prefix used (for now) to denote variables that will be involved with back end data.


-- -----------------
-- Functional Queries to Populate Drop-downs, etc.
-- WARNING: May need to revisit if multi-column selects are too hard to use in drop-downs when we're using column1 only as the input
-- -----------------

-- Park Selector
SELECT parkName
FROM Parks
ORDER BY parkName ASC;

-- Facility Type Selector
SELECT facTypeName
FROM FacilityTypes
ORDER BY idFacilityType ASC;

-- Habitat Selector
SELECT habitatName
FROM Habitats
ORDER BY habitatName ASC;

-- Facilities Selector
SELECT facilityName, securityRating, parkName, habitatName
FROM Facilities
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
ORDER BY parkName, facilityName ASC;

-- Diets Selector
SELECT dietName
FROM Diets
ORDER BY dietName ASC;

-- Species Selector
SELECT speciesName, threatLevel, habitatName
FROM Species
LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
ORDER BY speciesName ASC;

-- Biological Assets Selector (Bio Asset -> Species JOIN needed)
SELECT bioAssetName, speciesName
FROM BiologicalAssets
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
ORDER BY speciesName, bioAssetName ASC;

-- Job Classifications Selector
SELECT jobTitle
FROM JobClassifications
ORDER BY jobTitle ASC;

-- Assigned Task Selector (Only returns stuff that isn't finished yet - finished definition includes the paperwork to log all hours to it)
SELECT taskName, taskStart
FROM TasksAssigned
WHERE taskEnd IS NULL
ORDER BY taskName ASC;

-- Employees Selector
SELECT lastName, firstName, employeeUsername, jobTitle
FROM Employees
JOIN jobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
ORDER BY lastName, firstName, employeeUser

-- Task Categories Selector
SELECT categoryName
FROM TaskCategories
ORDER BY categoryName ASC;

-- Image Selector will be populated by a JS script based on images available on the server, ideally.


-- -----------------
-- READS: SUMMARY QUERIES TO POPULATE PAGE TABLES
-- -----------------

-- SELECT Parks
SELECT * FROM Parks
ORDER BY idPark ASC;

-- SELECT Facility Types
SELECT * FROM FacilityTypes
ORDER BY idFacilityType ASC;

-- SELECT Habitats
SELECT * FROM Habitats
ORDER BY idHabitat ASC;

-- SELECT Facilities
SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
        Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
FROM Facilities
-- Need to join Facilities -> Parks -> FacilityTypes -> Habitats
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
ORDER BY idFacility ASC;

-- SELECT Diets
SELECT * FROM Diets
ORDER BY idDiet ASC;

-- SELECT Species
SELECT Species.idSpecies, Species.speciesName, Diets.dietName, Habitats.habitatName, Species.speciesDescription,
       Species.threatLevel, Species.speciesPhoto
FROM Species
-- Need to join Species -> Diets -> Habitats
LEFT JOIN Diets ON Species.idDiet = Diets.idDiet
LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
ORDER BY idSpecies ASC; 

-- SELECT BiologicalAssets
SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Species.speciesPhoto
FROM BiologicalAssets
-- Need to join Species -> BiologicalAssets -> Facilities
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
ORDER BY idBiologicalAsset ASC;

-- SELECT JobClassifications
SELECT * FROM JobClassifications
ORDER BY idJobClassification ASC;

-- SELECT Employees
SELECT  Employees.idEmployee, Employees.lastName, Employees.firstName, Employees.employeeUsername, JobClassifications.jobTitle, Employees.hourlyWage,
        Employees.employeePhone, Employees.employeeEmail, Employees.employeeRadio, Employees.employeeNote, Employees.employeePhoto
FROM Employees
-- Need to join Employees -> JobClassifications
LEFT JOIN JobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
ORDER BY idEmployee ASC;

-- SELECT TasksAssigned (Bio Asset ID'd by displaying actual asset ID# and Species, since may not have a bioAssetName)
SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
        TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd, BiologicalAssets.bioAssetName
FROM TasksAssigned
-- Need to join TasksAssigned -> Facility -> Bio Asset -> Species
LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
ORDER BY TasksAssigned.idTaskAssigned ASC;

-- SELECT EmployeeTasks
SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
        TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
        Employees.employeeUsername
FROM EmployeeTasks
-- Need to JOIN EmployeeTasks -> TasksAssigned -> Employees -> Task Category
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
ORDER BY EmployeeTasks.idEmployeeTask ASC;

-- SELECT Task Categories
SELECT * from TaskCategories
ORDER BY idTaskCategory ASC;


-- ----------------
-- CREATES: "ADD NEW" SQL SCRIPTS - Use :browser_inputs to get data for insert queries
-- ----------------

-- Add new Park to the system
INSERT INTO Parks                 (parkName, parkDescription, parkLocation, parkPhoto)
VALUES  (
                :parkName_input, :parkDescription_input, :parkLocation_input, :parkPhoto_input
        );

-- Add a new facility using populated dropdowns of easier to ID unique names for input values
INSERT INTO Facilities              (idPark, idFacilityType, idHabitat, facilityName, facilityDescription, 
                                    facilityLocation, securityRating, facilityPhoto, facilityNote)
VALUES  (       
                (SELECT idPark FROM Parks WHERE parkName = :parkName_input), 
                (SELECT idFacilityType FROM FacilityTypes WHERE facTypeName = :facTypeName_input), 
                (SELECT idHabitat FROM Habitats WHERE habitatName = :habitatName_input), 
                :facilityName_input, :facilityDescription_input, :facilityLocation_input, 
                :securityRating_input, :facilityPhoto_input, :facilityNote_input
        );

-- Add a new facility type
INSERT INTO FacilityTypes       (facTypeName, facTypeDescription)
VALUES  (:facTypeName_input, :facTypeDescription_input);

-- User adds a TaskAssigned (BiologicalAsset optional)
INSERT INTO TasksAssigned       (idFacility, idBiologicalAsset, taskName, taskDescription, taskStart, taskEnd)
VALUES  (       
                (SELECT idFacility FROM Facilities WHERE facilityName = :facilityName_input),
                (SELECT idBiologicalAsset FROM BiologicalAssets WHERE bioAssetName = :bioAssetName_input), 
                :taskName_input, :taskDescription_input, :taskStart_input, :taskEnd_input
        );

-- Creates record of employee's work on a task by referencing the issued task# and the employee's unique username
INSERT INTO EmployeeTasks       (idTaskAssigned, idEmployee, idTaskCategory, taskHoursWorked, empTaskCost, empTaskStart, empTaskEnd)
VALUES  (
                (SELECT idTaskAssigned FROM TasksAssigned WHERE taskName = :taskName_input),
                (SELECT idEmployee FROM Employees WHERE employeeUsername = :employeeUsername_input),
                (SELECT idTaskCategory FROM TaskCategories WHERE categoryName = :categoryName_input),
                :taskHoursWorked_input, :empTaskCost_input, :empTaskStart_input, :empTaskEnd_input
        );

-- User selects job name from drop-down and a subquery gets the jobID from it so that the insert can be done properly
INSERT INTO Employees           (idJobClassification, firstName, lastName, employeeUsername, hourlyWage, employeePhone, employeeEmail,
                                employeeRadio, employeeNote, employeePhoto)
VALUES  (
                (SELECT idJobClassification FROM JobClassifications WHERE jobTitle = :jobTitle_input), 
                :firstName_input, :lastName_input, :employeeUsername_input, :hourlyWage_input, :employeePhone_input,
                :employeeEmail_input, :employeeRadio_input, :employeeNote_input, :employeePhoto_input
        );

-- Add a new job
INSERT INTO JobClassifications  (jobTitle, jobDescription)
VALUES  (
                :jobTitle_input, :jobDescription_input
        );

-- Add a new habitat
INSERT INTO Habitats            (habitatName, habitatDescription, habitatPhoto)
VALUES (
                :habitatName_input, :habitatDescription_input, :habitatPhoto_input
        );

-- Add a new biological asset
INSERT INTO BiologicalAssets    (idSpecies, idFacility, bioAssetName)
VALUES (
                (SELECT idSpecies FROM Species WHERE speciesName = :speciesName_input),
                (SELECT idFacility FROM Facilities WHERE facilityName = :facilityName_input),
                :bioAssetName_input
        );

-- Add a new species, using informal name selects to get ID's for the diet and habitat
INSERT INTO Species             (idDiet, idHabitat, speciesName, speciesDescription, threatLevel, speciesPhoto)
VALUES  (
                (SELECT idDiet FROM Diets WHERE dietName = :dietName_input), 
                (SELECT idHabitat FROM Habitat WHERE habitatName = :habitatName_input), 
                :speciesName_input, :speciesDescription_input, :threatLevel_input, :speciesPhoto_input
        );

-- Add a new diet
INSERT INTO Diets               (dietName, dietDescription, dietIcon)
VALUES  (
                :dietName_input, :dietDescription_input, :dietIcon_input
        );

-- Add a new Task Category
INSERT INTO TaskCategories      (categoryName)
VALUES  (
                :categoryName_input
        );


-- ----------------
-- Updates: ID values should be retrievable from the select used to populate the update form for the WHERE value.
-- ----------------

-- Update Park
UPDATE Parks
SET     parkName = :parkName_input, parkDescription = :parkDescription_input, parkLocation = :parkLocation_input, parkPhoto = :parkPhoto_input
WHERE idPark = :idPark_input;

-- Update Facility Type
UPDATE FacilityTypes
SET     facTypeName = :facTypeName_input, facTypeDescription = :facTypeDescription_input
WHERE idFacilityType = :idFacilityType_input;

-- Facilities
UPDATE Facilities
SET     idPark =                (SELECT idPark FROM Parks WHERE parkName = :parkName_input),
        idFacilityType =        (SELECT idFacilityType FROM FacilityTypes WHERE facTypeName = :facTypeName_input),
        idHabitat =             (SELECT idHabitat FROM Habitats WHERE habitatName = :habitatName_input),
        facilityName = :facilityName_input, facilityDescription = :facilityDescription_input, facilityLocation = :facilityLocation_input, 
        securityRating = :securityRating_input, facilityPhoto = :facilityPhoto_input, facilityNote = :facilityNote_input
WHERE idFacility = :idFacility_input;

-- Update an Assigned Task (NULLable example - idBiologicalAsset can be set to NULL)
UPDATE TasksAssigned
SET     idFacility =            (SELECT idFacility FROM Facilities WHERE facilityName = :facilityName_input), 
        idBiologicalAsset =     (SELECT idBiologicalAsset FROM BiologicalAssets WHERE bioAssetName = :bioAssetName_input), 
        taskDescription = :taskDescription_input, taskStart = :taskStart_input, taskEnd = :taskEnd_input
WHERE idTaskAssigned = :idTaskAssigned;

-- Employee
UPDATE Employees
SET     idJobClassification =   (SELECT idJobClassification FROM JobClassifications WHERE jobTitle = :jobTitle_input),
        firstName = :firstName_input, lastName = :lastName_input, employeeUsername = :employeeUsername_input, hourlyWage = :hourlyWage_input,
        employeePhone = :employeePhone_input, employeeEmail = :employeeEmail_input, employeeRadio = :employeeRadio_input, 
        employeeNote = :employeeNote_input, employeePhoto = :employeePhoto_input
WHERE idEmployee = :idEmployee_input;

-- Update an Employee Task (if needed to re-assign orphaned FK's if/when parents are deleted)
UPDATE EmployeeTasks
SET     idEmployee =            (SELECT idEmployee FROM Employees WHERE employeeUsername = :employeeUsername_input),
        idTaskCategory =        (SELECT idTaskCategory FROM TaskCategories WHERE categoryName = :categoryName_input),
        idTaskAssigned =        (SELECT idTaskAssigned FROM TasksAssigned WHERE taskName = :taskName_input),
        taskHoursWorked = :taskHoursWorked_input, empTaskCost = :empTaskCost_input, 
        empTaskStart = :empTaskStart_input, empTaskEnd = :empTaskEnd_input
WHERE idEmployeeTask = :idEmployeeTask_input;

-- Job Classifications
UPDATE JobClassifications
SET     jobTitle = :jobTitle_input, jobDescription = :jobDescription_input
WHERE idJobClassification = :idJobClassification_input;

-- Task Category
UPDATE TaskCategories
SET     categoryName = :categoryName_input
WHERE idTaskCategory = :idTaskCategory_input;

-- Biological Asset
UPDATE BiologicalAssets
SET     idSpecies =             (SELECT idSpecies FROM Species WHERE speciesName = :speciesName_input),
        idFacility =            (SELECT idFacility FROM Facilities WHERE facilityName = :facilityName_input),
        bioAssetName = :bioAssetName_input
WHERE   idBiologicalAsset = :idBiologicalAsset_input;

-- Habitat
UPDATE Habitats
SET     habitatName = :habitatName_input, habitatDescription = :habitatDescription_input, habitatPhoto = :habitatPhoto_input
WHERE   idHabitat = :idHabitat_input;

-- Diet
UPDATE Diets
SET     dietName = :dietName_input, dietDescription = :dietDescription_input, dietIcon = :dietIcon_input
WHERE idDiet = :idDiet_input;

-- Species
UPDATE Species
SET     idDiet =                (SELECT idDiet FROM Diets WHERE dietName = :dietName_input),
        idHabitat =             (SELECT idHabitat FROM Habitats WHERE habitatName = :habitatName_input),
        speciesName = :speciesName_input, speciesDescription = :speciesDescription_input, 
        threatLevel = :threatLevel_input, speciesPhoto = :speciesPhoto_input
WHERE   idSpecies = :idSpecies_input;


-- ----------------
-- DELETES
-- ----------------

-- Delete Park
DELETE
FROM Parks
WHERE idPark = :idPark_input;

-- Delete Facility Type
DELETE
FROM FacilityTypes
WHERE idFacilityType = :idFacilityType_input;

-- Delete Facility
DELETE
FROM Facilities
WHERE idFacility = :idFacility_input;

-- Delete TaskAssigned
DELETE
FROM TasksAssigned
WHERE idTaskAssigned = :idTaskAssigned_input;

-- Delete Employee
DELETE
FROM Employees
WHERE idEmployee = :idEmployee_input;

-- Delete Employee Task
DELETE
FROM EmployeeTasks
WHERE idEmployeeTask = :idEmployeeTask_input;

-- Delete Job Classification
DELETE
FROM JobClassifications
WHERE idJobClassification = :idJobClassification_input;

-- Delete Task Category
DELETE
FROM TaskCategories
WHERE idTaskCategory = :idTaskCategory_input;

-- Delete Biological Asset
DELETE
FROM BiologicalAssets
WHERE idBiologicalAsset = :idBiologicalAsset_input;

-- Delete Habitat
DELETE
FROM Habitats
WHERE idHabitat = :idHabitat_input

-- Delete Diet
DELETE
FROM Diets
WHERE idDiet = :idDiet_input

-- Delete Species
DELETE
FROM Species
WHERE idSpecies = :idSpecies_input


-- ----------------
-- CUSTOM Reports
-- ----------------

-- SELECT - Cost Analysis Report by Task Category
SELECT  TaskCategories.categoryName, SUM(EmployeeTasks.empTaskCost) AS taskTypeCost
FROM TaskCategories
-- Need to JOIN TaskCategories -> EmployeeTasks
LEFT JOIN EmployeeTasks ON TaskCategories.idTaskCategory = EmployeeTasks.idTaskCategory
GROUP BY TaskCategories.categoryName
ORDER BY TaskTypeCost DESC;

-- SELECT - Cost Analysis Report by Park
SELECT  Parks.parkName, SUM(EmployeeTasks.empTaskCost) AS parkCost
FROM Parks
-- Need to JOIN TaskCategories -> EmployeeTasks -> TasksAssigned -> Facilities -> Parks
LEFT JOIN Facilities ON Parks.idPark = Facilities.idPark
LEFT JOIN TasksAssigned ON Facilities.idFacility = TasksAssigned.idFacility
GROUP BY Parks.parkName
ORDER BY ParkCost DESC;

-- SELECT biological assets in a non-ideal habitat (for use in summary report to quickly flag down inappropriate assignments)
SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, currentHab.habitatName AS currentHabitat, speciesHab.habitatName AS needsHabitat, Species.speciesPhoto
FROM BiologicalAssets
-- Need to JOIN BioAssets -> Species -> Facilities
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
LEFT JOIN Habitats currentHab ON Facilities.idHabitat = currentHab.idHabitat
JOIN Habitats speciesHab ON Species.idHabitat = speciesHab.idHabitat
WHERE Species.idHabitat != Facilities.idHabitat OR Facilities.idHabitat IS NULL
ORDER BY facilityName, speciesName, bioAssetName;

-- SELECT biological assets that are not adequately secured (and indicates how bad it is with a severity rating from 1-9)
SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Facilities.securityRating, Species.threatLevel, Species.threatLevel - Facilities.securityRating AS severity, Species.speciesPhoto
FROM BiologicalAssets
-- Need to JOIN BioAssets -> Species -> Facilities
JOIN Species on BiologicalAssets.idSpecies = Species.idSpecies
JOIN Facilities on BiologicalAssets.idFacility = Facilities.idFacility
WHERE Facilities.securityRating < Species.threatLevel
ORDER BY severity, facilities.facilityName, BiologicalAssets.bioAssetName;

-- FILTER BiologicalAssets by Species
SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName, Species.speciesPhoto
FROM BiologicalAssets
-- Need to join Species -> BiologicalAssets -> Facilities
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
WHERE Species.speciesName = :speciesName_input
ORDER BY idBiologicalAsset ASC;

-- FILTER Employee Tasks by Task Name
SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
        TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
        Employees.employeeUsername
FROM EmployeeTasks
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
WHERE TasksAssigned.taskName = :taskName_input
ORDER BY EmployeeTasks.idEmployeeTask ASC;

-- FILTER Employee by Job Title
SELECT  Employees.idEmployee, Employees.lastName, Employees.firstName, Employees.employeeUsername, JobClassifications.jobTitle, Employees.hourlyWage,
Employees.employeePhone, Employees.employeeEmail, Employees.employeeRadio, Employees.employeeNote, Employees.employeePhoto
FROM Employees
JOIN JobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
WHERE JobClassifications.jobTitle = :jobTitle_input
ORDER BY idEmployee ASC;


-- -------------
-- OPTIONAL Queries (May or may not be needed)
-- -------------

-- SEARCH / Select Query - Lists facilities that have an an appropriate habitat and security rating for a given species (i.e. adequate enclosures)
SELECT Facilities.facilityName
FROM Facilities
-- Need to JOIN Facilities -> Habitats -> Species -> BiologicalAssets
JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
JOIN Species ON Habitats.idHabitat = Species.idHabitat
AND Species.idSpecies = (SELECT idSpecies FROM Species WHERE speciesName = :speciesName_input)
WHERE Facilities.idHabitat = Species.idHabitat AND Facilities.securityRating >= Species.threatLevel
ORDER BY Facilities.facilityName ASC;

-- SEARCH / Select Query - Cost Analysis for a Specific Input Park
SELECT  TaskCategories.categoryName, SUM(EmployeeTasks.empTaskCost) AS taskTypeCost
FROM TaskCategories
-- Need to JOIN TaskCategories -> EmployeeTasks -> TasksAssigned -> Facilities -> Parks
LEFT JOIN EmployeeTasks ON TaskCategories.idTaskCategory = EmployeeTasks.idTaskCategory
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark 
AND Parks.idPark = (SELECT idPark FROM Parks WHERE parkName = :parkName_input)
GROUP BY TaskCategories.categoryName
ORDER BY TaskTypeCost DESC;

-- [Potentially Deprecated] SEARCH / Select Query - List facilities suitable for a specific biological asset (habitat and security wise)
SELECT Facilities.facilityName
FROM Facilities
-- Need to JOIN Facilities -> Habitats -> Species -> BiologicalAssets
JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
JOIN Species ON Habitats.idHabitat = Species.idHabitat
JOIN BiologicalAssets ON Species.idSpecies = BiologicalAssets.idSpecies 
AND BiologicalAssets.idBiologicalAsset = (SELECT idBiologicalAsset FROM BiologicalAssets WHERE bioAssetName = :bioAssetName_input)
WHERE Facilities.idHabitat = Species.idHabitat AND Facilities.securityRating >= Species.threatLevel
ORDER BY Facilities.facilityName ASC;

-- --------
-- Additional Custom Filters and Lookups (added 5/28/23)
-- --------

-- New Filters and Lookup Queries

-- FILTER EmployeeTasks by Category (SELECT)
SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
        TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
        Employees.employeeUsername
FROM EmployeeTasks
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
WHERE TaskCategories.categoryName = :categoryName_input
ORDER BY EmployeeTasks.idEmployeeTask ASC;

-- LOOKUP EmployeeTask BY USERNAME (employee select menu) (SELECT)
SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskName, (SELECT CONCAT(Employees.firstName, ' ', Employees.lastName)) AS contributingEmployee,
        TaskCategories.categoryName, EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd,
        Employees.employeeUsername
FROM EmployeeTasks
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
LEFT JOIN TaskCategories ON EmployeeTasks.idTaskCategory = TaskCategories.idTaskCategory
LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
WHERE Employees.employeeUsername = :employeeUsername_input
ORDER BY EmployeeTasks.idEmployeeTask ASC;

-- FILTER TasksAssigned - OPEN TASKS (BINARY SELECT)
SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
        TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd, BiologicalAssets.bioAssetName, Parks.parkName
FROM TasksAssigned
LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
WHERE TasksAssigned.taskEnd IS NULL
ORDER BY TasksAssigned.idTaskAssigned ASC;

-- FILTER TasksAssigned - CLOSED TASKS (BINARY SELECT)
SELECT  TasksAssigned.idTaskAssigned, TasksAssigned.taskName, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
        TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd, BiologicalAssets.bioAssetName, Parks.parkName
FROM TasksAssigned
LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
WHERE TasksAssigned.taskEnd IS NOT NULL
ORDER BY TasksAssigned.idTaskAssigned ASC;

-- LOOKUP Employees by Last Name (INPUT)
SELECT  Employees.idEmployee, Employees.lastName, Employees.firstName, Employees.employeeUsername, JobClassifications.jobTitle, Employees.hourlyWage,
Employees.employeePhone, Employees.employeeEmail, Employees.employeeRadio, Employees.employeeNote, Employees.employeePhoto
FROM Employees
JOIN JobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
WHERE lastName = :lastName_input
ORDER BY idEmployee ASC;

-- FILTER Facilities by Park Name (SELECT)
SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
        Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
FROM Facilities
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
WHERE Parks.parkName = :parkName_input
ORDER BY idFacility ASC;

-- FILTER Facilities by TYPE (SELECT)
SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
        Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
FROM Facilities
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
WHERE FacilityTypes.facTypeName = :facTypeName_input
ORDER BY idFacility ASC;

-- FILTER Facilities - Non-enclosures (BINARY SELECT))
SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
        Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
FROM Facilities
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
WHERE Habitats.habitatName IS NULL
ORDER BY idFacility ASC;

-- FILTER Facilities - Enclosures Only (BINARY SELECT)
SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
        Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
FROM Facilities
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
WHERE Habitats.habitatName IS NOT NULL
ORDER BY idFacility ASC;

-- FILTER Species by Diet (SELECT)
SELECT Species.idSpecies, Species.speciesName, Diets.dietName, Habitats.habitatName, Species.speciesDescription,
Species.threatLevel, Species.speciesPhoto
FROM Species
LEFT JOIN Diets ON Species.idDiet = Diets.idDiet
LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
WHERE Diets.dietName = :dietName_input
ORDER BY idSpecies ASC;

-- FILTER Species by Habitats (SELECT)
SELECT Species.idSpecies, Species.speciesName, Diets.dietName, Habitats.habitatName, Species.speciesDescription,
Species.threatLevel, Species.speciesPhoto
FROM Species
LEFT JOIN Diets ON Species.idDiet = Diets.idDiet
LEFT JOIN Habitats ON Species.idHabitat = Habitats.idHabitat
WHERE Habitats.habitatName = :habitatName_input
ORDER BY idSpecies ASC;

-- FILTER Biological Assets by Facility (SELECT)
SELECT BiologicalAssets.idBiologicalAsset, BiologicalAssets.bioAssetName, Species.speciesName, Facilities.facilityName
FROM BiologicalAssets
LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
LEFT JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
WHERE Facilities.facilityName = :facilityName_input AND Facilities.idHabitat IS NULL
ORDER BY idBiologicalAsset ASC;

-- (Optional) POPULATE SELECT MENU FOR FACILITIES WITH ENCLOSURES (Habitats) - Designed to work with the above (Optional)
SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
        Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote, Parks.parkLocation
FROM Facilities
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
LEFT JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
LEFT JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
WHERE Habitats.idHabitat IS NOT NULL
ORDER BY idFacility ASC;

-- New Cost Reports for Home Page

-- SELECT - Cost Analysis Report by Employee
SELECT  Employees.lastName, Employees.firstName, Employees.employeeUsername, SUM(EmployeeTasks.empTaskCost) AS employeeCost
FROM EmployeeTasks
LEFT JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
GROUP BY Employees.employeeUsername
ORDER BY employeeCost DESC;

-- SELECT - Cost Analysis Report by Tasks
SELECT  TasksAssigned.taskName, SUM(EmployeeTasks.empTaskCost) AS taskCost
FROM EmployeeTasks
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
GROUP BY TasksAssigned.taskName
ORDER BY taskCost DESC;

-- Cost Analysis by Facility
SELECT  Facilities.facilityName, Parks.parkName, SUM(EmployeeTasks.empTaskCost) AS facilityCost
FROM EmployeeTasks
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
GROUP BY Facilities.facilityName
ORDER BY facilityCost DESC;

-- Cost Analysis by Biological Asset
SELECT  BiologicalAssets.bioAssetName, Species.speciesName, Parks.parkName, SUM(EmployeeTasks.empTaskCost) AS assetCost
FROM EmployeeTasks
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
LEFT JOIN Facilities ON BiologicalAssets.idFacility = Facilities.idFacility
LEFT JOIN Parks ON Facilities.idPark = Parks.idPark
GROUP BY BiologicalAssets.bioAssetName
ORDER BY assetCost DESC;




-- ----------------
-- Required Subqueries - For Easy Copy/Pasting as needed in larger queries

-- ID from name is needed for inputs to add or update entities.

-- Name from ID is used to populate update-form values and summary tables
-- (so they can use/show unique names instead of gibberish ID numbers).

-- THESE ARE SUBQUERIES ONLY - DO NOT RUN THESE IN A BATCH WITH THE REST OF THIS SCRIPT
-- ----------------

-- Get ParkID from name and vice versa
(SELECT idPark FROM Parks WHERE parkName = :parkName_input)
(SELECT parkName FROM Parks WHERE idPark = :idPark_input)

-- Get FacilityTypes id from name and vice versa
(SELECT idFacilityType FROM FacilityTypes WHERE facTypeName = :facTypeName_input)
(SELECT facTypeName FROM FacilityTypes WHERE idFacilityType = :idFacilityType_input)

-- Get Facility ID from name and vice versa
(SELECT idFacility FROM Facilities WHERE facilityName = :facilityName_input)
(SELECT facilityName FROM Facilities WHERE idFacility = :idFacility_input)

-- Get Bio Assets ID from bioAssetName and vice versa
(SELECT idBiologicalAsset FROM BiologicalAssets WHERE bioAssetName = :bioAssetName_input)
(SELECT bioAssetName FROM BiologicalAssets WHERE idBiologicalAsset = :idBiologicalAsset_input)

-- Get TaskAssignedID from task name and vice versa
(SELECT idTaskAssigned FROM TasksAssigned WHERE taskName = :taskName_input)
(SELECT taskName FROM TasksAssigned WHERE idTaskAssigned = :idTask_input)

-- Get HabitatID from name and vice versa
(SELECT idHabitat FROM Habitat WHERE habitatName = :habitatName_input)
(SELECT habitatName FROM Habitat WHERE idHabitat = :idHabitat_input)

-- Get DietID from diet name and vice versa
(SELECT idDiet FROM Diets WHERE dietName = :dietName_input)
(SELECT dietName FROM Diets WHERE idDiet = :idDiet_input)

-- Get SpeciesID from species name and vice versa
(SELECT idSpecies from Species WHERE speciesName = :speciesName_input)
(SELECT idSpecies from Species WHERE speciesName = :speciesName_input)

-- Get employeeID from username and vice versa
(SELECT idEmployee FROM Employees WHERE employeeUsername = :employeeUsername_input)
(SELECT employeeUsername FROM Employees WHERE idEmployee = :idEmployee_input)

-- Get jobID from title and vice versa
(SELECT idJobClassification FROM JobClassifications WHERE jobTitle = :jobTitle_input)
(SELECT jobTitle FROM JobClassifications WHERE idJobClassification = :idJobClassification_input)

-- Get Task Category from name from ID and vice versa
(SELECT idTaskCategory FROM TaskCategories WHERE categoryName = :categoryName_input)
(SELECT categoryName FROM TaskCategories WHERE idTaskCategory = :idTaskCategory_input)