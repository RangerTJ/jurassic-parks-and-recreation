-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2023 at 04:32 PM
-- Server version: 10.6.12-MariaDB-log
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_schmnich`
--

-- --------------------------------------------------------

--
-- Table structure for table `BiologicalAssets`
--

CREATE TABLE `BiologicalAssets` (
  `idBiologicalAsset` int(11) NOT NULL,
  `idSpecies` int(11) NOT NULL,
  `idFacility` int(11) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `BiologicalAssets`
--

INSERT INTO `BiologicalAssets` (`idBiologicalAsset`, `idSpecies`, `idFacility`, `nickname`) VALUES
(1, 1, 1, 'Alpha'),
(2, 1, 4, 'Beta'),
(3, 2, 3, 'Gamma'),
(4, 2, 1, 'Delta'),
(5, 2, 1, 'Epsilon'),
(6, 4, 2, 'Zeta'),
(7, 1, 3, 'Eta'),
(8, 2, 4, 'Theta'),
(9, 2, 3, 'Iota'),
(10, 4, 2, 'Kappa'),
(11, 4, 2, 'Lambda'),
(12, 2, 4, 'Mu'),
(13, 1, 4, 'Nu'),
(14, 4, 3, 'Xi'),
(15, 1, 2, 'Omicron');

-- --------------------------------------------------------

--
-- Table structure for table `Diets`
--

CREATE TABLE `Diets` (
  `idDiet` int(11) NOT NULL,
  `dietName` varchar(255) NOT NULL,
  `dietDescription` varchar(8000) NOT NULL,
  `dietIcon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Diets`
--

INSERT INTO `Diets` (`idDiet`, `dietName`, `dietDescription`, `dietIcon`) VALUES
(1, 'Carnivore', 'A diet consisting primarily of meat from other animals. Includes hunters and scavengers.', NULL),
(2, 'Herbivore', 'A diet consisting primarily of plant material. Includes grazers and browsers.', NULL),
(3, 'Omnivore', 'A diet consisting of a mix of plant and animal materials. Opportunistic eaters.', NULL),
(4, 'Piscivore', 'A diet consisting primarily of fish and other aquatic organisms.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `idEmployee` int(11) NOT NULL,
  `idJobClassification` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `hourlyWage` decimal(10,2) NOT NULL,
  `employeePhone` varchar(255) NOT NULL,
  `employeeEmail` varchar(255) NOT NULL,
  `employeeRadio` varchar(255) DEFAULT NULL,
  `employeeNote` varchar(8000) DEFAULT NULL,
  `employeePhoto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`idEmployee`, `idJobClassification`, `firstName`, `lastName`, `hourlyWage`, `employeePhone`, `employeeEmail`, `employeeRadio`, `employeeNote`, `employeePhoto`) VALUES
(1, 4, 'Robert', 'Muldoon', 35.00, '+1-202-555-0144', 'rmuldoon@jw.org', '200', 'Firearm certified.', NULL),
(2, 3, 'Dennis', 'Nedry', 60.00, '+1-202-555-8073', 'dnedry@jw.org', NULL, 'Debt issues. Monitor behavior.', NULL),
(3, 2, 'Ralph', 'Wiggum', 0.00, '+1-202-555-1989', 'mefailenglish@hotmail.com', '325', 'Unpaid student intern. \"I\'m in danger!\"', NULL),
(4, 1, 'Gerry', 'Harding', 40.00, '+1-202-555-1993', 'gharding@jw.org', '501', 'Medical certified.', 'images/staff_test.png');

-- --------------------------------------------------------

--
-- Table structure for table `EmployeeTasks`
--

