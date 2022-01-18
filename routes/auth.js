const express = require("express");
const router = express.Router();

// Servicios
const { userSignupValidator } = require("../validator/index");
const { signup, signin, signout } = require("../controllers/auth")

// Rutas
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//Exportacion
module.exports = router;

/**
 * Documentación Swagger
 */

/**
 * @swagger
 * /api/signup:
 *  post:
 *    tags:
 *    - Auth
 *    summary: Registrar Nuevo Usuario
 *    description: Función de registro para nuevo usuario
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              firstname:
 *                  type: string
 *                  description: Primer nombre válido
 *              lastname:
 *                  type: string
 *                  description: Apellido válido
 *              email:
 *                  type: string
 *                  description: Email válido
 *              hashedpass:
 *                  type: string
 *                  description: Contraseña válida
 *              rut:
 *                  type: string
 *                  description: rut válido
 *    responses:
 *      "201":
 *         description: Creación exitosa
 *      "400":
 *         description: Bad Request
 *      "500":
 *         description: Error al registrar nuevo usuario
 *
 *
 * /api/signin:
 *  post:
 *    tags:
 *    - Auth
 *    summary: Iniciar Sesión
 *    description: Función para solicitar inicio de sesión al usuario
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              rut:
 *                  type: string
 *                  description: rut válido
 *              hashedpass:
 *                  type: string
 *                  description: Contraseña válida
 *    responses:
 *      "201":
 *         description: Creación exitosa
 *      "400":
 *         description: La contraseña es incorrecta
 *      "401":
 *         description: Error, Usuario no encontrado
 *      "500":
 *         description: Error!
 *
 *
 * /api/signout:
 *  get:
 *    tags:
 *    - Auth
 *    summary: Cerrar Sesión
 *    description: Cerrar sesión de usuario
 *    parameters: []
 *    responses:
 *      "200":
 *         description: Sesión Cerrada
 */