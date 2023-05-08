-- Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
-- : colon prefix used (for now) to denote variables that will be involved with back end data. 

-- Requirements Info from Project Outline:
-- ---------------------------------------
-- **It should be possible to INSERT entries into every table individually.

-- **Every table should be used in at least one SELECT query. 
--  For the SELECT queries, it is fine to just display the content of the tables. 
--  It is generally not appropriate to have only a single query that joins all tables and displays them.

-- **You need to include one DELETE and one UPDATE function in your website, for any one of the entities. 
--  In addition, it should be possible to add and remove things from at least one many-to-many relationship and it should be possible to add things to all relationships. 
--  This means you need SELECT & INSERT functionalities for all relationships as well as entities. 
--  And DELETE & UPDATE for least one m:m relationship.

-- **Note that it's not acceptable to require the user to enter IDs for foreign keys.** ... We're gonna have to do something stupid like use a unique name to ID a task, aren't we?

--  Instead your website needs to use a dynamically populated drop-down list or have the ability to search using text instead of entering in the ID. 
--  This Dynamic drop-down/Search functionality should be present for at least one entity. 

-- **In one relationship, you should be able to set the foreign key value to NULL using UPDATE, that removes the relationship. 
--  In case none of the one-to-many relationships in your database has optional participation, you would need to change that to make sure one can have NULL values. 
--  For example, in the table Orders, there may be two FKs: the employeeID and the customerID which create relations to the Employees and Customers tables. 
--  It may not be sensible for the Customer to be optional. But the Employees could be optional. 
--  Thus, we would expect that in the Orders INSERT and UPDATE pages it is possible to set the employeeID to a value or else to NULL. 

-- **You should be able to DELETE a record from a M:M relationship without creating a data anomaly in the related tables. 
--  For example, DELETEing a Customer should handle any Orders that were made by the Customer. 
--  This can be done by either by setting the CustomerID to NULL, or else by DELETEing any Order(s) associated with that Customer. 
--  More on how this can be done in Week 5 when we cover MySQL CASCADE.

-- **To continue the example from above, if you have 5 tables in your schema, then at a minimum, we expect you to implement:
--  5 SELECTs, 5 INSERTs, 1 UPDATE (1 NULLable relationship), 1 DELETE (M:M), and 1 Dynamic drop-down/Search for a total of 14 functions.


-- TODO: 
--      Menu Selectors: Done (may need to revise when we see them in action / depending on how the queries work with JS/React)
--      Select:         Species, BioAssets, TaskCategories
--      Add:            Habitat, BioAssets, TaskCategories
--      Update:         Everything except Parks
--      Delete:         Everything except TasksAssigned
--      Custom:         EmployeeTasks lookup for an employee, TaskAssigned Lookup for a facility sorted by date
--                      Select populators for looking up tasks that have or haven't ended?

-- Change: Made Nickname for bio assets NOT null instead of nullable since this is (currently) selecting for assets in queries based on nicknames.
--              May reverts this if we figure a way to get them without it / can make nickname non-unique in that case.

-- -----------------
-- Functional Queries to Populate Drop-downs, etc.
-- -----------------

-- Park Selector
SELECT idPark, parkName
FROM Parks
ORDER BY parkName ASC;

-- Facility Type Selector
SELECT idFacilityType, facTypeName
FROM FacilityTypes
ORDER BY idFacilityType ASC;

-- Habitat Selector
SELECT idHabitat, habitatName
FROM Habitats
ORDER BY habitatName ASC;

-- Facilities Selector
SELECT idFacility, facilityName
FROM Facilities
ORDER BY facilityName ASC;

-- Diets Selector
SELECT idDiet, dietName
FROM Diets
ORDER BY dietName ASC;

-- Species Selector
SELECT idSpecies, speciesName
FROM Species
ORDER BY speciesName ASC;

-- Biological Assets Selector (Bio Asset -> Species JOIN needed)
SELECT idBiologicalAsset, speciesName, nickname
FROM BiologicalAssets
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
ORDER BY speciesName;

-- Job Classifications Selector
SELECT idJobClassification, jobTitle
FROM JobClassifications
ORDER BY jobTitle ASC;

-- Employees Selector
SELECT idEmployee, lastName, firstName
FROM Employees
ORDER BY lastName ASC;

-- Task Categories Selector
SELECT idTaskCategory, categoryName
FROM TaskCategories
ORDER BY categoryName ASC;