CREATE TABLE `EmployeeTasks` (
  `idEmployeeTask` int(11) NOT NULL,
  `idTaskAssigned` int(11) DEFAULT NULL,
  `idEmployee` int(11) DEFAULT NULL,
  `taskHoursWorked` int(11) NOT NULL,
  `empTaskCost` decimal(10,2) NOT NULL,
  `empTaskStart` datetime DEFAULT NULL,
  `empTaskEnd` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `EmployeeTasks`
--

INSERT INTO `EmployeeTasks` (`idEmployeeTask`, `idTaskAssigned`, `idEmployee`, `taskHoursWorked`, `empTaskCost`, `empTaskStart`, `empTaskEnd`) VALUES
(1, 1, 1, 40, 10000.00, '2023-04-04 00:00:00', '2023-04-25 00:00:00'),
(2, 1, 4, 10, 5000.00, '2023-04-26 00:00:00', '2023-04-28 00:00:00'),
(3, 2, 3, 160, 0.00, '2022-10-01 00:00:00', '2022-10-31 00:00:00'),
(4, 3, 4, 10, 2000.00, '2023-03-30 00:00:00', '2023-03-30 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Facilities`
--

CREATE TABLE `Facilities` (
  `idFacility` int(11) NOT NULL,
  `idPark` int(11) NOT NULL,
  `idFacilityType` int(11) NOT NULL,
  `idHabitat` int(11) DEFAULT NULL,
  `facilityName` varchar(255) NOT NULL,
  `facilityDescription` varchar(2000) NOT NULL,
  `facilityLocation` varchar(255) NOT NULL,
  `isEnclosure` tinyint(1) NOT NULL,
  `securityRating` tinyint(10) NOT NULL,
  `facilityPhoto` varchar(255) DEFAULT NULL,
  `facilityNote` varchar(8000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Facilities`
--

INSERT INTO `Facilities` (`idFacility`, `idPark`, `idFacilityType`, `idHabitat`, `facilityName`, `facilityDescription`, `facilityLocation`, `isEnclosure`, `securityRating`, `facilityPhoto`, `facilityNote`) VALUES
(1, 2, 5, 1, 'Wild Zone', 'Undeveloped area of Site B where assets can roam free until they need to be collected for transfer to a different facility.', 'All of Sorna outside of the docks and laboratories.', 1, 10, NULL, 'The island\'s natural terrain makes an impassible barrier for most assets to escape, \r\nand heavy-duty fencing/containment covers the gaps and protects other site facilities.'),
(2, 1, 1, NULL, 'Visitor Center', 'Primary Visitor Center for Jurassic World and general hub for visitor experiences.', 'Central Isla Nublar, near ferry monorail drop-off.', 0, 8, NULL, 'Can double as a shelter location in the event that an asset escapes containment. \r\nDoors and walls able to withstand most assets, but in the event of a category 9 or higher escape, visitors should be guided to the max security shelters.'),
(3, 3, 2, 2, 'Jurassic Stadium', 'Stadium viewing area for special biological asset exhibitions.', 'Center of Jurassic Park San Diego.', 1, 10, 'images/arena_test.png', 'Both a large-scale visitor viewing area and a \r\nspecialized enclosure for short-term viewing of a showcase asset.'),
(4, 3, 2, 2, 'Mosasaur Lagoon', 'Salt-water tank for the largest aquatic biological assets at Jurassic World.', 'Adjacent to main street, down main path from the Visitor Center.', 1, 10, NULL, 'Largest and most secure salt-water viewing tank in Jurassic World. \r\nViewing facilities are adjacent.');

-- --------------------------------------------------------

--
-- Table structure for table `FacilityTypes`
--

CREATE TABLE `FacilityTypes` (
  `idFacilityType` int(11) NOT NULL,
  `facTypeName` varchar(255) NOT NULL,
  `facTypeDescription` varchar(8000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `FacilityTypes`
--

INSERT INTO `FacilityTypes` (`idFacilityType`, `facTypeName`, `facTypeDescription`) VALUES
(1, 'General Structure', 'General facility intended for a variety of human uses.'),
(2, 'Ground Enclosure', 'Enclosure designed to contain land-based biological assets.'),
(3, 'Aquatic Enclosure', 'Enclosure designed to contain land-based (or amphibious) biological assets.'),
(4, 'Aviary Enclosure', 'Enclosure designed to contain avian biological assets.'),
(5, 'Undeveloped Area', 'Undeveloped area that is treated as a facility for organizational and reporting purposes.');

-- --------------------------------------------------------

--
-- Table structure for table `Habitats`
--

CREATE TABLE `Habitats` (
  `idHabitat` int(11) NOT NULL,
  `habitatName` varchar(255) NOT NULL,
  `habitatDescription` varchar(8000) NOT NULL,
  `habitatSize` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Habitats`
--

INSERT INTO `Habitats` (`idHabitat`, `habitatName`, `habitatDescription`, `habitatSize`) VALUES
(1, 'Prehistoric Jungle - Large', 'Prehistoric jungles were dense, lush environments teeming with plant and animal life. These habitats supported a variety of herbivorous and carnivorous dinosaur species, including smaller predators, long-necked sauropods, and armored herbivores. Many plants were ferns, horsetails, and primitive conifers.', 3),
(2, 'Cretaceous Coastline - Medium', 'Cretaceous coastlines were shallow marine environments that supported a diverse array of aquatic life, including marine reptiles like ichthyosaurs and plesiosaurs, as well as various fish and invertebrates. These habitats also provided nesting areas for shore-dwelling dinosaurs and resources for other dinosaur species.', 2),
(3, 'Prehistoric Savannah - Large', 'Prehistoric savannahs were open, grassy landscapes with scattered trees and shrubs, providing ample food and resources for grazing and browsing dinosaur species. These habitats supported herds of herbivorous dinosaurs, like hadrosaurs and ceratopsians, as well as carnivorous predators that hunted them.', 3),
(4, 'Ancient Redwood Forest - Medium', 'Ancient redwood forests were home to towering trees, providing a unique ecosystem for a variety of dinosaur species. These habitats were particularly suitable for tree-dwelling and gliding dinosaur species, such as small theropods and early birds, who could navigate the forest canopy with ease.', 2),
(5, 'Jurassic Swamp - Small', 'Jurassic swamps were wetland habitats characterized by an abundance of water and lush vegetation, supporting a diverse range of dinosaur species. These habitats provided ideal conditions for semi-aquatic dinosaurs, like Spinosaurus, and attracted other dinosaur species who relied on the water and resources found in swamps.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `JobClassifications`
--

CREATE TABLE `JobClassifications` (
  `idJobClassification` int(11) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobDescription` varchar(8000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `JobClassifications`
--

INSERT INTO `JobClassifications` (`idJobClassification`, `jobTitle`, `jobDescription`) VALUES
(1, 'Ranger', 'Caretaker that oversees day to day field care of biological assets. \r\nConducts welfare checks, herds animals, and provides general on-the-spot assistance as needed.'),
(2, 'Maintenance Worker', 'Conducts facility upkeep tasks such as repair broken equipment/facilities, cleaning park grounds, inspecting facilities, etc.'),
(3, 'IT Specialist', 'Supports the technological backend of the complex computer-based aspects of maintaining park locations.'),
(4, 'ACU Operative', 'Animal Control Unit specialist charged with ensuring that biological assets do not escape containment \r\nand harm staff, visitors, or other assets. Firearms training required.');

-- --------------------------------------------------------

--
-- Table structure for table `Parks`
--

CREATE TABLE `Parks` (
  `idPark` int(11) NOT NULL,
  `parkName` varchar(255) NOT NULL,
  `parkDescription` varchar(8000) NOT NULL,
  `parkLocation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Parks`
--

INSERT INTO `Parks` (`idPark`, `parkName`, `parkDescription`, `parkLocation`) VALUES
(1, 'Jurassic World', 'Premier zoological theme park in the system. 500+ employees and 200+ assets.', 'Isla Nublar, Costa Rica'),
(2, 'Site B', 'Asset research and staging park. Limited facilities and employees.', 'Isla Sorna, Costa Rica'),
(3, 'Jurassic Park: San Diego', 'Urban zoological theme park. 200+ employees and 50+ assets.', 'San Diego, CA');

-- --------------------------------------------------------

--
-- Table structure for table `Species`
--

CREATE TABLE `Species` (
  `idSpecies` int(11) NOT NULL,
  `idDiet` int(11) NOT NULL,
  `idHabitat` int(11) NOT NULL,
  `speciesName` varchar(255) NOT NULL,
  `speciesDescription` varchar(8000) NOT NULL,
  `threatLevel` tinyint(10) NOT NULL,
  `speciesPhoto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Species`
--

INSERT INTO `Species` (`idSpecies`, `idDiet`, `idHabitat`, `speciesName`, `speciesDescription`, `threatLevel`, `speciesPhoto`) VALUES
(1, 1, 1, 'Tyrannosaurus Rex', 'A large carnivorous dinosaur with powerful jaws and sharp teeth.', 10, NULL),
(2, 1, 4, 'Velociraptor', 'A small, agile carnivorous dinosaur with sharp claws.', 9, NULL),
(3, 2, 3, 'Triceratops', 'A large herbivorous dinosaur with three horns and a bony frill.', 4, NULL),
(4, 2, 1, 'Brachiosaurus', 'A massive herbivorous dinosaur with a long neck and small head.', 3, NULL),
(5, 2, 1, 'Stegosaurus', 'A large herbivorous dinosaur with plates along its back and a spiked tail.', 5, NULL),
(6, 4, 2, 'Spinosaurus', 'A large, primarily piscivorous dinosaur with a distinctive sail on its back.', 8, NULL),
(7, 1, 3, 'Allosaurus', 'A large carnivorous dinosaur with sharp teeth and strong arms.', 9, NULL),
(8, 2, 4, 'Ankylosaurus', 'A heavily-armored herbivorous dinosaur with a club-like tail.', 6, NULL),
(9, 2, 3, 'Parasaurolophus', 'A herbivorous dinosaur with a distinctive crest on its head.', 2, NULL),
(10, 4, 2, 'Mosasaurus', 'A large marine reptile; it was an apex predator, feeding primarily on fish, seabirds, and other marine creatures.', 10, NULL),
(11, 4, 2, 'Hesperornis', 'A large flightless aquatic bird, characterized by its powerful legs adapted for swimming and diving. It fed primarily on fish.', 3, NULL),
(12, 2, 4, 'Thescelosaurus', 'A small, bipedal herbivore characterized by its long legs, suggesting it was a fast runner.', 2, NULL),
(13, 1, 5, 'Diplocaulus', 'A prehistoric amphibian with a distinctive boomerang-shaped skull. Likely a carnivorous ambush predator.', 4, NULL),
(14, 4, 5, 'Metriorhynchus', 'A marine crocodile-like reptile, fed primarily on fish and other small marine creatures.', 5, NULL),
(15, 1, 5, 'Eustreptospondylus', 'A medium-sized theropod dinosaur, it was carnivorous, bipedal, and had a stiffened tail.', 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `TasksAssigned`
--

CREATE TABLE `TasksAssigned` (
  `idTaskAssigned` int(11) NOT NULL,
  `idFacility` int(11) NOT NULL,
  `idBiologicalAsset` int(11) DEFAULT NULL,
  `taskDescription` varchar(8000) NOT NULL,
  `taskStart` datetime NOT NULL,
  `taskEnd` datetime DEFAULT NULL,
  `taskIsComplete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `TasksAssigned`
--

INSERT INTO `TasksAssigned` (`idTaskAssigned`, `idFacility`, `idBiologicalAsset`, `taskDescription`, `taskStart`, `taskEnd`, `taskIsComplete`) VALUES
(1, 1, 1, 'Sedate and transport asset to its new enclosure.', '2023-03-27 00:00:00', '2023-04-28 00:00:00', 1),
(2, 2, NULL, 'FY2023 - Daily Visitor Center Cleaning', '2022-10-01 00:00:00', NULL, 0),
(3, 3, 2, 'Remove broken tooth from showcase asset at Jurassic Stadium.', '2023-03-01 00:00:00', '2023-03-30 00:00:00', 1),
(4, 4, NULL, 'Repair leak in tank.', '2023-04-28 00:00:00', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BiologicalAssets`
--
ALTER TABLE `BiologicalAssets`
  ADD PRIMARY KEY (`idBiologicalAsset`),
  ADD UNIQUE KEY `idBiologicalAsset` (`idBiologicalAsset`),
  ADD UNIQUE KEY `nickname` (`nickname`),
  ADD KEY `fk_BiologicalAssets_Facilities1` (`idFacility`),
  ADD KEY `fk_BiologicalAssets_Species1` (`idSpecies`);

--
-- Indexes for table `Diets`
--
ALTER TABLE `Diets`
  ADD PRIMARY KEY (`idDiet`),
  ADD UNIQUE KEY `idDiet` (`idDiet`),
  ADD UNIQUE KEY `dietName` (`dietName`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`idEmployee`),
  ADD UNIQUE KEY `idEmployee` (`idEmployee`),
  ADD KEY `fk_Employees_JobClassifications1` (`idJobClassification`);

--
-- Indexes for table `EmployeeTasks`
--
ALTER TABLE `EmployeeTasks`
  ADD PRIMARY KEY (`idEmployeeTask`),
  ADD UNIQUE KEY `idEmployeeTask` (`idEmployeeTask`),
  ADD KEY `fk_TasksAssigned_has_Employees_TasksAssigned1` (`idTaskAssigned`),
  ADD KEY `fk_TasksAssigned_has_Employees_Employees1` (`idEmployee`);

--
-- Indexes for table `Facilities`
--
ALTER TABLE `Facilities`
  ADD PRIMARY KEY (`idFacility`),
  ADD UNIQUE KEY `idFacility` (`idFacility`),
  ADD UNIQUE KEY `facilityName` (`facilityName`),
  ADD KEY `fk_Facilities_Parks1` (`idPark`),
  ADD KEY `fk_Facilities_FacilityType1` (`idFacilityType`),
  ADD KEY `fk_Facilities_Habitats1` (`idHabitat`);

--
-- Indexes for table `FacilityTypes`
--
ALTER TABLE `FacilityTypes`
  ADD PRIMARY KEY (`idFacilityType`),
  ADD UNIQUE KEY `idFacilityType` (`idFacilityType`),
  ADD UNIQUE KEY `facTypeName` (`facTypeName`);

--
-- Indexes for table `Habitats`
--
ALTER TABLE `Habitats`
  ADD PRIMARY KEY (`idHabitat`),
  ADD UNIQUE KEY `idHabitat` (`idHabitat`),
  ADD UNIQUE KEY `habitatName` (`habitatName`);

--
-- Indexes for table `JobClassifications`
--
ALTER TABLE `JobClassifications`
  ADD PRIMARY KEY (`idJobClassification`),
  ADD UNIQUE KEY `idJobClassification` (`idJobClassification`),
  ADD UNIQUE KEY `jobTitle` (`jobTitle`);

--
-- Indexes for table `Parks`
--
ALTER TABLE `Parks`
  ADD PRIMARY KEY (`idPark`),
  ADD UNIQUE KEY `idPark` (`idPark`),
  ADD UNIQUE KEY `parkName` (`parkName`);

--
-- Indexes for table `Species`
--
ALTER TABLE `Species`
  ADD PRIMARY KEY (`idSpecies`),
  ADD UNIQUE KEY `idSpecies` (`idSpecies`),
  ADD UNIQUE KEY `speciesName` (`speciesName`),
  ADD KEY `fk_Species_Diets1` (`idDiet`),
  ADD KEY `fk_Species_Habitats1` (`idHabitat`);

--
-- Indexes for table `TasksAssigned`
--
ALTER TABLE `TasksAssigned`
  ADD PRIMARY KEY (`idTaskAssigned`),
  ADD UNIQUE KEY `idTaskAssigned` (`idTaskAssigned`),
  ADD KEY `fk_Tasks_Facilities1` (`idFacility`),
  ADD KEY `fk_Tasks_BiologicalAssets1` (`idBiologicalAsset`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BiologicalAssets`
--
ALTER TABLE `BiologicalAssets`
  MODIFY `idBiologicalAsset` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Diets`
--
ALTER TABLE `Diets`
  MODIFY `idDiet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `idEmployee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `EmployeeTasks`
--
ALTER TABLE `EmployeeTasks`
  MODIFY `idEmployeeTask` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Facilities`
--
ALTER TABLE `Facilities`
  MODIFY `idFacility` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `FacilityTypes`
--
ALTER TABLE `FacilityTypes`
  MODIFY `idFacilityType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Habitats`
--
ALTER TABLE `Habitats`
  MODIFY `idHabitat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `JobClassifications`
--
ALTER TABLE `JobClassifications`
  MODIFY `idJobClassification` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Parks`
--
ALTER TABLE `Parks`
  MODIFY `idPark` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Species`
--
ALTER TABLE `Species`
  MODIFY `idSpecies` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `TasksAssigned`
--
ALTER TABLE `TasksAssigned`
  MODIFY `idTaskAssigned` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BiologicalAssets`
--
ALTER TABLE `BiologicalAssets`
  ADD CONSTRAINT `fk_BiologicalAssets_Facilities1` FOREIGN KEY (`idFacility`) REFERENCES `Facilities` (`idFacility`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_BiologicalAssets_Species1` FOREIGN KEY (`idSpecies`) REFERENCES `Species` (`idSpecies`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Employees`
--
ALTER TABLE `Employees`
  ADD CONSTRAINT `fk_Employees_JobClassifications1` FOREIGN KEY (`idJobClassification`) REFERENCES `JobClassifications` (`idJobClassification`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `EmployeeTasks`
--
ALTER TABLE `EmployeeTasks`
  ADD CONSTRAINT `fk_TasksAssigned_has_Employees_Employees1` FOREIGN KEY (`idEmployee`) REFERENCES `Employees` (`idEmployee`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_TasksAssigned_has_Employees_TasksAssigned1` FOREIGN KEY (`idTaskAssigned`) REFERENCES `TasksAssigned` (`idTaskAssigned`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Facilities`
--
ALTER TABLE `Facilities`
  ADD CONSTRAINT `fk_Facilities_FacilityType1` FOREIGN KEY (`idFacilityType`) REFERENCES `FacilityTypes` (`idFacilityType`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Facilities_Habitats1` FOREIGN KEY (`idHabitat`) REFERENCES `Habitats` (`idHabitat`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Facilities_Parks1` FOREIGN KEY (`idPark`) REFERENCES `Parks` (`idPark`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Species`
--
ALTER TABLE `Species`
  ADD CONSTRAINT `fk_Species_Diets1` FOREIGN KEY (`idDiet`) REFERENCES `Diets` (`idDiet`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Species_Habitats1` FOREIGN KEY (`idHabitat`) REFERENCES `Habitats` (`idHabitat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `TasksAssigned`
--
ALTER TABLE `TasksAssigned`
  ADD CONSTRAINT `fk_Tasks_BiologicalAssets1` FOREIGN KEY (`idBiologicalAsset`) REFERENCES `BiologicalAssets` (`idBiologicalAsset`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Tasks_Facilities1` FOREIGN KEY (`idFacility`) REFERENCES `Facilities` (`idFacility`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
