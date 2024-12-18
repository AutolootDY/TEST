-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 17, 2024 at 05:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `com_security`
--

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `log_id` int(11) NOT NULL,
  `log_date` date NOT NULL,
  `log_time` time NOT NULL,
  `ipv4` varchar(20) NOT NULL,
  `country` varchar(40) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `log_email` varchar(50) NOT NULL,
  `status_email` tinyint(1) NOT NULL,
  `status_login` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`log_id`, `log_date`, `log_time`, `ipv4`, `country`, `latitude`, `longitude`, `log_email`, `status_email`, `status_login`) VALUES
(149, '2022-10-10', '21:36:30', '101.109.23.155', 'Thailand(TH)', 13.05, 100.933, 'natdanai.kra@ku.th', 1, 1),
(154, '2024-10-13', '21:30:40', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(155, '2024-10-13', '21:35:03', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(156, '2024-10-14', '19:43:16', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(157, '2024-10-14', '19:44:22', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(158, '2024-10-14', '19:45:23', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(159, '2024-10-14', '20:02:47', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 0),
(160, '2024-10-14', '20:04:11', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 0),
(161, '2024-10-14', '20:04:19', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(162, '2024-10-14', '22:32:52', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(163, '2024-10-14', '22:43:48', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(164, '2024-10-14', '23:08:26', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(165, '2024-10-14', '23:11:34', '158.108.231.68', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(171, '2024-10-15', '20:28:42', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(172, '2024-10-15', '20:29:05', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(173, '2024-10-15', '20:29:31', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(174, '2024-10-15', '20:30:34', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(175, '2024-10-15', '20:30:44', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23427@gmail.com', 1, 1),
(179, '2024-10-16', '20:13:30', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat23421@gmail.com', 1, 1),
(180, '2024-10-17', '13:54:17', '49.229.137.113', 'Thailand(TH)', 13.8583, 100.469, 'pairat23421@gmiil.com', 0, 0),
(202, '2024-10-17', '21:09:38', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat.sa@ku.th', 1, 1),
(203, '2024-10-17', '21:58:21', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat.sa@ku.th', 1, 1),
(204, '2024-10-17', '22:00:07', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat.sa@ku.th', 1, 1),
(205, '2024-10-17', '22:28:26', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat.sa@ku.th', 1, 1),
(209, '2024-10-17', '22:29:47', '158.108.229.5', 'Thailand(TH)', 13.75, 100.467, 'pairat.sa@ku.th', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `log_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `data_log` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data_log`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`log_id`, `date`, `data_log`) VALUES
(2, '2022-10-08', '[{\"log_datetime\":\"2022-10-08T16:23:10.029Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:24:05.003Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:25:54.738Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:02.223Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:04.159Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:09.341Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:10.862Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:12.534Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:13.944Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:20.905Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:21.771Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:22.207Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:22.447Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:22.693Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:22.951Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:23.207Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:23.439Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:31.761Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:32.597Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:32.814Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:33.622Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:33.857Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true},{\"log_datetime\":\"2022-10-08T16:26:34.028Z\",\"ipv4\":\"158.108.228.133\",\"country\":\"Thailand\",\"latitude\":13.75,\"longitude\":100.4667,\"log_email\":\"test@email.com\",\"status_email\":true,\"status_login\":true}]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `question` varchar(100) NOT NULL,
  `answer` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `password_time` datetime NOT NULL,
  `password_history` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`password_history`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `question`, `answer`, `role`, `password_time`, `password_history`) VALUES
(16, 'pairat23421@gmail.com', '$2b$10$/HP0Zbs4E9zLz1e9ed/kxuHdkWf/uVrcmx16saQT63DWbC/GxBFtG', 'asd', 'sad', 'what\'s your favorite food', 'egg', 'user', '2023-10-01 20:13:10', '[\"$2b$10$/HP0Zbs4E9zLz1e9ed/kxuHdkWf/uVrcmx16saQT63DWbC/GxBFtG\"]'),
(17, 'pairat23427@gmail.com', '$2b$10$WdpP476a9BES6lnpr8R8QO2FrKKN5xIWa.8ThvPMxI7NEeGpz4vMy', 'ass', 'sad', 'what\'s your favorite food', 'egg', 'user', '2024-10-17 15:50:11', '[\"$2b$10$WK1lTgJZcvXGmpc25TYOh.wvXgPVUY1W68izZn6y6018rqswLL7re\",\"$2b$10$d1Qa2ZTVauBusxTpz.3.TencOKmAFpDTV8kniUqwhRyCVTRev44m2\",\"$2b$10$JW0NgKmeTt.8c2Ueuan7v.mJpgGVdmvZs43rVkJqGedPlsE0w0xF.\",\"$2b$10$GK8CPgFaGhxtlPw/StQ75./BIaEh2okiqEUXAZZ0fvD.CTwD0rsuG\",\"$2b$10$WdpP476a9BES6lnpr8R8QO2FrKKN5xIWa.8ThvPMxI7NEeGpz4vMy\"]'),
(19, 'pairat.sa@ku.th', '$2b$10$CVWtwd7HlEEBCHHKQJyONedDe0eLACH6GxRNKwn5XOkMc0CLu45MS', 'asd', 'asd', 'what\'s your favorite food', 'egg', 'user', '2024-10-17 21:57:18', '[\"$2b$10$CVWtwd7HlEEBCHHKQJyONedDe0eLACH6GxRNKwn5XOkMc0CLu45MS\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