-- Question/Note: It may make more sense to do TasksAssigned and EmployeeTasks as direct inputs where we assume staff responsible have knowledge of
-- the relevant task ID's, vs. a drop down (because these are gonna get unweildingly large pretty fast)

-- ----------------
-- Required Subqueries - For Easy Copy/Pasting as needed in larger queries
-- ID from name is needed for inputs to add or update entities.
-- Name from ID is used to populate update-form values and summary tables.
-- ----------------


-- Get ParkID from name and vice versa
(SELECT idPark FROM Parks WHERE parkName = :parkName_input)
(SELECT parkName FROM Parks WHERE idPark = :idPark_input)

-- FacilityTypes id from name and vice versa
(SELECT idFacilityType FROM FacilityTypes WHERE facTypeName = :facTypeName_input)
(SELECT facTypeName FROM FacilityTypes WHERE idFacilityType = :idFacilityType_input)

-- Facility ID from name and vice versa
(SELECT idFacility FROM Facilities WHERE facilityName = :facilityName_input)
(SELECT facilityName FROM Facilities WHERE idFacility = :idFacility_input)

-- Bio Assets ID from nickname and vice versa (possibly temp. - unless we want to think of a different way to select them that's unique?)
(SELECT idBiologicalAsset FROM BiologicalAssets WHERE nickname = :nickname_input)
(SELECT nickname FROM BiologicalAssets WHERE idBiologicalAsset = :idBiologicalAsset_input)

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

-- Get TASK CATEGORY NAME FROM ID AND VICE VERSA


-- -----------------
-- 11x SUMMARY QUERIES TO POPULATE PAGE TABLES
-- -----------------

-- Select Parks
SELECT * FROM Parks
ORDER BY idPark ASC;


-- Select Facility Types
SELECT * FROM FacilityTypes
ORDER BY idFacilityType ASC;


-- Select Habitats
SELECT * FROM Habitats
ORDER BY idHabitat ASC;


-- Select Facilities
SELECT  Facilities.idFacility, Parks.parkName, FacilityTypes.facTypeName, Habitats.habitatName,
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, 
        Facilities.securityRating, Facilities.facilityPhoto, Facilities.facilityNote
FROM Facilities
-- Need to join Facilities -> Parks -> FacilityTypes -> Habitats
JOIN Parks ON Facilities.idPark = Parks.idPark
JOIN FacilityTypes ON Facilities.idFacilityType = FacilityTypes.idFacilityType
JOIN Habitats ON Facilities.idHabitat = Habitats.idHabitat
ORDER BY idFacility ASC;


-- Select Diets
SELECT * FROM Diets
ORDER BY idDiet ASC;


-- Select Species
-- TODO -- TBD (complex/FK's - Join/display name of FK ID's instead of ID)


-- BiologicalAssets
-- TO DO - -- TBD (complex/FK's - Join/display name of FK ID's instead of ID)


-- Select JobClassifications
SELECT * FROM JobClassifications
ORDER BY idJobClassification ASC;


-- Select Employees
SELECT  Employees.idEmployee, JobClassifications.jobTitle, Employees.firstName, Employees.lastName, Employees.hourlyWage,
        Employees.employeePhone, Employees.employeeEmail, Employees.employeeRadio, Employees.employeeNote, Employees.employeePhoto
FROM Employees
-- Need to join Employees -> JobClassifications
JOIN JobClassifications ON Employees.idJobClassification = JobClassifications.idJobClassification
ORDER BY idEmployee ASC;


-- SELECT TasksAssigned (Bio Asset ID'd by displaying actual asset ID# and Species, since may not have a nickname)
SELECT  TasksAssigned.idTaskAssigned, Facilities.facilityName, BiologicalAssets.idBiologicalAsset, Species.speciesName,
        TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd
FROM TasksAssigned
-- Need to join TasksAssigned -> Facility -> Bio Asset -> Species
LEFT JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
LEFT JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
LEFT JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
ORDER BY TasksAssigned.idTaskAssigned ASC;


-- SELECT EmployeeTasks
SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskDescription, Employees.firstName, Employees.lastName AS contributingEmployee,
        EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd
FROM EmployeeTasks
-- Need to JOIN EmployeeTasks -> TasksAssigned -> Employees
LEFT JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
ORDER BY EmployeeTasks.idEmployeeTask ASC;


-- SELECT Task Categories
-- TO DO

-- ----------------
-- 11x "ADD NEW" SQL SCRIPTS - Use :browser_inputs to get data for insert queries
-- Open Question: Is it possible to display multiple fields in drop-down while only sending the input from one?
-- (i.e. show ID + name, but only send ID to SQL) - would eliminate most subqueries if so
-- ----------------


-- Add new Park to the system
INSERT INTO Par                 (parkName, parkDescription, parkLocation)
VALUES  (
                :parkName_input, :parkDescription_input, :parkLocation_input
        );


-- Add a new facility using populated dropdowns of easier to ID unique names for input values
INSERT INTO Facilities              (idPark, idFacilityType, idHabitat, facilityName, facilityDescription, 
                                    facilityLocation, securityRating, facilityPhoto, facilityNote)
VALUES  (       
                (SELECT idPark FROM Parks WHERE parkName = :parkName_input), 
                (SELECT idFacilityType FROM FacilityTypes WHERE facTypeName = :facTypeName_input), 
                (SELECT idHabitat FROM Habitat WHERE habitatName = :habitatName_input), 
                :facilityName_input, :facilityDescription_input, :facilityLocation_input, 
                :securityRating_input, :facilityPhoto_input, :facilityDescription_input
        );


-- Add a new facility type
INSERT INTO FacilityTypes       (facTypeName, facTypeDescription)
VALUES  (:facTypeName_input, :facTypeDescription_input);


-- User adds a TaskAssigned, optionally selecting a bio asset based on nickname (may look into alternate selectors for asset)
-- Maybe use asset ID directly for INSERT and have the drop-down display other info to visually ID target critter, but only send the related ID... (I think this is possible?)
INSERT INTO TasksAssigned       (idFacility, idBiologicalAsset, taskDescription, taskStart, taskEnd)
VALUES  (       
                (SELECT idFacility FROM Facilities WHERE facilityName = :facilityName_input),
                (SELECT idBiologicalAsset FROM BiologicalAssets WHERE nickname = :nickname_input), 
                :taskDescription_input, :taskStart_input, :taskEnd_input
        );


-- Creates record of employee's work on a task by referencing the issued task# and the employee's unique username
-- In the event that the task needs to be looked up, a query can lookup tasks and their descriptions for a specific facility
-- to help find which task they meant to contribute towards (using facility/dates and optionally tasks the employee has worked on before to find the #) 
-- Otherwise, we'll need to add a unique non-ID identifier for TasksAssigned, maybe give it a "short name" and come up with a naming policy to avoid issues 
-- with stuff. Maybe auto-generate it in the web UI as a combo of Facility and datetime or something?
INSERT INTO EmployeeTasks       (idTaskAssigned, idEmployee, taskHoursWorked, empTaskCost, empTaskStart, empTaskEnd)
VALUES  (
                :idTaskAssigned_input,
                (SELECT idEmployee FROM Employees WHERE employeeUsername = :employeeUsername_input),
                :taskHoursWorked_input, :empTaskCost_input, :empTaskStart_input, :empTaskEnd_input
        );


-- User selects job name from drop-down and a subquery gets the jobID from it so that the insert can be done properly
INSERT INTO Employees           (idJobClassification, firstName, lastName, hourlyWage, employeePhone, employeeEmail,
                                employeeRadio, employeeNote, employeePhoto)
VALUES  (
                (SELECT idJobClassification FROM JobClassifications WHERE jobTitle = :jobTitle_input), 
                :firstName_input, :lastName_input, :hourlyWage_input, :employeePhone_input,
                :employeeEmail_input, :employeeRadio_input, :employeeNote_input, :employeePhoto_input
        );


-- Add a new job
INSERT INTO JobClassifications  (jobTitle, jobDescription)
VALUES  (
                :jobTitle_input, :jobDescription_input
        );


-- Add a new habitat
INSERT INTO Habitats            ()
VALUES ();


-- Add a new biological asset
INSERT INTO BiologicalAssets    ()
VALUES ();


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
-- TO DO

-- ----------------
-- 1x UPDATE (NULLable - suggest do this for a dino related to task or facility to habitat since they can already be null)
-- NOTE: EmployeeTasks may change if parents are deleted, but otherwise should NOT be editable as they are a transactional record as well as a M:M interface.
-- ... or should we not enforce that so a DB admin can fix work logs processed in error?
-- ----------------

-- Template/Model for updating all attributes based on the primary ID field returned from the browser
UPDATE Parks
SET parkName = :parkName_input, parkLocation = :parkLocation_input, parkDescription = :parkDescription_input
WHERE idPark = :idPark_input;


--FOR LOOKUP - Use a subquery to get id based on another unique attribute or attribute combo
--Park: Name
--Employee: ???? new, unique username attribute?
--Facility: Facility Name (make policy to prefix facility name with 2-3 letter initial for park site... maybe put that in Parks table for reference?)
--BioAssets: Nickname? (park prefix? Ex. JP Rexy, vs. SB Buck, vs. JW: 'Verizon Presents the Indominus Rex')
--Diets: Name
--FacilityTypes: Name
--

-- NULLable example - Re-open a "completed" task by removing its end date + task is complete flag
-- idTaskAssigned will be clear to the user who created a given task, as it will be provided to them upon entry of their
-- task by the database website UI.

-- Update TaskAssignment by removing a bio asset form it counts as nullable example too
-- Same goes for removing a habitat from a facility / (may be able to remove isEnclosure for redundancy as a result?)

-- Probably need/want an accompanying query to get the task info for an update task form (to pre-populate the form with existing stuff)
-- ex. from ED: SELECT character_id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = :character_ID_selected_from_browse_character_page

-- Simple query to re-open a closed task (and change nothing else about it)
UPDATE TasksAssigned
SET taskEnd = NULL
WHERE idTaskAssigned = :taskAssigned_input;
-- SCRUB THIS - not something we'd actually have as a web interface command, we'd just let people update the whole thing


-- Probably want a query to update other stuff too, or maybe just turn the above into an update anything query?
-- Ex. from ED -- update a character's data based on submission of the Update Character form 
-- UPDATE bsg_people SET fname = :fnameInput, lname= :lnameInput, homeworld = :homeworld_id_from_dropdown_Input, age= :ageInput WHERE id= :character_ID_from_the_update_form

-- Example from exploration: https://canvas.oregonstate.edu/courses/1914747/pages/exploration-database-application-design?module_item_id=23040585
-- UPDATE bsg_people 
--    SET fname = :fnameInput, lname= :lnameInput, 
--        homeworld = :homeworld_id_from_dropdown_Input, age= :ageInput 
--    WHERE id= :character_ID_from_the_update_form


-- ----------------
-- 1x DELETE (suggest delete task, as it's the most realistic/real-world thing - ie. someone created a task then decided to cancel it)
-- NOTE: The site UI will notify the administrator of a tasks's ID number when the task is generated. As there can potentially be thousands of tasks,
--       identifying a specific task by the ID is the only realistic way to enforce it without making naming tasks incredibly tedious.
--       The EmployeeTask entity is allowed to exist if its related task or employee is deleted so that we still have a record of overhead costs spent.
--      Probably just make a delete for everything so the DB admin has the option, probably the easiest thing to code since it just uses the ID directly.
-- ----------------

-- Delete TaskAssigned
DELETE
FROM TasksAssigned
WHERE idTaskAssigned = :taskAssigned_input;


-- ----------------
-- 1x CUSTOM Search/Drop-down (this may be a web-page thing to generate a custom query, not something we put in here)
-- ----------------

-- CUSTOM REPORT IDEAS
-- Search for all tasks associated with an employee?
-- Search for all task contributions (EmployeeTasks) associated with an employee?
-- Same Idea, but for facilities?
-- All employees that contributed to a task (search by task ID)
-- All EmployeeTasks that contributed to a specific assignedTask (search by task ID)
-- Park-specific costs (drop-down menu that loads costs to park, possibly w/ breakdown by facility or personnel or tasks if we want)
-- Find suitable facilities to house a specific asset (search/drop-down)
-- Find facility with compatible wildlife (herbivore or same species if not herbivore) for a target species... optionally add habitat to this for a "where can I put this without it dying or eating its friends" query
-- Account cost report (if accounts added back/hooked up to EmployeeTasks)


-- Sub-selects to be inserted into queries to retrieve ID's

-- ADD Unique username attribute for employees? (so we don't need to lookup first/last name combos, which may not be unique)

-- Person Forgot info queries (so there's a way to look up task#'s, etc. if they're forgotten):
-- ex.  list all usernames by person they're assigned to
--      list all tasks by ID/Asset/Facility/Description/StartDate/EndDate (... or just use normal task query for this one)
--              or maybe multiple subqueries, like all facilities for a task, all tasks on a facility / same for dino
--      list all EmployeeTasks by ID/Person/Description/EndDate - sort by person, then date, then id (DESC)? Or something like that
--      list all tasks an employee has contributed to (if they need to lookup something they've done?)