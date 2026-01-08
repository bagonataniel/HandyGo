-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 08. 10:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `handygo`
--
CREATE DATABASE IF NOT EXISTS `handygo` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `handygo`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `created_at`) VALUES
(1, 'bagonataniel', '$2b$10$9WgNbw49j9fQaE5IMf.yOu10tEmteT6NFyIRRKk0Iq7j2ct00Ruoy', '2025-12-08 10:39:30');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `service_id` char(36) NOT NULL,
  `client_id` char(36) NOT NULL,
  `worker_id` char(36) NOT NULL,
  `status` enum('elfogadásra vár','folyamatban','kész') NOT NULL DEFAULT 'elfogadásra vár',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reviews`
--

CREATE TABLE `reviews` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `service_id` char(36) NOT NULL,
  `client_id` char(36) NOT NULL,
  `worker_id` char(36) NOT NULL,
  `rating` tinyint(4) NOT NULL CHECK (`rating` between 1 and 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `services`
--

CREATE TABLE `services` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `worker_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `availability` enum('elérhető','lefoglalt') NOT NULL DEFAULT 'elérhető',
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `services`
--

INSERT INTO `services` (`id`, `worker_id`, `title`, `description`, `category`, `price`, `latitude`, `longitude`, `availability`, `status`) VALUES
('0975f733-d422-11f0-87dc-309c23b76b61', '94e8623e-d421-11f0-87dc-309c23b76b61', 'Természetfotózás – külső helyszínen', 'Több éve tapasztalattal rendelkező fotós természetfotósorozatot készít kedvező áron. Az ár vonatkozik 2–3 órás fotózásra, digitális képekkel.', 'Fotózás', 10000.00, 47.5334981, 19.0706155, 'elérhető', 'rejected'),
('e7e03f4e-d421-11f0-87dc-309c23b76b61', 'a20ce5d5-d421-11f0-87dc-309c23b76b61', 'Csőtörés javítás – Budapest V. kerület', 'Rövid határidővel csőtörés javítás, mosdó, konyha, WC. Szakavatott vízszerelő gyors kiszállással. Szerszám, alkatrész, és tisztítás benne.', 'Vízszerelés', 15000.00, 47.4999448, 19.0505488, 'elérhető', 'approved');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `bio`, `skills`, `latitude`, `longitude`, `location`, `created_at`, `is_verified`) VALUES
('94e8623e-d421-11f0-87dc-309c23b76b61', 'Nagy Béla', 'bela.nagy@example.com', '$2b$10$aG.jVMFvBi5zZcL4OUQPpeQ0y0kPWLCnWPrNBSseBunoJI9xvAYmi', NULL, NULL, NULL, NULL, NULL, '2025-12-08 10:35:14', 0),
('a20ce5d5-d421-11f0-87dc-309c23b76b61', 'Farkas Emese', 'emese.farkas@example.com', '$2b$10$wmLFoHXH0ef8YQzNBg1/2.dDzN1nV7cwIttlMO8idPPHOpXYkq7q.', NULL, NULL, NULL, NULL, NULL, '2025-12-08 10:35:36', 0),
('e1e4a94f-d5c3-11f0-beba-e0d55ed2c0f2', 'Kiss Bela - jelszó: Bela123', 'kiss.bela@example.com', '$2b$10$rM/6NGLWjhAAtLuMke9in.6AtKenScP8fHEqC4wLHAr.KPcC9.YPa', NULL, NULL, NULL, NULL, NULL, '2025-12-10 12:29:33', 0),
('eb3e3ead-d5c3-11f0-beba-e0d55ed2c0f2', 'Nagy Anna - jelszó: Anna1', 'anna.nagy@example.com', '$2b$10$9LnuRqSy6U.7vqer5ublkuVGGiydz47vhk5I3vm9r.qMCMfD8lNlm', NULL, NULL, NULL, NULL, NULL, '2025-12-10 12:29:49', 0),
('eefae026-d5c3-11f0-beba-e0d55ed2c0f2', 'Szabo Peter - jelszó: Peter123', 'szabo.peter@example.com', '$2b$10$zT7SX6FVY3aW7hGi975nGe/6IvZWtpwMzBxXeQ2hru1xNqGF6iABW', NULL, NULL, NULL, NULL, NULL, '2025-12-10 12:29:55', 0),
('f252ec70-d5c3-11f0-beba-e0d55ed2c0f2', 'Horvath Lilla - jelszó: Lilla99', 'lilla.horvath@example.com', '$2b$10$ComKLKqfQqzXVlXgK80.aOPequ37R1vzah2XRbkBGkAFavEivt6U2', NULL, NULL, NULL, NULL, NULL, '2025-12-10 12:30:00', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `worker_id` (`worker_id`);

--
-- A tábla indexei `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `worker_id` (`worker_id`);

--
-- A tábla indexei `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker_id` (`worker_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`worker_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`worker_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
