-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2024 at 11:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `growth91`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_documents`
--

CREATE TABLE `admin_documents` (
  `admindocID` bigint(20) UNSIGNED NOT NULL,
  `admindocName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admindocForDeal` enum('Yes','No') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'No',
  `admindocForInvestor` enum('Yes','No') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'No',
  `admindocForFounder` enum('Yes','No') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'No',
  `admindocForAll` enum('Yes','No') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'No',
  `admindocActive` enum('Yes','No') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Yes',
  `admindocDeleted` enum('Yes','No') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'No',
  `admindocDescription` varchar(4000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admindocFile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_documents_for`
--

CREATE TABLE `admin_documents_for` (
  `forID` bigint(21) NOT NULL,
  `admindocID` int(11) NOT NULL,
  `deal_id` int(11) NOT NULL DEFAULT 0,
  `investor_id` int(11) NOT NULL DEFAULT 0,
  `founder_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_documents`
--
ALTER TABLE `admin_documents`
  ADD PRIMARY KEY (`admindocID`);

--
-- Indexes for table `admin_documents_for`
--
ALTER TABLE `admin_documents_for`
  ADD PRIMARY KEY (`forID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_documents`
--
ALTER TABLE `admin_documents`
  MODIFY `admindocID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_documents_for`
--
ALTER TABLE `admin_documents_for`
  MODIFY `forID` bigint(21) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
