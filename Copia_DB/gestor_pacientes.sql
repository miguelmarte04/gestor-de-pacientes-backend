-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-02-2023 a las 03:46:34
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestor_pacientes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `imagen` longtext NOT NULL,
  `usuario` varchar(25) NOT NULL,
  `clave` longtext NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `nombres`, `apellidos`, `imagen`, `usuario`, `clave`, `fecha_insercion`, `estado`) VALUES
(1, 'Pedro', 'Martinez', '', 'admin', '$2a$08$/UMdqVT/mQKzMDAweqWvNujGahJq7jwEJ8SIO/Iaxjt29YODi./zu', '2023-02-07 11:08:16', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_doctor` int(11) NOT NULL,
  `asunto` varchar(150) NOT NULL,
  `inicio` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctores`
--

CREATE TABLE `doctores` (
  `id` int(11) NOT NULL,
  `id_nacionalidad` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `imagen` longtext NOT NULL,
  `cedula` varchar(12) NOT NULL,
  `clave` longtext NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `telefono` varchar(16) NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `correo` varchar(50) NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `id_doctor` int(11) NOT NULL,
  `hora` varchar(50) NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nacionalidad`
--

CREATE TABLE `nacionalidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `cedula` varchar(12) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `imagen` longtext NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `id_seguro` int(11) NOT NULL,
  `id_nacionalidad` int(11) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `clave` longtext NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguros`
--

CREATE TABLE `seguros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_doctor` (`id_doctor`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `id_especialidad` (`id_especialidad`),
  ADD KEY `id_nacionalidad` (`id_nacionalidad`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_doctor` (`id_doctor`);

--
-- Indices de la tabla `nacionalidad`
--
ALTER TABLE `nacionalidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `id_seguro` (`id_seguro`),
  ADD KEY `id_nacionalidad` (`id_nacionalidad`);

--
-- Indices de la tabla `seguros`
--
ALTER TABLE `seguros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `doctores`
--
ALTER TABLE `doctores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nacionalidad`
--
ALTER TABLE `nacionalidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seguros`
--
ALTER TABLE `seguros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctores` (`id`),
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`);

--
-- Filtros para la tabla `doctores`
--
ALTER TABLE `doctores`
  ADD CONSTRAINT `doctores_ibfk_1` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`),
  ADD CONSTRAINT `doctores_ibfk_2` FOREIGN KEY (`id_nacionalidad`) REFERENCES `nacionalidad` (`id`);

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctores` (`id`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_seguro`) REFERENCES `seguros` (`id`),
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`id_nacionalidad`) REFERENCES `nacionalidad` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
