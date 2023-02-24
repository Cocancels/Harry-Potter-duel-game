-- --------------------------------------------------------
-- Hôte :                        localhost
-- Version du serveur:           5.7.24 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour hackaton_nodejs
CREATE DATABASE IF NOT EXISTS `hackaton_nodejs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `hackaton_nodejs`;

-- Listage de la structure de la table hackaton_nodejs. games
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` text NOT NULL,
  `winner_id` int(11) NOT NULL,
  `loser_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table hackaton_nodejs.games : ~0 rows (environ)
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
/*!40000 ALTER TABLE `games` ENABLE KEYS */;

-- Listage de la structure de la table hackaton_nodejs. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `house` text NOT NULL,
  `wins` int(11) DEFAULT NULL,
  `loses` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

-- Listage des données de la table hackaton_nodejs.users : ~73 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `firstname`, `lastname`, `house`, `wins`, `loses`, `password`, `nickname`) VALUES
	(9, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(10, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(11, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(12, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(13, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(14, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(15, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(16, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(17, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(18, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(19, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(20, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(21, 'Kélianzad', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(22, '', '', '', NULL, NULL, NULL, NULL),
	(23, '', '', '', NULL, NULL, NULL, NULL),
	(24, '', '', 'Serdaigle', NULL, NULL, NULL, NULL),
	(25, '', '', 'Serdaigle', NULL, NULL, NULL, NULL),
	(26, '', '', '', NULL, NULL, NULL, NULL),
	(27, '', '', '', NULL, NULL, NULL, NULL),
	(28, '', '', '', NULL, NULL, NULL, NULL),
	(29, 'Kélian', 'Raoult Severac', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(30, 'test', 'luzefoizuehf', 'Pouffsouffle', NULL, NULL, NULL, NULL),
	(31, 'azd', 'ezf', 'Serpentard', NULL, NULL, NULL, NULL),
	(32, 'zfzef', 'zef', 'Griffondord', NULL, NULL, NULL, NULL),
	(33, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(34, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(35, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(36, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(37, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(38, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(39, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(40, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(41, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(42, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(43, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(44, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(45, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(46, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(47, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(48, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(49, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(50, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(51, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(52, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(53, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(54, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(55, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(56, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(57, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(58, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(59, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(60, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(61, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(62, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(63, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(64, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(65, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(66, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(67, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(68, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(69, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(70, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(71, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(72, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(73, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(74, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(75, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(76, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, 'zef', 'undefined'),
	(77, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, '$2b$10$24uuZWBqZR2IdwNhi2W62e8mP2tqqwMalTlY5xEFNOsQW3mlwz8LS', 'undefined'),
	(78, 'test', 'Raoult Severac', 'Serpentard', NULL, NULL, '$2b$10$WHF6scRVYMECSQgi/K1H1.9tnbx4GFyi49J06vtvXGUgvleCVmpPS', 'undefined'),
	(79, 'test', 'Raoult Severac', 'Serpentard', NULL, NULL, '$2b$10$.UkTEB4zwbeJ.MCD3sdBP.qXJCzePp5z8XegingV3i70SMxgV1KgG', 'nick'),
	(80, 'test', 'Raoult Severac', 'Serpentard', NULL, NULL, '$2b$10$nB36FoeTq4wGoINFcA8N4.k1Rijue5juoeF9OzvjANWqKgIp.69cy', 'nick'),
	(81, 'Kélian', 'Raoult Severac', 'Griffondord', NULL, NULL, '$2b$10$WOofjq6H9tJhRfG0sBtrsuPhyJ5E0x4WAFScDaHYzj8FvjVlPoujG', 'ezfe');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Listage de la structure de la table hackaton_nodejs. users_spell_equipped
CREATE TABLE IF NOT EXISTS `users_spell_equipped` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `spell_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table hackaton_nodejs.users_spell_equipped : ~0 rows (environ)
/*!40000 ALTER TABLE `users_spell_equipped` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_spell_equipped` ENABLE KEYS */;

-- Listage de la structure de la table hackaton_nodejs. users_spell_unlocked
CREATE TABLE IF NOT EXISTS `users_spell_unlocked` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `spell_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table hackaton_nodejs.users_spell_unlocked : ~0 rows (environ)
/*!40000 ALTER TABLE `users_spell_unlocked` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_spell_unlocked` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
