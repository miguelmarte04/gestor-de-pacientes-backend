-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-03-2023 a las 05:00:26
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
  `imagen` longtext DEFAULT NULL,
  `cedula` varchar(25) NOT NULL,
  `clave` longtext NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `nombres`, `apellidos`, `imagen`, `cedula`, `clave`, `fecha_insercion`, `estado`) VALUES
(4, 'Pedro', 'Martinez', NULL, '12345678', '4f995ea910fe87edfe82e9c82c07d83fb2c17f707f0fef8a0544a0ec93d80a63964c87fb9489bec6772e6c68bd5db192ba0becda60b8e9a51bdea07d7b1fdea2cc4b92b920d42cd06d5c9d78aef8e25637d9c44e30865ac0af8c1e05f406eddafc63a0f1d3', '2023-03-03 10:42:32', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_doctor` int(11) NOT NULL,
  `id_tanda` varchar(1) NOT NULL,
  `asunto` varchar(150) NOT NULL,
  `dia` int(11) NOT NULL,
  `receta` longtext DEFAULT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `id_paciente`, `id_doctor`, `id_tanda`, `asunto`, `dia`, `receta`, `fecha_insercion`, `estado`) VALUES
(8, 5, 6, 'M', 'asadsad', 2, NULL, '2023-03-05 20:39:12', 'T');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color_lesion`
--

CREATE TABLE `color_lesion` (
  `id` int(11) NOT NULL,
  `color` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `color_lesion`
--

INSERT INTO `color_lesion` (`id`, `color`, `estado`) VALUES
(1, 'Rojo', 'A'),
(2, 'Azul', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `det_citas`
--

CREATE TABLE `det_citas` (
  `id` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL,
  `id_tipo_lesion` int(11) NOT NULL,
  `id_color_lesion` int(11) NOT NULL,
  `localizacion` varchar(100) NOT NULL,
  `antecedentes_patologicos` varchar(100) NOT NULL,
  `tratamiento_previo` varchar(100) NOT NULL,
  `lesiones_anteriores` varchar(1) NOT NULL,
  `fecha_lesion_anterior` datetime NOT NULL,
  `detalles_extras` varchar(100) NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `det_citas`
--

INSERT INTO `det_citas` (`id`, `id_cita`, `id_tipo_lesion`, `id_color_lesion`, `localizacion`, `antecedentes_patologicos`, `tratamiento_previo`, `lesiones_anteriores`, `fecha_lesion_anterior`, `detalles_extras`, `fecha_insercion`, `estado`) VALUES
(3, 8, 1, 1, 'asdsad', 'asdsad', 'sads', 'S', '2023-03-10 00:39:00', 'asdsad', '2023-03-05 20:39:01', 'A');

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
  `imagen` longtext DEFAULT NULL,
  `cedula` varchar(12) NOT NULL,
  `exequatur` varchar(100) NOT NULL,
  `clave` longtext NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `telefono` varchar(16) NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `doctores`
--

INSERT INTO `doctores` (`id`, `id_nacionalidad`, `id_especialidad`, `nombre`, `apellido`, `imagen`, `cedula`, `exequatur`, `clave`, `sexo`, `telefono`, `fecha_nacimiento`, `correo`, `fecha_insercion`, `estado`) VALUES
(6, 1, 1, 'assad', 'asdasd', NULL, '23232323232', 'sadsadsadsad', '6567650e33ea9dd72d93c691b5c69dce424f9a5073d18c1569aebeee920848ea472cab020573eb79b27f07b24b15fb7bff148adf3e00a11e710a760922327738044d93d7fb7fcf107db5853cc370c48b17c0a1efcde56a8b2dd90065a03e4ee450e95d57134a201f', 'M', '23232323232', '2023-02-16 23:55:20', '', '2023-02-27 19:55:30', 'A'),
(7, 1, 1, 'assad', 'asdsad', NULL, '11212121212', '1221323232', '02b363ec54a0ad4dfdd69285d642cf9f77ce1a11cacb438f0c75ed3e404af791582d3f5bb67c364d55fbca1b689a1b9b9684276eac40800f7aff02963df318f53b3ac2fcdd651c68b0d668f61cc428a26a44ce11e4d5d0d8908255ba92838277d16c4e399f1b5de1', 'M', '11212121212', '2023-02-10 00:00:14', 'asdsad@gmail.com', '2023-02-27 20:00:27', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedades`
--

CREATE TABLE `enfermedades` (
  `id` int(11) NOT NULL,
  `enfermedad` varchar(100) NOT NULL,
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

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id`, `nombre`, `fecha_insercion`, `estado`) VALUES
(1, 'Alergiologia', '2023-02-09 00:00:00', 'A'),
(2, 'dasdsadsadsadasd', '2023-02-12 11:42:29', 'I');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `id_doctor` int(11) NOT NULL,
  `oficina` varchar(100) NOT NULL,
  `tanda_tarde` longtext DEFAULT NULL,
  `tanda_manana` longtext DEFAULT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `id_doctor`, `oficina`, `tanda_tarde`, `tanda_manana`, `fecha_insercion`, `estado`) VALUES
(7, 1, 'ewewe', '', '1,2,3', '2023-02-22 00:08:44', 'A'),
(8, 6, 'fsdfdsfd', '2,3', '1,2,3,4', '2023-03-05 20:34:48', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nacionalidad`
--

CREATE TABLE `nacionalidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nacionalidad`
--

INSERT INTO `nacionalidad` (`id`, `nombre`, `estado`) VALUES
(1, 'Dominicana', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `cedula` varchar(12) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `imagen` longtext DEFAULT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `id_seguro` int(11) NOT NULL,
  `id_nacionalidad` int(11) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `clave` longtext NOT NULL,
  `fecha_insercion` datetime NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `cedula`, `nombres`, `apellidos`, `imagen`, `fecha_nacimiento`, `id_seguro`, `id_nacionalidad`, `telefono`, `sexo`, `email`, `clave`, `fecha_insercion`, `estado`) VALUES
(5, '14545145151', 'fdsfsf', 'sdfsdf', NULL, '2023-02-02 23:12:13', 1, 1, '14545145151', 'F', '', '8ee8c8e90338997dbe4cbe007884fe673e721f20181d873928912e63454e639dfed73fa5744926785cc9edd7531b5305511740c534b2a8a165d1edb1d55140fbbaa7b44564ffc3b7c8dda99052c646c9b33c782a045565df3692563ba37544ce4c3521bb06c7d5d1', '2023-02-27 19:12:34', 'A');

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
-- Volcado de datos para la tabla `seguros`
--

INSERT INTO `seguros` (`id`, `nombre`, `fecha_insercion`, `estado`) VALUES
(1, 'Universal', '2023-02-09 00:00:00', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_lesion`
--

CREATE TABLE `tipo_lesion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` varchar(1) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_lesion`
--

INSERT INTO `tipo_lesion` (`id`, `nombre`, `estado`) VALUES
(1, 'Grave', 'A');

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
-- Indices de la tabla `color_lesion`
--
ALTER TABLE `color_lesion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `det_citas`
--
ALTER TABLE `det_citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cita` (`id_cita`),
  ADD KEY `id_color_lesion` (`id_color_lesion`),
  ADD KEY `id_tipo_lesion` (`id_tipo_lesion`);

--
-- Indices de la tabla `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `id_especialidad` (`id_especialidad`),
  ADD KEY `id_nacionalidad` (`id_nacionalidad`);

--
-- Indices de la tabla `enfermedades`
--
ALTER TABLE `enfermedades`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `id_seguro` (`id_seguro`),
  ADD KEY `id_nacionalidad` (`id_nacionalidad`);
ALTER TABLE `pacientes` ADD FULLTEXT KEY `nombres` (`cedula`,`nombres`,`apellidos`);

--
-- Indices de la tabla `seguros`
--
ALTER TABLE `seguros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_lesion`
--
ALTER TABLE `tipo_lesion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `color_lesion`
--
ALTER TABLE `color_lesion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `det_citas`
--
ALTER TABLE `det_citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `doctores`
--
ALTER TABLE `doctores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `enfermedades`
--
ALTER TABLE `enfermedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `nacionalidad`
--
ALTER TABLE `nacionalidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `seguros`
--
ALTER TABLE `seguros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_lesion`
--
ALTER TABLE `tipo_lesion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Filtros para la tabla `det_citas`
--
ALTER TABLE `det_citas`
  ADD CONSTRAINT `det_citas_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id`),
  ADD CONSTRAINT `det_citas_ibfk_2` FOREIGN KEY (`id_color_lesion`) REFERENCES `color_lesion` (`id`),
  ADD CONSTRAINT `det_citas_ibfk_3` FOREIGN KEY (`id_tipo_lesion`) REFERENCES `tipo_lesion` (`id`);

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
