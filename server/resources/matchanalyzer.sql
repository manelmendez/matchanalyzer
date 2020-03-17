/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura de base de datos para knowledgecenter
DROP DATABASE IF EXISTS `matchanalyzer`;
CREATE DATABASE IF NOT EXISTS `matchanalyzer` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `matchanalyzer`;

--
-- Table structure for table `assists`
--

DROP TABLE IF EXISTS `assists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assists` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `goal` int(11) unsigned DEFAULT NULL,
  `matchId` int(11) unsigned DEFAULT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  `player` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assist_playerId` (`player`),
  KEY `assist_match` (`matchId`),
  KEY `assist_matchpart` (`matchpart`),
  KEY `assist_userId` (`userId`),
  KEY `assist_goalId` (`goal`),
  CONSTRAINT `assist_goalId` FOREIGN KEY (`goal`) REFERENCES `goals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_match` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_matchpart` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_playerId` FOREIGN KEY (`player`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assists`
--

LOCK TABLES `assists` WRITE;
/*!40000 ALTER TABLE `assists` DISABLE KEYS */;
/*!40000 ALTER TABLE `assists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `minute` int(11) DEFAULT '0',
  `type` varchar(50) DEFAULT '',
  `player` int(11) unsigned DEFAULT NULL,
  `matchId` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `card_playerId` (`player`),
  KEY `card_matchId` (`matchId`),
  KEY `card_userId` (`userId`),
  KEY `card_matchpartId` (`matchpart`),
  CONSTRAINT `card_matchId` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `card_matchpartId` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `card_playerId` FOREIGN KEY (`player`) REFERENCES `players` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `card_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `competitions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `season` varchar(50) DEFAULT NULL,
  `discipline` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `manager` int(11) unsigned NOT NULL,
  `signupDate` datetime DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `competition_managerId` (`manager`),
  KEY `competition_userId` (`userId`),
  CONSTRAINT `competition_managerId` FOREIGN KEY (`manager`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `competition_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitions`
--

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
INSERT INTO `competitions` VALUES (3,'2a División Grupo 5','19/20','F7','Alevín',4,'2019-11-22 15:23:25',4),(6,'1a División Grupo 2','18/19','F7','Alevín',4,'2020-01-17 12:41:28',4);
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `goals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `minute` int(11) NOT NULL DEFAULT '0',
  `type` varchar(50) DEFAULT '',
  `player` int(11) unsigned DEFAULT NULL,
  `matchId` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goal_matchId` (`matchId`),
  KEY `goal_userId` (`userId`),
  KEY `goal_matchpartId` (`matchpart`),
  KEY `goal_playerId` (`player`),
  CONSTRAINT `goal_matchId` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `goal_matchpartId` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_playerId` FOREIGN KEY (`player`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
INSERT INTO `goals` VALUES (26,6,NULL,10,10,4,22),(27,9,NULL,9,10,4,22),(28,12,NULL,9,10,4,22),(29,10,NULL,3,10,4,23),(30,10,NULL,6,10,4,24),(31,7,NULL,7,10,4,25),(32,13,NULL,8,10,4,25);
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `matches` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `localTeam` int(11) unsigned DEFAULT NULL,
  `awayTeam` int(11) unsigned DEFAULT NULL,
  `matchDay` date DEFAULT NULL,
  `round` int(11) unsigned NOT NULL,
  `competition` int(11) unsigned NOT NULL,
  `localTeamGoals` int(11) NOT NULL,
  `awayTeamGoals` int(11) NOT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `match_competitionId` (`competition`),
  KEY `match_localTeamId` (`localTeam`),
  KEY `match_awayTeamId` (`awayTeam`),
  KEY `match_roundId` (`round`),
  KEY `match_userId` (`userId`),
  CONSTRAINT `match_awayTeamId` FOREIGN KEY (`awayTeam`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `match_competitionId` FOREIGN KEY (`competition`) REFERENCES `competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `match_localTeamId` FOREIGN KEY (`localTeam`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `match_roundId` FOREIGN KEY (`round`) REFERENCES `rounds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `match_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=402 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (6,18,19,'2019-12-03',13,3,4,5,4),(7,20,21,'2019-12-03',13,3,2,1,4),(8,16,22,'2019-12-03',13,3,12,5,4),(9,27,17,'2019-12-03',13,3,2,4,4),(10,13,23,'2019-12-03',13,3,8,0,4),(11,24,28,'2019-12-03',13,3,5,4,4),(12,15,14,'2019-12-03',13,3,1,5,4),(13,22,20,'2019-12-03',14,3,4,0,4),(14,21,15,'2019-12-03',14,3,4,6,4),(15,28,13,'2019-12-03',14,3,0,18,4),(16,17,25,'2019-12-03',14,3,6,2,4),(17,23,16,'2019-12-03',14,3,7,3,4),(18,19,27,'2019-12-03',14,3,5,2,4),(19,26,24,'2019-12-03',14,3,0,3,4),(20,14,18,'2019-12-03',14,3,3,2,4),(21,20,23,'2019-12-03',15,3,5,1,4),(22,19,14,'2019-12-03',15,3,1,2,4),(23,18,21,'2019-12-03',15,3,3,2,4),(24,16,28,'2019-12-03',15,3,15,0,4),(25,24,17,'2019-12-03',15,3,2,4,4),(26,27,25,'2019-12-03',15,3,1,2,4),(27,13,26,'2019-12-03',15,3,8,0,4),(28,15,22,'2019-12-03',15,3,4,3,4),(29,22,18,'2019-12-03',16,3,3,2,4),(30,17,13,'2019-12-03',16,3,0,8,4),(31,28,20,'2019-12-03',16,3,1,5,4),(32,23,15,'2019-12-03',16,3,2,0,4),(33,21,19,'2019-12-03',16,3,5,4,4),(34,26,16,'2019-12-03',16,3,3,4,4),(35,14,27,'2019-12-03',16,3,4,1,4),(36,25,24,'2019-12-03',16,3,5,1,4),(37,20,26,'2019-12-03',17,3,1,3,4),(38,16,17,'2019-12-03',17,3,4,4,4),(39,14,21,'2019-12-03',17,3,3,2,4),(40,19,22,'2019-12-03',17,3,5,7,4),(41,27,24,'2019-12-03',17,3,5,6,4),(42,13,25,'2019-12-03',17,3,6,0,4),(43,15,28,'2019-12-03',17,3,6,0,4),(44,18,23,'2019-12-03',17,3,3,0,4),(45,22,14,'2019-12-03',18,3,1,4,4),(46,28,18,'2019-12-03',18,3,0,8,4),(47,23,19,'2019-12-03',18,3,4,2,4),(48,17,20,'2019-12-03',18,3,3,2,4),(49,26,15,'2019-12-03',18,3,4,4,4),(50,24,13,'2019-12-03',18,3,0,13,4),(51,25,16,'2019-12-03',18,3,3,6,4),(52,21,27,'2019-12-03',18,3,4,3,4),(53,15,17,'2019-12-03',19,3,5,2,4),(54,20,25,'2019-12-03',19,3,6,2,4),(55,21,22,'2019-12-03',19,3,0,4,4),(56,16,24,'2019-12-03',19,3,2,3,4),(57,18,26,'2019-12-03',19,3,3,2,4),(58,27,13,'2019-12-03',19,3,2,6,4),(59,14,23,'2019-12-03',19,3,4,0,4),(60,19,28,'2019-12-03',19,3,6,0,4),(61,25,15,'2019-12-03',20,3,3,7,4),(62,22,27,'2019-12-03',20,3,2,3,4),(63,23,21,'2019-12-03',20,3,1,5,4),(64,17,18,'2019-12-03',20,3,2,1,4),(65,26,19,'2019-12-03',20,3,1,2,4),(66,24,20,'2019-12-03',20,3,1,3,4),(67,28,14,'2019-12-03',20,3,2,5,4),(68,13,16,'2019-12-03',20,3,6,2,4),(69,22,23,'2019-12-03',21,3,3,4,4),(70,20,13,'2019-12-03',21,3,0,7,4),(71,18,25,'2019-12-03',21,3,4,2,4),(72,21,28,'2019-12-03',21,3,9,0,4),(73,19,17,'2019-12-03',21,3,3,2,4),(74,27,16,'2019-12-03',21,3,2,3,4),(75,14,26,'2019-12-03',21,3,4,1,4),(76,15,24,'2019-12-03',21,3,7,5,4),(77,25,19,'2019-12-14',22,3,7,4,4),(78,28,22,'2019-12-14',22,3,4,5,4),(79,16,20,'2019-12-14',22,3,1,0,4),(80,17,14,'2019-12-14',22,3,1,1,4),(81,26,21,'2019-12-14',22,3,2,3,4),(82,24,18,'2019-12-14',22,3,4,5,4),(83,23,27,'2019-12-16',22,3,2,3,4),(84,13,15,'2019-12-16',22,3,10,4,4),(85,18,13,'2019-12-21',23,3,2,5,4),(86,19,24,'2019-12-21',23,3,4,1,4),(87,22,26,'2019-12-21',23,3,5,2,4),(88,23,28,'2019-12-21',23,3,4,1,4),(89,15,16,'2019-12-21',23,3,1,5,4),(90,27,20,'2019-12-21',23,3,3,1,4),(91,14,25,'2019-12-21',23,3,1,3,4),(96,21,17,'2019-12-31',23,3,1,5,4),(97,20,15,'2020-01-11',25,3,2,6,4),(98,25,21,'2020-01-11',25,3,1,1,4),(99,28,27,'2020-01-11',25,3,0,9,4),(100,16,18,'2020-01-11',25,3,4,1,4),(101,17,22,'2020-01-11',25,3,2,5,4),(102,26,23,'2020-01-11',25,3,2,1,4),(103,24,14,'2020-01-11',25,3,2,5,4),(104,13,19,'2020-01-11',25,3,12,0,4),(105,41,31,'2020-01-17',28,6,1,9,4),(106,32,43,'2020-01-17',28,6,16,1,4),(107,44,42,'2020-01-17',28,6,2,2,4),(108,38,45,'2020-01-17',28,6,6,3,4),(109,33,34,'2020-01-17',28,6,6,7,4),(110,35,39,'2020-01-17',28,6,8,6,4),(111,36,37,'2020-01-17',28,6,2,2,4),(112,49,40,'2020-01-17',28,6,2,6,4),(113,34,36,'2020-01-17',29,6,2,2,4),(114,31,49,'2020-01-17',29,6,10,0,4),(115,37,35,'2020-01-17',29,6,2,2,4),(116,45,33,'2020-01-17',29,6,2,4,4),(117,39,44,'2020-01-17',29,6,1,6,4),(118,40,38,'2020-01-17',29,6,3,5,4),(119,43,41,'2020-01-17',29,6,1,6,4),(120,42,32,'2020-01-17',29,6,0,10,4),(121,32,39,'2020-01-17',30,6,12,1,4),(122,38,31,'2020-01-17',30,6,5,4,4),(123,33,36,'2020-01-17',30,6,6,3,4),(124,35,34,'2020-01-17',30,6,5,1,4),(125,41,42,'2020-01-17',30,6,1,3,4),(126,49,43,'2020-01-17',30,6,3,2,4),(127,44,37,'2020-01-17',30,6,1,1,4),(128,45,40,'2020-01-17',30,6,5,4,4),(129,39,41,'2020-01-17',31,6,5,2,4),(130,31,45,'2020-01-17',31,6,9,0,4),(131,36,35,'2020-01-17',31,6,2,5,4),(132,43,38,'2020-01-17',31,6,3,3,4),(133,40,33,'2020-01-17',31,6,2,10,4),(134,34,44,'2020-01-17',31,6,7,2,4),(135,42,49,'2020-01-17',31,6,7,2,4),(136,37,32,'2020-01-17',31,6,0,7,4),(137,41,37,'2020-01-17',32,6,8,3,4),(138,38,42,'2020-01-17',32,6,6,0,4),(139,44,36,'2020-01-17',32,6,4,4,4),(140,40,31,'2020-01-17',32,6,3,7,4),(141,33,35,'2020-01-17',32,6,3,3,4),(142,32,34,'2020-01-17',32,6,1,2,4),(143,45,43,'2020-01-17',32,6,4,3,4),(144,49,39,'2020-01-17',32,6,2,2,4),(145,43,40,'2020-01-17',33,6,9,1,4),(146,36,32,'2020-01-17',33,6,0,13,4),(147,31,33,'2020-01-17',33,6,3,3,4),(148,34,41,'2020-01-17',33,6,6,5,4),(149,35,44,'2020-01-17',33,6,3,1,4),(150,39,38,'2020-01-17',33,6,1,2,4),(151,37,49,'2020-01-17',33,6,11,1,4),(152,42,45,'2020-01-17',33,6,6,2,4),(153,49,34,'2020-01-17',34,6,2,4,4),(154,41,36,'2020-01-17',34,6,2,5,4),(155,31,43,'2020-01-17',34,6,7,0,4),(156,38,37,'2020-01-17',34,6,6,2,4),(157,32,35,'2020-01-17',34,6,5,0,4),(158,33,44,'2020-01-17',34,6,5,2,4),(159,40,42,'2020-01-17',34,6,1,3,4),(160,45,39,'2020-01-17',34,6,4,3,4),(161,36,49,'2020-01-17',35,6,8,2,4),(162,37,45,'2020-01-17',35,6,4,3,4),(163,35,41,'2020-01-17',35,6,5,2,4),(164,39,40,'2020-01-17',35,6,1,1,4),(165,43,33,'2020-01-17',35,6,0,8,4),(166,42,31,'2020-01-17',35,6,3,3,4),(167,44,32,'2020-01-17',35,6,1,6,4),(168,34,38,'2020-01-17',35,6,3,0,4),(169,31,39,'2020-01-17',36,6,4,1,4),(170,41,44,'2020-01-17',36,6,1,1,4),(171,38,36,'2020-01-17',36,6,2,0,4),(172,40,37,'2020-01-17',36,6,4,1,4),(173,43,42,'2020-01-17',36,6,1,6,4),(174,49,35,'2020-01-17',36,6,1,4,4),(175,45,34,'2020-01-17',36,6,2,2,4),(176,33,32,'2020-01-17',36,6,3,5,4),(177,39,43,'2020-01-17',37,6,7,1,4),(178,37,31,'2020-01-17',37,6,3,7,4),(179,32,41,'2020-01-17',37,6,10,2,4),(180,36,45,'2020-01-17',37,6,5,1,4),(181,35,38,'2020-01-17',37,6,2,3,4),(182,34,40,'2020-01-17',37,6,8,0,4),(183,44,49,'2020-01-17',37,6,3,2,4),(184,42,33,'2020-01-17',37,6,0,6,4),(185,42,39,'2020-01-17',38,6,2,4,4),(186,31,34,'2020-01-17',38,6,3,1,4),(187,45,35,'2020-01-17',38,6,0,1,4),(188,38,44,'2020-01-17',38,6,3,2,4),(189,40,36,'2020-01-17',38,6,2,4,4),(190,43,37,'2020-01-17',38,6,0,5,4),(191,49,32,'2020-01-17',38,6,1,18,4),(192,33,41,'2020-01-17',38,6,3,1,4),(193,41,49,'2020-01-17',39,6,8,5,4),(194,36,31,'2020-01-17',39,6,3,4,4),(195,32,38,'2020-01-17',39,6,12,0,4),(196,35,40,'2020-01-17',39,6,6,0,4),(197,39,33,'2020-01-17',39,6,0,5,4),(198,44,45,'2020-01-17',39,6,1,1,4),(199,37,42,'2020-01-17',39,6,3,2,4),(200,34,43,'2020-01-17',39,6,7,2,4),(201,45,32,'2020-01-17',40,6,1,12,4),(202,31,35,'2020-01-17',40,6,3,1,4),(203,38,41,'2020-01-17',40,6,3,1,4),(204,33,49,'2020-01-17',40,6,7,1,4),(205,40,44,'2020-01-17',40,6,2,2,4),(206,43,36,'2020-01-17',40,6,3,2,4),(207,39,37,'2020-01-17',40,6,0,4,4),(208,42,34,'2020-01-17',40,6,2,6,4),(209,41,45,'2020-01-17',41,6,10,3,4),(210,49,38,'2020-01-17',41,6,1,6,4),(211,36,42,'2020-01-17',41,6,7,2,4),(212,33,37,'2020-01-17',41,6,4,1,4),(213,35,43,'2020-01-17',41,6,7,6,4),(214,32,40,'2020-01-17',41,6,18,1,4),(215,34,39,'2020-01-17',41,6,9,2,4),(216,44,31,'2020-01-17',41,6,1,6,4),(217,42,35,'2020-01-17',42,6,0,6,4),(218,38,33,'2020-01-17',42,6,2,3,4),(219,45,49,'2020-01-17',42,6,4,4,4),(220,31,32,'2020-01-17',42,6,2,3,4),(221,39,36,'2020-01-17',42,6,1,2,4),(222,43,44,'2020-01-17',42,6,3,2,4),(223,40,41,'2020-01-17',42,6,6,5,4),(224,37,34,'2020-01-17',42,6,5,0,4),(225,39,35,'2020-01-17',43,6,3,2,4),(226,31,41,'2020-01-17',43,6,7,1,4),(227,43,32,'2020-01-17',43,6,1,11,4),(228,45,38,'2020-01-17',43,6,2,3,4),(229,34,33,'2020-01-17',43,6,1,2,4),(230,40,49,'2020-01-17',43,6,2,0,4),(231,42,44,'2020-01-17',43,6,2,2,4),(232,37,36,'2020-01-17',43,6,4,3,4),(233,41,43,'2020-01-17',44,6,3,6,4),(234,32,42,'2020-01-17',44,6,12,1,4),(235,38,40,'2020-01-17',44,6,9,0,4),(236,33,45,'2020-01-17',44,6,7,0,4),(237,44,39,'2020-01-17',44,6,2,2,4),(238,35,37,'2020-01-17',44,6,3,1,4),(239,36,34,'2020-01-17',44,6,0,3,4),(240,49,31,'2020-01-17',44,6,2,2,4),(241,39,32,'2020-01-17',45,6,3,7,4),(242,34,35,'2020-01-17',45,6,5,2,4),(243,36,33,'2020-01-17',45,6,1,2,4),(244,43,49,'2020-01-17',45,6,6,3,4),(245,31,38,'2020-01-17',45,6,4,2,4),(246,40,45,'2020-01-17',45,6,4,0,4),(247,42,41,'2020-01-17',45,6,5,4,4),(248,37,44,'2020-01-17',45,6,2,0,4),(249,41,39,'2020-01-17',46,6,4,1,4),(250,32,37,'2020-01-17',46,6,7,1,4),(251,33,40,'2020-01-17',46,6,13,0,4),(252,45,31,'2020-01-17',46,6,4,6,4),(253,38,43,'2020-01-17',46,6,7,1,4),(254,35,36,'2020-01-17',46,6,5,4,4),(255,49,42,'2020-01-17',46,6,2,4,4),(256,44,34,'2020-01-17',46,6,5,1,4),(257,31,40,'2020-01-17',47,6,8,0,4),(258,43,45,'2020-01-17',47,6,6,5,4),(259,39,49,'2020-01-17',47,6,9,1,4),(260,36,44,'2020-01-17',47,6,5,2,4),(261,42,38,'2020-01-17',47,6,1,7,4),(262,37,41,'2020-01-17',47,6,6,0,4),(263,35,33,'2020-01-17',47,6,5,5,4),(264,34,32,'2020-01-17',47,6,1,10,4),(265,41,34,'2020-01-17',48,6,1,2,4),(266,33,31,'2020-01-17',48,6,7,2,4),(267,32,36,'2020-01-17',48,6,8,0,4),(268,49,37,'2020-01-17',48,6,1,7,4),(269,38,39,'2020-01-17',48,6,2,2,4),(270,45,42,'2020-01-17',48,6,1,4,4),(271,40,43,'2020-01-17',48,6,3,3,4),(272,44,35,'2020-01-17',48,6,1,3,4),(273,39,45,'2020-01-17',49,6,6,4,4),(274,36,41,'2020-01-17',49,6,4,1,4),(275,43,31,'2020-01-17',49,6,1,6,4),(276,44,33,'2020-01-17',49,6,0,1,4),(277,37,38,'2020-01-17',49,6,0,4,4),(278,42,40,'2020-01-17',49,6,2,5,4),(279,35,32,'2020-01-17',49,6,2,2,4),(280,34,49,'2020-01-17',49,6,16,5,4),(281,41,35,'2020-01-17',50,6,4,3,4),(282,32,44,'2020-01-17',50,6,7,0,4),(283,31,42,'2020-01-17',50,6,7,2,4),(284,40,39,'2020-01-17',50,6,5,5,4),(285,33,43,'2020-01-17',50,6,10,0,4),(286,38,34,'2020-01-17',50,6,4,3,4),(287,49,36,'2020-01-17',50,6,2,6,4),(288,45,37,'2020-01-17',50,6,2,2,4),(289,37,40,'2020-01-17',51,6,3,3,4),(290,44,41,'2020-01-17',51,6,1,2,4),(291,35,49,'2020-01-17',51,6,7,3,4),(292,39,31,'2020-01-17',51,6,2,7,4),(293,36,38,'2020-01-17',51,6,1,3,4),(294,42,43,'2020-01-17',51,6,2,5,4),(295,32,33,'2020-01-17',51,6,6,2,4),(296,34,45,'2020-01-17',51,6,7,3,4),(297,49,44,'2020-01-17',52,6,2,10,4),(298,41,32,'2020-01-17',52,6,2,11,4),(299,45,36,'2020-01-17',52,6,2,1,4),(300,31,37,'2020-01-17',52,6,4,2,4),(301,40,34,'2020-01-17',52,6,5,4,4),(302,43,39,'2020-01-17',52,6,4,4,4),(303,33,42,'2020-01-17',52,6,7,1,4),(304,38,35,'2020-01-17',52,6,5,2,4),(305,39,42,'2020-01-17',53,6,3,0,4),(306,41,33,'2020-01-17',53,6,3,5,4),(307,32,49,'2020-01-17',53,6,18,0,4),(308,44,38,'2020-01-17',53,6,1,4,4),(309,35,45,'2020-01-17',53,6,12,1,4),(310,36,40,'2020-01-17',53,6,5,2,4),(311,37,43,'2020-01-17',53,6,5,4,4),(312,34,31,'2020-01-17',53,6,6,4,4),(313,45,44,'2020-01-17',54,6,2,2,4),(314,33,39,'2020-01-17',54,6,1,0,4),(315,31,36,'2020-01-17',54,6,4,0,4),(316,42,37,'2020-01-17',54,6,1,3,4),(317,38,32,'2020-01-17',54,6,2,3,4),(318,43,34,'2020-01-17',54,6,1,5,4),(319,40,35,'2020-01-17',54,6,2,4,4),(320,49,41,'2020-01-17',54,6,4,9,4),(321,41,38,'2020-01-17',55,6,2,7,4),(322,49,33,'2020-01-17',55,6,0,11,4),(323,44,40,'2020-01-17',55,6,9,3,4),(324,32,45,'2020-01-17',55,6,11,0,4),(325,35,31,'2020-01-17',55,6,1,7,4),(326,36,43,'2020-01-17',55,6,3,2,4),(327,37,39,'2020-01-17',55,6,2,6,4),(328,34,42,'2020-01-17',55,6,6,1,4),(329,38,49,'2020-01-17',56,6,16,0,4),(330,43,35,'2020-01-17',56,6,3,3,4),(331,31,44,'2020-01-17',56,6,4,1,4),(332,39,34,'2020-01-17',56,6,4,8,4),(333,40,32,'2020-01-17',56,6,1,16,4),(334,42,36,'2020-01-17',56,6,3,5,4),(335,45,41,'2020-01-17',56,6,2,7,4),(336,37,33,'2020-01-17',56,6,0,5,4),(337,41,40,'2020-01-17',57,6,4,6,4),(338,32,31,'2020-01-17',57,6,2,3,4),(339,36,39,'2020-01-17',57,6,4,3,4),(340,34,37,'2020-01-17',57,6,10,0,4),(341,33,38,'2020-01-17',57,6,4,2,4),(342,49,45,'2020-01-17',57,6,5,2,4),(343,35,42,'2020-01-17',57,6,7,1,4),(344,44,43,'2020-01-17',57,6,3,3,4),(345,18,20,'2020-01-20',58,3,3,2,4),(346,21,24,'2020-01-20',58,3,11,2,4),(347,23,17,'2020-01-20',58,3,1,3,4),(348,27,15,'2020-01-20',58,3,3,8,4),(349,14,13,'2020-01-20',58,3,0,2,4),(350,19,16,'2020-01-20',58,3,4,5,4),(351,28,26,'2020-01-20',58,3,2,2,4),(352,17,28,'2020-01-27',59,3,13,1,4),(353,20,19,'2020-01-27',59,3,2,1,4),(354,25,23,'2020-01-27',59,3,3,0,4),(355,15,18,'2020-01-27',59,3,3,5,4),(356,16,14,'2020-01-27',59,3,4,8,4),(357,27,26,'2020-01-27',59,3,3,2,4),(358,24,22,'2020-01-27',59,3,2,2,4),(359,13,21,'2020-01-27',59,3,7,0,4),(360,22,25,'2020-01-30',58,3,1,3,4),(361,22,13,'2020-02-02',60,3,0,9,4),(362,18,27,'2020-02-02',60,3,6,0,4),(363,23,24,'2020-02-02',60,3,1,6,4),(364,21,16,'2020-02-02',60,3,6,3,4),(365,28,25,'2020-02-02',60,3,0,6,4),(366,26,17,'2020-02-02',60,3,7,1,4),(367,14,20,'2020-02-02',60,3,3,1,4),(368,19,15,'2020-02-03',60,3,1,3,4),(369,22,16,'2020-02-10',61,3,3,6,4),(370,17,27,'2020-02-10',61,3,5,0,4),(371,23,13,'2020-02-10',61,3,1,9,4),(372,21,20,'2020-02-10',61,3,4,4,4),(373,28,24,'2020-02-10',61,3,0,6,4),(374,26,25,'2020-02-10',61,3,1,0,4),(375,14,15,'2020-02-10',61,3,3,2,4),(376,19,18,'2020-02-10',61,3,2,2,4),(377,20,22,'2020-02-17',62,3,1,1,4),(378,16,23,'2020-02-17',62,3,3,0,4),(379,15,21,'2020-02-17',62,3,5,3,4),(380,25,17,'2020-02-17',62,3,1,3,4),(381,24,26,'2020-02-17',62,3,1,3,4),(382,27,19,'2020-02-17',62,3,0,1,4),(383,13,28,'2020-02-17',62,3,20,0,4),(384,18,14,'2020-02-17',62,3,0,6,4),(385,22,15,'2020-03-06',63,3,4,2,4),(386,25,27,'2020-03-06',63,3,2,2,4),(387,23,20,'2020-03-06',63,3,2,10,4),(388,28,16,'2020-03-06',63,3,0,6,4),(389,21,18,'2020-03-06',63,3,3,4,4),(390,17,24,'2020-03-06',63,3,3,1,4),(391,14,19,'2020-03-06',63,3,13,2,4),(392,26,13,'2020-03-06',63,3,2,5,4),(393,19,21,'2020-03-08',64,3,2,4,4),(394,15,23,'2020-03-08',64,3,6,0,4),(395,16,26,'2020-03-08',64,3,3,6,4),(396,27,14,'2020-03-08',64,3,4,7,4),(397,18,22,'2020-03-08',64,3,4,3,4),(398,24,25,'2020-03-08',64,3,1,6,4),(399,20,28,'2020-03-08',64,3,6,1,4),(400,13,17,'2020-03-08',64,3,9,0,4),(401,25,26,'2020-03-14',13,3,5,3,4);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchparts`
--

DROP TABLE IF EXISTS `matchparts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `matchparts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `matchId` int(11) unsigned NOT NULL,
  `formation` varchar(50) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `team` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `matchpart_match` (`matchId`),
  KEY `matchpart_team` (`team`),
  KEY `matchpart_userId` (`userId`),
  CONSTRAINT `matchpart_match` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matchpart_team` FOREIGN KEY (`team`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matchpart_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchparts`
--

LOCK TABLES `matchparts` WRITE;
/*!40000 ALTER TABLE `matchparts` DISABLE KEYS */;
INSERT INTO `matchparts` VALUES (22,10,'3-1-2',15,13,4),(23,10,'3-1-2',15,13,4),(24,10,'3-1-2',15,13,4),(25,10,'3-1-2',15,13,4);
/*!40000 ALTER TABLE `matchparts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minutes`
--

DROP TABLE IF EXISTS `minutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `minutes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `player` int(11) unsigned NOT NULL,
  `matchpart` int(11) unsigned NOT NULL,
  `matchId` int(11) unsigned NOT NULL,
  `userId` int(11) unsigned NOT NULL,
  `position` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `minute_playerId` (`player`),
  KEY `minute_matchpartId` (`matchpart`),
  KEY `minute_matchId` (`matchId`),
  KEY `minute_userId` (`userId`),
  CONSTRAINT `minute_matchId` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `minute_matchpartId` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `minute_playerId` FOREIGN KEY (`player`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `minute_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minutes`
--

LOCK TABLES `minutes` WRITE;
/*!40000 ALTER TABLE `minutes` DISABLE KEYS */;
INSERT INTO `minutes` VALUES (2,1,22,10,4,'PT'),(3,2,22,10,4,'CT'),(4,4,22,10,4,'LD'),(5,6,22,10,4,'LI'),(6,7,22,10,4,'MC'),(7,10,22,10,4,'DC'),(12,9,22,10,4,'DC'),(13,1,23,10,4,'PT'),(14,2,23,10,4,'CT'),(15,3,23,10,4,'LD'),(16,5,23,10,4,'LI'),(17,8,23,10,4,'MC'),(18,9,23,10,4,'DC'),(19,10,23,10,4,'DC'),(20,1,24,10,4,'PT'),(22,3,24,10,4,'CT'),(23,4,24,10,4,'LD'),(24,5,24,10,4,'LI'),(25,7,24,10,4,'MC'),(26,6,24,10,4,'DC'),(27,8,24,10,4,'DC'),(28,1,25,10,4,'PT'),(29,2,25,10,4,'CT'),(30,4,25,10,4,'LD'),(31,6,25,10,4,'LI'),(32,7,25,10,4,'MC'),(33,10,25,10,4,'DC'),(34,9,25,10,4,'DC');
/*!40000 ALTER TABLE `minutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `players` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT NULL,
  `year` year(4) NOT NULL,
  `team` int(11) unsigned DEFAULT NULL,
  `position` varchar(255) NOT NULL DEFAULT '',
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `player_teamId` (`team`),
  KEY `player_userId` (`userId`),
  CONSTRAINT `player_teamId` FOREIGN KEY (`team`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `player_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Pau Sabio','assets/images/person_icon.png',2009,13,'PT',4),(2,'Adrián Cuadrado','assets/images/person_icon.png',2009,13,'CT',4),(3,'Vadym Bilanchyk','assets/images/person_icon.png',2009,13,'CT',4),(4,'Marc Morilla','assets/images/person_icon.png',2009,13,'LD',4),(5,'Luc Gironès','assets/images/person_icon.png',2009,13,'LI',4),(6,'Pol Moreno','assets/images/person_icon.png',2009,13,'LD',4),(7,'Alfredo Tiffón','assets/images/person_icon.png',2009,13,'MC',4),(8,'Roberto Tomás','assets/images/person_icon.png',2009,13,'MP',4),(9,'Taemin Noh','assets/images/person_icon.png',2009,13,'DC',4),(10,'Welson Jiménez','assets/images/person_icon.png',2009,13,'DC',4);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rounds`
--

DROP TABLE IF EXISTS `rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rounds` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `date` date DEFAULT NULL,
  `competition` int(11) unsigned NOT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `round_competitionId` (`competition`),
  KEY `round_userId` (`userId`),
  CONSTRAINT `round_competitionId` FOREIGN KEY (`competition`) REFERENCES `competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `round_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rounds`
--

LOCK TABLES `rounds` WRITE;
/*!40000 ALTER TABLE `rounds` DISABLE KEYS */;
INSERT INTO `rounds` VALUES (13,'Jornada 1','2019-12-03',3,4),(14,'Jornada 2','2019-12-03',3,4),(15,'Jornada 3','2019-12-03',3,4),(16,'Jornada 4','2019-12-03',3,4),(17,'Jornada 5','2019-12-03',3,4),(18,'Jornada 6','2019-12-03',3,4),(19,'Jornada 7','2019-12-03',3,4),(20,'Jornada 8','2019-12-03',3,4),(21,'Jornada 9','2019-12-03',3,4),(22,'Jornada 10','2019-12-14',3,4),(23,'Jornada 11','2019-12-21',3,4),(25,'Jornada 12','2020-01-11',3,4),(28,'Jornada 1','2020-01-17',6,4),(29,'Jornada 2','2020-01-17',6,4),(30,'Jornada 3','2020-01-17',6,4),(31,'Jornada 4','2020-01-17',6,4),(32,'Jornada 5','2020-01-17',6,4),(33,'Jornada 6','2020-01-17',6,4),(34,'Jornada 7','2020-01-17',6,4),(35,'Jornada 8','2020-01-17',6,4),(36,'Jornada 9','2020-01-17',6,4),(37,'Jornada 10','2020-01-17',6,4),(38,'Jornada 11','2020-01-17',6,4),(39,'Jornada 12','2020-01-17',6,4),(40,'Jornada 13','2020-01-17',6,4),(41,'Jornada 14','2020-01-17',6,4),(42,'Jornada 15','2020-01-17',6,4),(43,'Jornada 16','2020-01-17',6,4),(44,'Jornada 17','2020-01-17',6,4),(45,'Jornada 18','2020-01-17',6,4),(46,'Jornada 19','2020-01-17',6,4),(47,'Jornada 20','2020-01-17',6,4),(48,'Jornada 21','2020-01-17',6,4),(49,'Jornada 22','2020-01-17',6,4),(50,'Jornada 23','2020-01-17',6,4),(51,'Jornada 24','2020-01-17',6,4),(52,'Jornada 25','2020-01-17',6,4),(53,'Jornada 26','2020-01-17',6,4),(54,'Jornada 27','2020-01-17',6,4),(55,'Jornada 28','2020-01-17',6,4),(56,'Jornada 29','2020-01-17',6,4),(57,'Jornada 30','2020-01-17',6,4),(58,'Jornada 13','2020-01-20',3,4),(59,'Jornada 14','2020-01-27',3,4),(60,'Jornada 15','2020-02-02',3,4),(61,'Jornada 16','2020-02-10',3,4),(62,'Jornada 17','2020-02-17',3,4),(63,'Jornada 18','2020-03-06',3,4),(64,'Jornada 19','2020-03-08',3,4);
/*!40000 ALTER TABLE `rounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `substitutions`
--

DROP TABLE IF EXISTS `substitutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `substitutions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `playerIn` int(11) unsigned DEFAULT NULL,
  `playerOut` int(11) unsigned DEFAULT NULL,
  `minute` int(11) DEFAULT '0',
  `matchId` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `substitution_playerIn` (`playerIn`),
  KEY `substitution_playerOut` (`playerOut`),
  KEY `substitution_match` (`matchId`),
  KEY `substitution_matchpart` (`matchpart`),
  KEY `substitution_userId` (`userId`),
  CONSTRAINT `substitution_match` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_matchpart` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_playerIn` FOREIGN KEY (`playerIn`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_playerOut` FOREIGN KEY (`playerOut`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `substitutions`
--

LOCK TABLES `substitutions` WRITE;
/*!40000 ALTER TABLE `substitutions` DISABLE KEYS */;
INSERT INTO `substitutions` VALUES (5,3,4,7,10,4,25),(6,5,6,7,10,4,25),(7,8,9,7,10,4,25),(8,6,10,10,10,4,25);
/*!40000 ALTER TABLE `substitutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teams` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT NULL,
  `signupDate` datetime DEFAULT NULL,
  `manager` int(11) unsigned DEFAULT NULL,
  `season` varchar(50) NOT NULL DEFAULT '',
  `competition` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `team_competitionId` (`competition`),
  KEY `team_userId` (`userId`),
  CONSTRAINT `team_competitionId` FOREIGN KEY (`competition`) REFERENCES `competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (13,'FUNDACIÓ CORNELLÀ \"D\"','assets/images/1575279505166-fcornella.png','2019-12-02 10:38:25',4,'19/20',3,4),(14,'C.E.L\'HOSPITALET \"E\"','assets/images/1575296242288-1553118652927-hospi.png','2019-12-02 15:17:22',NULL,'19/20',3,4),(15,'SANTBOIÀ \"B\"','assets/images/1575296321525-1571061665668-santboia.png','2019-12-02 15:18:42',NULL,'19/20',3,4),(16,'CAN BUXERES \"B\"','assets/images/1575296446027-1553117716055-canbu.png','2019-12-02 15:20:46',NULL,'19/20',3,4),(17,'E.F.GAVÀ \"E\"','assets/images/1575296472232-1571058607030-gava.png','2019-12-02 15:21:12',NULL,'19/20',3,4),(18,'ATLÈTIC SANT JUST \"C\"','assets/images/1575299500403-1571062061749-santjust.png','2019-12-02 16:11:40',NULL,'19/20',3,4),(19,'CAN VIDALET \"B\"','assets/images/1575299530956-CANVI.png','2019-12-02 16:12:11',NULL,'19/20',3,4),(20,'ESPLUGUENC \"A\"','assets/images/1575299554710-espluguenc.png','2019-12-02 16:12:35',NULL,'19/20',3,4),(21,'CASTELLDEFELS \"C\"','assets/images/1575299576665-castelldefels.png','2019-12-02 16:12:57',NULL,'19/20',3,4),(22,'A.E.PRAT \"B\"','assets/images/1575299605473-aeprat.png','2019-12-02 16:13:26',NULL,'19/20',3,4),(23,'U.D.VILADECANS \"B\"','assets/images/1575299633875-viladecans.png','2019-12-02 16:13:54',NULL,'19/20',3,4),(24,'CIUDAD COOPERATIVA \"A\"','assets/images/1575299651962-COOPE.png','2019-12-02 16:14:12',NULL,'19/20',3,4),(25,'FUNDACIÓ EUROPA \"B\"','assets/images/1575299728372-fundeuropa.png','2019-12-02 16:15:28',NULL,'19/20',3,4),(26,'PUBILLA CASAS \"A\"','assets/images/1575299746614-pubilla.png','2019-12-02 16:15:47',NULL,'19/20',3,4),(27,'UNIFICACIÓN BELLVITGE \"A\"','assets/images/1575299770738-bellvitge.png','2019-12-02 16:16:11',NULL,'19/20',3,4),(28,'CUBELLES \"D\"','assets/images/1575299787451-cubelles.png','2019-12-02 16:16:27',NULL,'19/20',3,4),(31,'E.F. GAVÀ \"B\"','assets/images/1579261242766-1571057821354-gava.png','2020-01-17 12:40:43',4,'18/19',6,4),(32,'F.C.BARCELONA \"D\"','assets/images/1579270970331-1553001042279-fcb.png','2020-01-17 15:22:50',NULL,'18/19',6,4),(33,'TERLENKA BARCELONISTA C.F. \"A\"','assets/images/1579271003143-1553117652298-terlenka.png','2020-01-17 15:23:23',NULL,'18/19',6,4),(34,'C.E.L\'HOSPITALET \"D\"','assets/images/1579271077878-1553118652927-hospi.png','2020-01-17 15:24:38',NULL,'18/19',6,4),(35,'C.P.SARRIÀ \"A\"','assets/images/1579271107246-1553117989772-cp-sarria.png','2020-01-17 15:25:07',NULL,'18/19',6,4),(36,'MARTINENC \"C\"','assets/images/1579271145181-1553117509144-martinenc.png','2020-01-17 15:25:45',NULL,'18/19',6,4),(37,'P.B.ANGUERA \"A\"','assets/images/1579271176551-1553118622698-anguera.png','2020-01-17 15:26:17',NULL,'18/19',6,4),(38,'CAN BUXERES \"A\"','assets/images/1579271213015-1553117716055-canbu.png','2020-01-17 15:26:53',NULL,'18/19',6,4),(39,'CATALONIA \"A\"','assets/images/1579271259432-1553118307987-catalonia.png','2020-01-17 15:27:39',NULL,'18/19',6,4),(40,'P.B.COLLBLANC SANTS \"A\"','assets/images/1579271278271-1571057982148-1553118001847-pb-collblanc.png','2020-01-17 15:27:58',NULL,'18/19',6,4),(41,'RACING SARRIÀ \"A\"','assets/images/1579271309739-1553001179734-racing.jpg','2020-01-17 15:28:30',NULL,'18/19',6,4),(42,'VILA OLÍMPICA \"B\"','assets/images/1579271363453-1553118636953-vila.png','2020-01-17 15:29:23',NULL,'18/19',6,4),(43,'CAN RULL RÓMULO TRONCHONI \"A\"','assets/images/1579271431023-1553118666257-canrull.png','2020-01-17 15:30:31',NULL,'18/19',6,4),(44,'C.E.EUROPA \"B\"','assets/images/1579271462702-1553118316534-ceeuropa.png','2020-01-17 15:31:03',NULL,'18/19',6,4),(45,'MATARÓ C.E. \"C\"','assets/images/1579271516103-1553118328490-mataro.png','2020-01-17 15:31:56',NULL,'18/19',6,4),(49,'ESPLUGUENC \"A\"','assets/images/1579271668834-1553104592299-espluguenc.png','2020-01-17 15:34:29',NULL,'18/19',6,4);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `provider` varchar(255) NOT NULL DEFAULT '',
  `provider_id` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `signupDate` datetime DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'manel@gmail.com','Manel Méndez',NULL,'local',NULL,'$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.','2019-11-22 11:40:38','2020-03-12 00:47:52'),(5,'cristian@gmail.com','Cristian',NULL,'local',NULL,'$2a$10$3dyoWvpMwsyvvmrNFTzTYuwHIYjv4ttxG3qquFCKumec9s5TOCLAm','2019-12-02 12:46:52','2019-12-13 16:07:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-18  0:26:08