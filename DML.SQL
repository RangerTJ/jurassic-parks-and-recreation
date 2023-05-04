-- Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)
-- : colon prefix used (for now) to denote variables that will be involved with back end data. 

-- Requirements Info from Project Outline:
-- ---------------------------------------
-- It should be possible to INSERT entries into every table individually.
-- Every table should be used in at least one SELECT query. 
--  For the SELECT queries, it is fine to just display the content of the tables. 
--  It is generally not appropriate to have only a single query that joins all tables and displays them.
-- You need to include one DELETE and one UPDATE function in your website, for any one of the entities. 
--  In addition, it should be possible to add and remove things from at least one many-to-many relationship and it should be possible to add things to all relationships. 
--  This means you need SELECT & INSERT functionalities for all relationships as well as entities. 
--  And DELETE & UPDATE for least one m:m relationship.
-- Note that it's not acceptable to require the user to enter IDs for foreign keys. 
--  Instead your website needs to use a dynamically populated drop-down list or have the ability to search using text instead of entering in the ID. 
--  This Dynamic drop-down/Search functionality should be present for at least one entity. 
-- In one relationship, you should be able to set the foreign key value to NULL using UPDATE, that removes the relationship. 
--  In case none of the one-to-many relationships in your database has optional participation, you would need to change that to make sure one can have NULL values. 
--  For example, in the table Orders, there may be two FKs: the employeeID and the customerID which create relations to the Employees and Customers tables. 
--  It may not be sensible for the Customer to be optional. But the Employees could be optional. 
--  Thus, we would expect that in the Orders INSERT and UPDATE pages it is possible to set the employeeID to a value or else to NULL. 
-- You should be able to DELETE a record from a M:M relationship without creating a data anomaly in the related tables. 
--  For example, DELETEing a Customer should handle any Orders that were made by the Customer. 
--  This can be done by either by setting the CustomerID to NULL, or else by DELETEing any Order(s) associated with that Customer. 
--  More on how this can be done in Week 5 when we cover MySQL CASCADELinks to an external site.. 
-- To continue the example from above, if you have 5 tables in your schema, then at a minimum, we expect you to implement:
--  5 SELECTs, 5 INSERTs, 1 UPDATE (1 NULLable relationship), 1 DELETE (M:M), and 1 Dynamic drop-down/Search for a total of 14 functions.
--  COMMENTARY: M:M delete in our case would be deleting a worker's assignment work contributed towards a task, I think (an EmployeeTasks entry)?
--              Or maybe it means handle deleting an employee/task without breaking one or the other?
--              I think it works in current cascade implementation: Deleting a worker or task will cascade to delete the "EmployeeTasks" so there's no anomalies.


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
ORDER BY facTypeName ASC;

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
FROM Facilities
ORDER BY dietName ASC;

-- Species Selector
SELECT idSpecies, speciesName
FROM Species
ORDER BY speciesName ASC;

-- Biological Assets Selector (Bio Asset -> Species JOIN needed)
SELECT idBiologicalAsset, speciesName, nickname
FROM BiologicalAssets
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
ORDER BY parkName speciesName;

-- Job Classifications Selector
SELECT idJobClassification, jobTitle
FROM JobClassifications
ORDER BY jobTitle ASC;

-- Employees Selector
SELECT idEmployee, lastName, firstName
FROM Employees
ORDER BY lastName ASC;

-- Question/Note: It may make more sense to do TasksAssigned and EmployeeTasks as direct inputs where we assume staff responsible have knowledge of
-- the relevant task ID's, vs. a drop down (because these are gonna get unweildingly large pretty fast)

-- -----------------
-- 11x BASIC SUMMARY SELECTS
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
        Facilities.facilityName, Facilities.facilityDescription, Facilities.facilityLocation, Facilities.isEnclosure,
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
JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
ORDER BY TasksAssigned.idTaskAssigned ASC;


-- SELECT EmployeeTasks
SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskDescription, Employees.firstName || Employees.lastName AS contributingEmployee,
        EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd
-- Need to JOIN EmployeeTasks -> TasksAssigned -> Employees
JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
ORDER BY EmployeeTasks.idEmployeeTask ASC;


-- ----------------
-- 11x INSERTS HERE - ADD NEW ENTITIES
-- ----------------

-- TO DO
-- Ex. from ED: -- add a new character
-- INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (:fnameInput, :lnameInput, :homeworld_id_from_dropdown_Input, :ageInput)

INSERT INTO Parks (parkName, parkDescription, parkLocation)
VALUES (:parkName_input, :parkDescription_input, :parkLocation_input)


-- ----------------
-- 1x UPDATE (NULLable - suggest do this for a dino related to task or facility to habitat since they can already be null)
-- ----------------

-- NULLable example - Re-open a "completed" task by removing its end date + task is complete flag
-- idTaskAssigned will be clear to the user who created a given task, as it will be provided to them upon entry of their
-- task by the database website UI.

-- Probably need/want an accompanying query to get the task info for an update task form (to pre-populate the form with existing stuff)
-- ex. from ED: SELECT character_id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = :character_ID_selected_from_browse_character_page

-- Simple query to re-open a closed task (and change nothing else about it)
UPDATE TasksAssigned
SET taskEnd = NULL
WHERE idTaskAssigned = :taskAssigned_input;

-- Probably want a query to update other stuff too, or maybe just turn the above into an update anything query?
-- Ex. from ED -- update a character's data based on submission of the Update Character form 
-- UPDATE bsg_people SET fname = :fnameInput, lname= :lnameInput, homeworld = :homeworld_id_from_dropdown_Input, age= :ageInput WHERE id= :character_ID_from_the_update_form


-- ----------------
-- 1x DELETE (suggest delete task, as it's the most realistic/real-world thing - ie. someone created a task then decided to cancel it)
-- NOTE: The site UI will notify the administrator of a tasks's ID number when the task is generated. As there can potentially be thousands of tasks,
--       identifying a specific task by the ID is the only realistic way to enforce it without making naming tasks incredibly tedious.
--       The EmployeeTask entity is allowed to exist if its related task or employee is deleted so that we still have a record of overhead costs spent.
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