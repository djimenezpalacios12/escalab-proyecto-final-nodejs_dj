const express = require("express");
const router = express.Router();

// Servicios
const { userId } = require("../controllers/user")
const { areaId, ingrearArea, consultarArea, actualizarArea, eliminarArea } = require("../controllers/area");
const { Admin, isAuth } = require("../controllers/auth");

// Rutas
router.post("/area/ingresar/:userId", isAuth, Admin, ingrearArea);
router.get("/area/consultar", consultarArea);
router.put("/area/actualizar/:areaId/:userId", isAuth, Admin, actualizarArea);
router.delete("/area/eliminar/:areaId/:userId", isAuth, Admin, eliminarArea);

// Parametros
router.param("areaId", areaId);
router.param("userId", userId);

// Exportacion
module.exports = router;

/**
 * Documentación Swagger
 */

/**
 * @swagger
 * /api/area/ingresar/{userId}:
 *  post:
 *    securitySchema:
 *    - JWT: []
 *    tags:
 *    - Area
 *    summary: Ingresar Área
 *    description: Función de registro de una nueva área abarcada de un proyecto
 *    parameters:
 *          - name: "userId"
 *            in: "path"
 *            description: "Id de usuario administrador"
 *            required: true
 *            type: "integer"
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                  type: string
 *                  description: Nombre válido
 *    responses:
 *      "201":
 *         description: Ingreso exitosa
 *      "500":
 *         description: Error en la Solicitud de ingreso
 *
 *
 * /api/area/consultar:
 *  get:
 *    tags:
 *    - Area
 *    summary: Consultar Área
 *    description: Lista de área en sistema
 *    parameters: []
 *    responses:
 *      "200":
 *         description: OK
 *      "400":
 *         description: No se encontraron areas registradas
 *      "500":
 *         description: Error en la Solicitud de ingreso
 *
 *
 * /api/area/actualizar/{areaId}/{userId}:
 *  put:
 *    tags:
 *    - Area
 *    summary: Actualizar Área
 *    description: Actualizar nombre de un área registrada en el sistema
 *    parameters:
 *          - name: "areaId"
 *            in: "path"
 *            description: "Id de área en el sistema"
 *            required: true
 *            type: "integer"
 *          - name: "userId"
 *            in: "path"
 *            description: "Id de usuario administrador"
 *            required: true
 *            type: "integer"
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                  type: string
 *                  description: Nuevo nombre válido
 *    responses:
 *      "201":
 *         description: OK
 *      "500":
 *         description: Error en la solicitud de Actualización
 *
 *
 * /api/area/eliminar/{areaId}/{userId}:
 *  delete:
 *    tags:
 *    - Area
 *    summary: Eliminar Área
 *    description: Eliminar nombre de un área registrada en el sistema
 *    parameters:
 *          - name: "areaId"
 *            in: "path"
 *            description: "Id de área en el sistema"
 *            type: "string"
 *          - name: "userId"
 *            in: "path"
 *            description: "Id de usuario administrador"
 *            type: "string"
 *    responses:
 *      "200":
 *         description: Area Eliminada
 *      "500":
 *         description: Error en la solicitud de Actualización
 */