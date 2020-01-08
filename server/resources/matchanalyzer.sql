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

# Volcado de tabla assists
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assists`;

CREATE TABLE `assists` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `goal` int(11) unsigned DEFAULT NULL,
  `match` int(11) unsigned DEFAULT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  `player` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assist_playerId` (`player`),
  KEY `assist_match` (`match`),
  KEY `assist_matchpart` (`matchpart`),
  KEY `assist_userId` (`userId`),
  KEY `assist_goal` (`goal`),
  CONSTRAINT `assist_goal` FOREIGN KEY (`goal`) REFERENCES `goals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_match` FOREIGN KEY (`match`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_matchpart` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_playerId` FOREIGN KEY (`player`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assist_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla cards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cards`;

CREATE TABLE `cards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `minute` int(11) DEFAULT '0',
  `type` varchar(50) DEFAULT '',
  `player` int(11) unsigned DEFAULT NULL,
  `match` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `card_playerId` (`player`),
  KEY `card_matchId` (`match`),
  KEY `card_userId` (`userId`),
  KEY `card_matchpartId` (`matchpart`),
  CONSTRAINT `card_matchId` FOREIGN KEY (`match`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `card_matchpartId` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `card_playerId` FOREIGN KEY (`player`) REFERENCES `players` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `card_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla competitions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `competitions`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;

INSERT INTO `competitions` (`id`, `name`, `season`, `discipline`, `category`, `manager`, `signupDate`, `userId`)
VALUES
	(3,'2a División Grupo 5','19/20','F7','Alevín',4,'2019-11-22 15:23:25',4);

/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla goals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `goals`;

CREATE TABLE `goals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `minute` int(11) NOT NULL DEFAULT '0',
  `type` varchar(50) NOT NULL DEFAULT '',
  `player` int(11) unsigned DEFAULT NULL,
  `match` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goal_playerId` (`player`),
  KEY `goal_matchId` (`match`),
  KEY `goal_userId` (`userId`),
  CONSTRAINT `goal_martchpartId` FOREIGN KEY (`id`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goal_matchId` FOREIGN KEY (`match`) REFERENCES `matches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `goal_playerId` FOREIGN KEY (`id`) REFERENCES `players` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `goal_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla matches
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matches`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;

INSERT INTO `matches` (`id`, `localTeam`, `awayTeam`, `matchDay`, `round`, `competition`, `localTeamGoals`, `awayTeamGoals`, `userId`)
VALUES
	(6,18,19,'2019-12-03',13,3,4,5,4),
	(7,20,21,'2019-12-03',13,3,2,1,4),
	(8,16,22,'2019-12-03',13,3,12,5,4),
	(9,27,17,'2019-12-03',13,3,2,4,4),
	(10,13,23,'2019-12-03',13,3,8,0,4),
	(11,24,28,'2019-12-03',13,3,5,4,4),
	(12,15,14,'2019-12-03',13,3,1,5,4),
	(13,22,20,'2019-12-03',14,3,4,0,4),
	(14,21,15,'2019-12-03',14,3,4,6,4),
	(15,28,13,'2019-12-03',14,3,0,18,4),
	(16,17,25,'2019-12-03',14,3,6,2,4),
	(17,23,16,'2019-12-03',14,3,7,3,4),
	(18,19,27,'2019-12-03',14,3,5,2,4),
	(19,26,24,'2019-12-03',14,3,0,3,4),
	(20,14,18,'2019-12-03',14,3,3,2,4),
	(21,20,23,'2019-12-03',15,3,5,1,4),
	(22,19,14,'2019-12-03',15,3,1,2,4),
	(23,18,21,'2019-12-03',15,3,3,2,4),
	(24,16,28,'2019-12-03',15,3,15,0,4),
	(25,24,17,'2019-12-03',15,3,2,4,4),
	(26,27,25,'2019-12-03',15,3,1,2,4),
	(27,13,26,'2019-12-03',15,3,8,0,4),
	(28,15,22,'2019-12-03',15,3,4,3,4),
	(29,22,18,'2019-12-03',16,3,3,2,4),
	(30,17,13,'2019-12-03',16,3,0,8,4),
	(31,28,20,'2019-12-03',16,3,1,5,4),
	(32,23,15,'2019-12-03',16,3,2,0,4),
	(33,21,19,'2019-12-03',16,3,5,4,4),
	(34,26,16,'2019-12-03',16,3,3,4,4),
	(35,14,27,'2019-12-03',16,3,4,1,4),
	(36,25,24,'2019-12-03',16,3,5,1,4),
	(37,20,26,'2019-12-03',17,3,1,3,4),
	(38,16,17,'2019-12-03',17,3,4,4,4),
	(39,14,21,'2019-12-03',17,3,3,2,4),
	(40,19,22,'2019-12-03',17,3,5,7,4),
	(41,27,24,'2019-12-03',17,3,5,6,4),
	(42,13,25,'2019-12-03',17,3,6,0,4),
	(43,15,28,'2019-12-03',17,3,6,0,4),
	(44,18,23,'2019-12-03',17,3,3,0,4),
	(45,22,14,'2019-12-03',18,3,1,4,4),
	(46,28,18,'2019-12-03',18,3,0,8,4),
	(47,23,19,'2019-12-03',18,3,4,2,4),
	(48,17,20,'2019-12-03',18,3,3,2,4),
	(49,26,15,'2019-12-03',18,3,4,4,4),
	(50,24,13,'2019-12-03',18,3,0,13,4),
	(51,25,16,'2019-12-03',18,3,3,6,4),
	(52,21,27,'2019-12-03',18,3,4,3,4),
	(53,15,17,'2019-12-03',19,3,5,2,4),
	(54,20,25,'2019-12-03',19,3,6,2,4),
	(55,21,22,'2019-12-03',19,3,0,4,4),
	(56,16,24,'2019-12-03',19,3,2,3,4),
	(57,18,26,'2019-12-03',19,3,3,2,4),
	(58,27,13,'2019-12-03',19,3,2,6,4),
	(59,14,23,'2019-12-03',19,3,4,0,4),
	(60,19,28,'2019-12-03',19,3,6,0,4),
	(61,25,15,'2019-12-03',20,3,3,7,4),
	(62,22,27,'2019-12-03',20,3,2,3,4),
	(63,23,21,'2019-12-03',20,3,1,5,4),
	(64,17,18,'2019-12-03',20,3,2,1,4),
	(65,26,19,'2019-12-03',20,3,1,2,4),
	(66,24,20,'2019-12-03',20,3,1,3,4),
	(67,28,14,'2019-12-03',20,3,2,5,4),
	(68,13,16,'2019-12-03',20,3,6,2,4),
	(69,22,23,'2019-12-03',21,3,3,4,4),
	(70,20,13,'2019-12-03',21,3,0,7,4),
	(71,18,25,'2019-12-03',21,3,4,2,4),
	(72,21,28,'2019-12-03',21,3,9,0,4),
	(73,19,17,'2019-12-03',21,3,3,2,4),
	(74,27,16,'2019-12-03',21,3,2,3,4),
	(75,14,26,'2019-12-03',21,3,4,1,4),
	(76,15,24,'2019-12-03',21,3,7,5,4),
	(77,25,19,'2019-12-14',22,3,7,4,4),
	(78,28,22,'2019-12-14',22,3,4,5,4),
	(79,16,20,'2019-12-14',22,3,1,0,4),
	(80,17,14,'2019-12-14',22,3,1,1,4),
	(81,26,21,'2019-12-14',22,3,2,3,4),
	(82,24,18,'2019-12-14',22,3,4,5,4),
	(83,23,27,'2019-12-16',22,3,2,3,4),
	(84,13,15,'2019-12-16',22,3,10,4,4),
	(85,18,13,'2019-12-21',23,3,2,5,4),
	(86,19,24,'2019-12-21',23,3,4,1,4),
	(87,22,26,'2019-12-21',23,3,5,2,4),
	(88,23,28,'2019-12-21',23,3,4,1,4),
	(89,15,16,'2019-12-21',23,3,1,5,4),
	(90,27,20,'2019-12-21',23,3,3,1,4),
	(91,14,25,'2019-12-21',23,3,1,3,4),
	(96,21,17,'2019-12-31',23,3,1,5,4);

/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla matchparts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matchparts`;

CREATE TABLE `matchparts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `match` int(11) unsigned NOT NULL,
  `formation` varchar(50) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `team` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `matchpart_match` (`match`),
  KEY `matchpart_team` (`team`),
  KEY `matchpart_userId` (`userId`),
  CONSTRAINT `matchpart_match` FOREIGN KEY (`match`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matchpart_team` FOREIGN KEY (`team`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matchpart_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla players
# ------------------------------------------------------------

DROP TABLE IF EXISTS `players`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;

INSERT INTO `players` (`id`, `name`, `avatar`, `year`, `team`, `position`, `userId`)
VALUES
	(1,'Pau Sabio','assets/images/person_icon.png','2009',13,'PT',4),
	(2,'Adrián Cuadrado','assets/images/person_icon.png','2009',13,'CT',4),
	(3,'Vadym Bilanchyk','assets/images/person_icon.png','2009',13,'CT',4),
	(4,'Marc Morilla','assets/images/person_icon.png','2009',13,'LD',4),
	(5,'Luc Gironès','assets/images/person_icon.png','2009',13,'LI',4),
	(6,'Pol Moreno','assets/images/person_icon.png','2009',13,'LD',4),
	(7,'Alfredo Tiffón','assets/images/person_icon.png','2009',13,'MC',4),
	(8,'Roberto Tomás','assets/images/person_icon.png','2009',13,'MP',4),
	(9,'Taemin Noh','assets/images/person_icon.png','2009',13,'DC',4),
	(10,'Welson Jiménez','assets/images/person_icon.png','2009',13,'DC',4);

/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla rounds
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rounds`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `rounds` WRITE;
/*!40000 ALTER TABLE `rounds` DISABLE KEYS */;

INSERT INTO `rounds` (`id`, `name`, `date`, `competition`, `userId`)
VALUES
	(13,'Jornada 1','2019-12-03',3,4),
	(14,'Jornada 2','2019-12-03',3,4),
	(15,'Jornada 3','2019-12-03',3,4),
	(16,'Jornada 4','2019-12-03',3,4),
	(17,'Jornada 5','2019-12-03',3,4),
	(18,'Jornada 6','2019-12-03',3,4),
	(19,'Jornada 7','2019-12-03',3,4),
	(20,'Jornada 8','2019-12-03',3,4),
	(21,'Jornada 9','2019-12-03',3,4),
	(22,'Jornada 10','2019-12-14',3,4),
	(23,'Jornada 11','2019-12-21',3,4);

/*!40000 ALTER TABLE `rounds` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla substitutions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `substitutions`;

CREATE TABLE `substitutions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `playerIn` int(11) unsigned DEFAULT NULL,
  `playerOut` int(11) unsigned DEFAULT NULL,
  `minute` int(11) DEFAULT '0',
  `match` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  `matchpart` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `substitution_playerIn` (`playerIn`),
  KEY `substitution_playerOut` (`playerOut`),
  KEY `substitution_match` (`match`),
  KEY `substitution_matchpart` (`matchpart`),
  KEY `substitution_userId` (`userId`),
  CONSTRAINT `substitution_match` FOREIGN KEY (`match`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_matchpart` FOREIGN KEY (`matchpart`) REFERENCES `matchparts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_playerIn` FOREIGN KEY (`playerIn`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_playerOut` FOREIGN KEY (`playerOut`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `substitution_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla teams
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teams`;

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
  UNIQUE KEY `name` (`name`),
  KEY `team_competitionId` (`competition`),
  KEY `team_userId` (`userId`),
  CONSTRAINT `team_competitionId` FOREIGN KEY (`competition`) REFERENCES `competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;

INSERT INTO `teams` (`id`, `name`, `avatar`, `signupDate`, `manager`, `season`, `competition`, `userId`)
VALUES
	(13,'FUNDACIÓ CORNELLÀ \"D\"','assets/images/1575279505166-fcornella.png','2019-12-02 10:38:25',4,'19/20',3,4),
	(14,'C.E.L\'HOSPITALET \"E\"','assets/images/1575296242288-1553118652927-hospi.png','2019-12-02 15:17:22',NULL,'19/20',3,4),
	(15,'SANTBOIÀ \"B\"','assets/images/1575296321525-1571061665668-santboia.png','2019-12-02 15:18:42',NULL,'19/20',3,4),
	(16,'CAN BUXERES \"B\"','assets/images/1575296446027-1553117716055-canbu.png','2019-12-02 15:20:46',NULL,'19/20',3,4),
	(17,'E.F.GAVÀ \"E\"','assets/images/1575296472232-1571058607030-gava.png','2019-12-02 15:21:12',NULL,'19/20',3,4),
	(18,'ATLÈTIC SANT JUST \"C\"','assets/images/1575299500403-1571062061749-santjust.png','2019-12-02 16:11:40',NULL,'19/20',3,4),
	(19,'CAN VIDALET \"B\"','assets/images/1575299530956-CANVI.png','2019-12-02 16:12:11',NULL,'19/20',3,4),
	(20,'ESPLUGUENC \"A\"','assets/images/1575299554710-espluguenc.png','2019-12-02 16:12:35',NULL,'19/20',3,4),
	(21,'CASTELLDEFELS \"C\"','assets/images/1575299576665-castelldefels.png','2019-12-02 16:12:57',NULL,'19/20',3,4),
	(22,'A.E.PRAT \"B\"','assets/images/1575299605473-aeprat.png','2019-12-02 16:13:26',NULL,'19/20',3,4),
	(23,'U.D.VILADECANS \"B\"','assets/images/1575299633875-viladecans.png','2019-12-02 16:13:54',NULL,'19/20',3,4),
	(24,'CIUDAD COOPERATIVA \"A\"','assets/images/1575299651962-COOPE.png','2019-12-02 16:14:12',NULL,'19/20',3,4),
	(25,'FUNDACIÓ EUROPA \"B\"','assets/images/1575299728372-fundeuropa.png','2019-12-02 16:15:28',NULL,'19/20',3,4),
	(26,'PUBILLA CASAS \"A\"','assets/images/1575299746614-pubilla.png','2019-12-02 16:15:47',NULL,'19/20',3,4),
	(27,'UNIFICACIÓN BELLVITGE \"A\"','assets/images/1575299770738-bellvitge.png','2019-12-02 16:16:11',NULL,'19/20',3,4),
	(28,'CUBELLES \"D\"','assets/images/1575299787451-cubelles.png','2019-12-02 16:16:27',NULL,'19/20',3,4);

/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `name`, `avatar`, `provider`, `provider_id`, `password`, `signupDate`, `lastLogin`)
VALUES
	(4,'manel@gmail.com','Manel Méndez',NULL,'local',NULL,'$2a$10$LdvJUx0MGXB5Ku4ZAV4XJeuq6WlPjLT94PlMYWqGy.RaMMlO0AiR.','2019-11-22 11:40:38','2020-01-04 04:31:10'),
	(5,'cristian@gmail.com','Cristian',NULL,'local',NULL,'$2a$10$3dyoWvpMwsyvvmrNFTzTYuwHIYjv4ttxG3qquFCKumec9s5TOCLAm','2019-12-02 12:46:52','2019-12-13 16:07:55');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
