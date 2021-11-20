-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-11-2021 a las 22:53:22
-- Versión del servidor: 5.6.41
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `concesionario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `identidad` varchar(15) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `status` enum('0','1') NOT NULL COMMENT '0->Inactivo 1->Activo',
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `usuario`, `clave`, `nombre`, `apellido`, `identidad`, `correo`, `status`, `fecha_registro`) VALUES
(1, 'david', '$2b$10$SQ4bX/e6yQ7oy71fyjkNNuILkJok4iWeJEVffkecwQNfXQR71kNlG', 'David', 'Vasquez', '1000533273', 'david.vasquez.osorio@gmail.com', '1', '2021-11-17 01:53:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `responsable` int(11) NOT NULL,
  `accion` varchar(150) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `placa` varchar(10) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL,
  `modelo` year(4) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT '0->eliminado 1->no eliminado',
  `fecha_ingreso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `id_empleado`, `imagen`, `placa`, `marca`, `color`, `modelo`, `valor`, `status`, `fecha_ingreso`) VALUES
(1, 1, 'default.jpg', 'FFA-121', 'Chevrolet', 'Negro', 1995, '200000.00', '0', '2021-11-19 01:55:34'),
(2, 1, 'WhatsApp Image 2021-08-17 at 19.46.53.jpeg', 'TER-099', 'Renault', 'Azul Oscuro', 2021, '200000.00', '1', '2021-11-19 17:20:58'),
(3, 1, 'default.jpg', 'TER-100', 'Mazda', 'Gris', 2007, '200000.00', '1', '2021-11-19 17:09:03'),
(4, 1, 'default.jpg', 'TER-101', 'Toyota', 'Blanco', 2010, '200000.00', '1', '2021-11-19 01:41:03'),
(5, 1, 'default.jpg', 'TER-102', 'Nissan', 'Gris', 2000, '200000.00', '1', '2021-11-19 01:41:03'),
(6, 1, 'default.jpg', 'TER-103', 'Ford', 'Negro', 2018, '200000.00', '1', '2021-11-19 01:41:03'),
(7, 1, 'default.jpg', 'TER-104', 'Mazda', 'Negro', 1985, '200000.00', '0', '2021-11-19 01:56:56'),
(8, 1, '17169612.png', 'FBQ-989', 'NIssan', 'Gris', 2000, '200000.00', '1', '2021-11-19 02:24:44'),
(9, 1, 'images.png', 'FBQ-856', 'NIssan', 'Rojo', 1997, '240000.00', '1', '2021-11-19 02:27:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `responsable` (`responsable`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`responsable`) REFERENCES `empleados` (`id`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
