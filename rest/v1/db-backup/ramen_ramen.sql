-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 12:46 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ramen_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `ramen_ramen`
--

CREATE TABLE `ramen_ramen` (
  `ramen_aid` int(11) NOT NULL,
  `ramen_title` varchar(50) NOT NULL,
  `ramen_price` varchar(20) NOT NULL,
  `ramen_image` varchar(20) NOT NULL,
  `ramen_category` varchar(50) NOT NULL,
  `ramen_ingredients` text NOT NULL,
  `ramen_is_active` tinyint(1) NOT NULL,
  `ramen_datetime` varchar(20) NOT NULL,
  `ramen_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ramen_ramen`
--

INSERT INTO `ramen_ramen` (`ramen_aid`, `ramen_title`, `ramen_price`, `ramen_image`, `ramen_category`, `ramen_ingredients`, `ramen_is_active`, `ramen_datetime`, `ramen_created`) VALUES
(1, 'Ramen', '250', 'slider-4.webp', 'shoyu-tonkotsu', '[\"Egg\",\"Noodles\",\"Mushroom\",\"Charsui\"]', 1, '2024-10-28 07:43:12', '2024-10-28 07:43:12'),
(2, 'Ramen 2', '300', 'slider-6.webp', 'shoyu-shikatake', '[\"Char Siu\",\"Noodles\",\"Green Onion\"]', 1, '2024-10-28 07:44:31', '2024-10-28 07:44:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ramen_ramen`
--
ALTER TABLE `ramen_ramen`
  ADD PRIMARY KEY (`ramen_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ramen_ramen`
--
ALTER TABLE `ramen_ramen`
  MODIFY `ramen_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
