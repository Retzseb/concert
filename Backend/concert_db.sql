-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 02. 21:52
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
-- Adatbázis: `concert_db`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `concerts`
--

CREATE TABLE `concerts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `performer_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `base_price` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `concerts`
--

INSERT INTO `concerts` (`id`, `name`, `performer_id`, `room_id`, `date`, `base_price`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Tankcsapda – Tavaszi koncert', 10, 1, '2026-03-12 20:00:00', 12990, '', 0, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(2, 'Halott Pénz – Turnéállomás', 11, 3, '2026-04-05 19:30:00', 14990, '', 0, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(3, 'Quimby – Akusztik', 12, 4, '2026-03-22 19:00:00', 11990, '', 0, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(4, 'Analog Balaton – Elektronikus est', 13, 2, '2026-02-28 21:00:00', 9990, '', 0, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(5, 'Jazz Night', 4, 6, '2026-03-01 19:00:00', 8990, '', 0, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(6, 'Akarsz-e játszani?', 15, 8, '2026-04-18 18:30:00', 6990, '', 0, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(7, 'Világok találkozása – Megérthető zene', 8, 7, '2026-05-02 19:00:00', 10990, '', 0, '2026-01-07 20:48:49', '2026-01-07 20:48:49');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(20) NOT NULL,
  `value` tinyint(3) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `discounts`
--

INSERT INTO `discounts` (`id`, `type`, `value`, `created_at`, `updated_at`) VALUES
(1, 'normál', 100, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(2, 'diák', 50, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(3, 'nyugdíjas', 45, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(4, 'vip', 25, '2026-01-07 20:48:49', '2026-01-07 20:48:49'),
(5, 'promo', 10, '2026-01-07 20:48:49', '2026-01-07 20:48:49');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `genres`
--

CREATE TABLE `genres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `genres`
--

INSERT INTO `genres` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'jazz', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(2, 'rock', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(3, 'pop', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(4, 'blues', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(5, 'classical', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(6, 'metal', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(7, 'hip-hop', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(8, 'electronic', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(9, 'folk', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(10, 'alternative', '2026-01-07 20:48:48', '2026-01-07 20:48:48');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_23_081320_create_genres_table', 1),
(5, '2025_10_23_081328_create_performers_table', 1),
(6, '2025_10_23_081347_create_places_table', 1),
(7, '2025_10_23_081415_create_rooms_table', 1),
(8, '2025_10_23_081440_create_seats_table', 1),
(9, '2025_10_23_081503_create_concerts_table', 1),
(10, '2025_10_23_081540_create_discounts_table', 1),
(11, '2025_10_23_081544_create_reservations_table', 1),
(12, '2025_10_23_081559_create_tickets_table', 1),
(13, '2026_01_04_212405_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `performers`
--

CREATE TABLE `performers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `genre` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `description` varchar(255) DEFAULT NULL,
  `country` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `performers`
--

INSERT INTO `performers` (`id`, `name`, `genre`, `description`, `country`, `created_at`, `updated_at`) VALUES
(1, 'Fish!', 3, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(2, 'Kowalsky meg a Vega!', 2, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(3, 'LGT', 2, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(4, 'Budapest Ragtime Band', 1, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(5, 'Ossian!', 6, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(6, 'Moby Dick', 6, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(7, 'Deák Bill Blues Band', 4, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(8, 'Budafoki Dohnányi Ernő Szimfonikus Zenekar', 5, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(9, 'Győri Filharmonikus Zenekar', 5, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(10, 'Tankcsapda', 2, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(11, 'Halott Pénz', 7, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(12, 'Quimby', 10, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(13, 'Analog Balaton', 8, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(14, 'Metallica Tribute', 6, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(15, 'Kaláka', 9, '', 'magyar', '2026-01-07 20:48:48', '2026-01-07 20:48:48');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `places`
--

CREATE TABLE `places` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `city` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `places`
--

INSERT INTO `places` (`id`, `name`, `city`, `address`, `created_at`, `updated_at`) VALUES
(1, 'A38', 'Budapest', 'Petőfi híd, budai hídfő', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(2, 'Budapest Park', 'Budapest', '1095 Budapest, Fábián Juli tér 1.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(3, 'Dürer Kert', 'Budapest', '1117, Budapest, Öböl utca 1.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(4, 'Müpa', 'Budapest', '1095 Budapest, Komor Marcell u. 1.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(5, 'Papp László Sportaréna', 'Budapest', '1143 Budapest, Stefánia út 2.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(6, 'Gyulai Várszínház', 'Gyula', '5700 Gyula, Kossuth u. 13.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(7, 'Tokaj Fesztiválkatlan', 'Tokaj', '3910 Tokaj, Rákóczi út', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(8, 'Kultkikötő', 'Balatonboglár', '8630 Balatonboglár, Parti sétány 11.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(9, 'Boglári Nagyszínpad', 'Balatonboglár', '8630 Balatonboglár, Parti sétány 11.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(10, 'SunCity', 'Balatonfüred', '8230 Balatonfüred, Fürdő u. 35.', '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(11, 'Barba Negra', 'Budapest', '1211 Budapest, Szállító u. 3.', '2026-01-07 20:48:48', '2026-01-07 20:48:48');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `concert_id` bigint(20) UNSIGNED NOT NULL,
  `reservation_date` datetime NOT NULL DEFAULT '2026-01-07 21:48:49',
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `concert_id`, `reservation_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 3, '2022-02-02 03:36:59', 1, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(2, 1, 2, '1984-02-01 04:23:50', 1, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(3, 1, 4, '2001-02-14 05:36:14', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(4, 1, 4, '1998-03-01 05:32:55', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(5, 3, 5, '1977-05-14 17:52:31', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(6, 3, 7, '1989-05-25 08:49:28', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(7, 4, 3, '1986-08-03 13:35:24', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(8, 7, 7, '1995-06-11 19:15:15', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(9, 6, 4, '1981-11-02 02:54:19', 0, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(10, 3, 6, '1989-04-27 07:18:02', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(11, 3, 6, '2000-09-07 14:22:28', 1, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(12, 2, 5, '2009-03-17 13:14:18', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(13, 5, 1, '2004-10-08 21:46:43', 0, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(14, 2, 1, '2009-04-14 03:25:16', 2, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(15, 7, 4, '1996-03-30 01:24:46', 0, '2026-01-07 20:48:50', '2026-01-07 20:48:50');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `place_id` bigint(20) UNSIGNED NOT NULL,
  `name` int(11) NOT NULL,
  `total_rows` int(11) NOT NULL,
  `total_columns` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `rooms`
--

INSERT INTO `rooms` (`id`, `place_id`, `name`, `total_rows`, `total_columns`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 10, 12, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(2, 1, 2, 8, 10, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(3, 2, 1, 12, 14, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(4, 3, 1, 10, 10, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(5, 3, 2, 6, 8, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(6, 4, 1, 14, 16, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(7, 4, 2, 10, 12, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(8, 5, 1, 8, 10, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(9, 6, 1, 10, 12, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(10, 7, 1, 6, 10, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(11, 8, 1, 6, 8, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(12, 9, 1, 10, 10, '2026-01-07 20:48:48', '2026-01-07 20:48:48'),
(13, 10, 1, 12, 10, '2026-01-07 20:48:48', '2026-01-07 20:48:48');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `seats`
--

CREATE TABLE `seats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `row_number` int(11) NOT NULL,
  `column_number` int(11) NOT NULL,
  `price_multiplier` decimal(5,2) NOT NULL DEFAULT 1.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `seats`
--

INSERT INTO `seats` (`id`, `room_id`, `row_number`, `column_number`, `price_multiplier`, `created_at`, `updated_at`) VALUES
(1, 6, 9, 13, 1.32, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(2, 12, 6, 2, 1.81, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(3, 6, 2, 14, 1.31, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(4, 4, 6, 9, 1.30, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(5, 1, 9, 12, 1.00, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(6, 4, 10, 8, 1.62, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(7, 12, 4, 9, 1.04, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(8, 4, 7, 1, 1.89, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(9, 12, 1, 6, 1.34, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(10, 9, 6, 7, 1.32, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(11, 6, 2, 4, 1.96, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(12, 4, 5, 6, 1.52, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(13, 5, 4, 4, 1.22, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(14, 11, 5, 5, 1.55, '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(15, 1, 5, 8, 1.23, '2026-01-07 20:48:50', '2026-01-07 20:48:50');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reservation_id` bigint(20) UNSIGNED NOT NULL,
  `seat_id` bigint(20) UNSIGNED NOT NULL,
  `discount_type` bigint(20) UNSIGNED DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `tickets`
--

INSERT INTO `tickets` (`id`, `reservation_id`, `seat_id`, `discount_type`, `qr_code`, `created_at`, `updated_at`) VALUES
(1, 2, 9, 2, 'A distinctio doloremque quas non culpa omnis.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(2, 15, 12, 2, 'Ut molestiae qui aliquid rerum saepe excepturi rerum.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(3, 5, 15, 4, 'Aut recusandae qui tempora et blanditiis quo odit.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(4, 11, 9, 2, 'Aut eius est et et.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(5, 15, 2, 3, 'Voluptatem molestiae voluptatibus dolore maxime cum aperiam aut.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(6, 7, 9, 4, 'Sed omnis assumenda qui error facere qui itaque.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(7, 6, 12, 3, 'Et quas minus sunt autem reiciendis.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(8, 14, 11, 3, 'Dolores quae eligendi rerum eaque architecto quae et reiciendis.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(9, 8, 5, 2, 'Magni placeat consequatur laudantium ut aliquid sint quia enim.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(10, 5, 9, 3, 'Voluptas nulla cupiditate animi impedit.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(11, 8, 9, 2, 'Voluptas ipsum voluptatibus rem ut rem ut.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(12, 4, 4, 2, 'Quam placeat ipsum ipsam explicabo velit deserunt quia.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(13, 6, 13, 4, 'Sunt nihil nobis molestias veniam et quidem asperiores.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(14, 3, 14, 3, 'Atque deleniti qui ullam nam sapiente.', '2026-01-07 20:48:50', '2026-01-07 20:48:50'),
(15, 11, 14, 3, 'Sunt et omnis ratione quasi nesciunt ipsum.', '2026-01-07 20:48:50', '2026-01-07 20:48:50');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` tinyint(4) NOT NULL DEFAULT 2,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Bíró Eszter', 'biroeszter@gexample.com', NULL, '$2y$12$o1RJHKgrdMgoYUXCLkqE2uiMAQi0sjjWQBLnTJ3Met6z8z6e3yhwK', 0, NULL, '2026-01-07 20:48:45', '2026-01-07 20:48:45'),
(2, 'Szépréthy Regina', 'szeprethyregina@example.com', NULL, '$2y$12$mMolnL4ADgdu4t1E.badSurtn.ivN3NPL8/xjFa3gkoR8vtMgVL7q', 0, NULL, '2026-01-07 20:48:46', '2026-01-07 20:48:46'),
(3, 'Kasszás Piros', 'kasszaspiros@example.com', NULL, '$2y$12$CSWHp.buGnHJl8EKc3F7J..Jsx8SFQ/0n/4JXaU96GaOZnpXkM39a', 1, NULL, '2026-01-07 20:48:46', '2026-01-07 20:48:46'),
(4, 'Pénz Elek', 'penzelek@example.com', NULL, '$2y$12$AzWZL41U9asfMDeEfnUbE.fCkdu2cFVCqjv2LySAr4CIh/EJtt4Ty', 1, NULL, '2026-01-07 20:48:46', '2026-01-07 20:48:46'),
(5, 'Első Elek', 'elsoelek@example.com', NULL, '$2y$12$vIzOAz3c/8VXtLKlk0A0VeJiZ4v7Rnkd0Rrmz6.r3199WeHbIjyvu', 2, NULL, '2026-01-07 20:48:47', '2026-01-07 20:48:47'),
(6, 'Második Mária', 'masodikmaria@example.com', NULL, '$2y$12$J5JhlnVb.nalgPCSQwTxkudb13noG96vNzrFSW5dr3p/s9zPZqsY2', 2, NULL, '2026-01-07 20:48:47', '2026-01-07 20:48:47'),
(7, 'Harmadik Hedvig', 'harmadikhedvig@example.com', NULL, '$2y$12$kKsa238GQJRo16AGAGQd2OTnaV7smZ2WZAtQp4UQU3YJMsh2.9cOi', 2, NULL, '2026-01-07 20:48:47', '2026-01-07 20:48:47'),
(8, 'Test User', 'test@example.com', '2026-01-07 20:48:51', '$2y$12$fqV.MCIKNyaOWhLG6MAxB.2CaKHvV0IyYlEfmUtGDog0gpnZ4Qec2', 2, 'tJTMDHSJHI', '2026-01-07 20:48:51', '2026-01-07 20:48:51');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `concerts`
--
ALTER TABLE `concerts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `concerts_name_room_id_date_unique` (`name`,`room_id`,`date`),
  ADD KEY `concerts_performer_id_foreign` (`performer_id`),
  ADD KEY `concerts_room_id_foreign` (`room_id`);

--
-- A tábla indexei `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `discounts_type_unique` (`type`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- A tábla indexei `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `performers`
--
ALTER TABLE `performers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `performers_genre_foreign` (`genre`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- A tábla indexei `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_user_id_foreign` (`user_id`),
  ADD KEY `reservations_concert_id_foreign` (`concert_id`);

--
-- A tábla indexei `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rooms_place_id_name_unique` (`place_id`,`name`);

--
-- A tábla indexei `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `seats_room_id_row_number_column_number_unique` (`room_id`,`row_number`,`column_number`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tickets_reservation_id_seat_id_unique` (`reservation_id`,`seat_id`),
  ADD KEY `tickets_seat_id_foreign` (`seat_id`),
  ADD KEY `tickets_discount_type_foreign` (`discount_type`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `concerts`
--
ALTER TABLE `concerts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `genres`
--
ALTER TABLE `genres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `performers`
--
ALTER TABLE `performers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `places`
--
ALTER TABLE `places`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `seats`
--
ALTER TABLE `seats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `concerts`
--
ALTER TABLE `concerts`
  ADD CONSTRAINT `concerts_performer_id_foreign` FOREIGN KEY (`performer_id`) REFERENCES `performers` (`id`),
  ADD CONSTRAINT `concerts_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Megkötések a táblához `performers`
--
ALTER TABLE `performers`
  ADD CONSTRAINT `performers_genre_foreign` FOREIGN KEY (`genre`) REFERENCES `genres` (`id`);

--
-- Megkötések a táblához `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_concert_id_foreign` FOREIGN KEY (`concert_id`) REFERENCES `concerts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_place_id_foreign` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`);

--
-- Megkötések a táblához `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Megkötések a táblához `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_discount_type_foreign` FOREIGN KEY (`discount_type`) REFERENCES `discounts` (`id`),
  ADD CONSTRAINT `tickets_reservation_id_foreign` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tickets_seat_id_foreign` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
