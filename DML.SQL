-- Taylor Jordan and Nick Schmidt (Team 100: Jurassic Parks and Recreation)

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
-- 11x SELECTS HERE (remember to convert id FK fields to something actually usable)
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
        TasksAssigned.taskDescription, TasksAssigned.taskStart, TasksAssigned.taskEnd, TasksAssigned.taskIsComplete
FROM TasksAssigned
-- Need to join TasksAssigned -> Facility -> Bio Asset -> Species
JOIN Facilities ON TasksAssigned.idFacility = Facilities.idFacility
JOIN BiologicalAssets ON TasksAssigned.idBiologicalAsset = BiologicalAssets.idBiologicalAsset
JOIN Species ON BiologicalAssets.idSpecies = Species.idSpecies
-- COMMENT: DO we need to add group by to this?
ORDER BY TasksAssigned.idTaskAssigned ASC;


-- SELECT EmployeeTasks
SELECT  EmployeeTasks.idEmployeeTask, TasksAssigned.taskDescription, Employees.firstName || Employees.lastName AS contributingEmployee,
        EmployeeTasks.taskHoursWorked, EmployeeTasks.empTaskCost, EmployeeTasks.empTaskStart, EmployeeTasks.empTaskEnd
-- Need to JOIN EmployeeTasks -> TasksAssigned -> Employees
JOIN TasksAssigned ON EmployeeTasks.idTaskAssigned = TasksAssigned.idTaskAssigned
JOIN Employees ON EmployeeTasks.idEmployee = Employees.idEmployee
ORDER BY EmployeeTasks.idEmployeeTask ASC;


-- ----------------
-- 11x INSERTS HERE
-- ----------------


-- ----------------
-- 1x UPDATE (NULLable - suggest do this for a dino related to task or facility to habitat since they can already be null)
-- ----------------


-- ----------------
-- 1x DELETE (suggest delete task, as it's the most realistic/real-world thing - ie. someone created a task then decided to cancel it)
-- NOTE: Need to make the task key on EmployeeTasks nullable if we want to still keep a record of costs spent, even if the task was canceled
--       (could go into a report of costs spent on cancelled things where taskid = NULL or something)
-- ----------------


-- ----------------
-- 1x CUSTOM Search/Drop-down (this may be a web-page thing to generate a custom query, not something we put in here)
-- ----------------