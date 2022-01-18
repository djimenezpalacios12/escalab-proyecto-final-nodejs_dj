const express = require("express");
const router = express.Router();

// Servicios
const { userId } = require("../controllers/user");
const { areaId } = require("../controllers/area");
const { ProyByUser } = require("../controllers/user");
const { isAuth, Admin } = require("../controllers/auth");
const { proyectoId, ingresoProy, consultaProy, actualizarProy, gantt, buscadorDocumentos, eliminarDocumento } = require("../controllers/project");

// Rutas
router.post("/proyecto/ingresar/:userId", isAuth, ingresoProy);
router.get("/proyecto/consultar/:userId", isAuth, Admin, consultaProy);
router.get("/proyecto/consultar/usuario/:userId", isAuth, ProyByUser);
router.put("/proyecto/actualizar/:proyectoId/:userId", isAuth, Admin, actualizarProy);
router.post("/proyecto/gantt/:proyectoId/:userId", isAuth, gantt);
router.get("/proyecto/consultar/gantt/:proyectoId/:userId", isAuth, buscadorDocumentos);
router.delete("/proyecto/eliminar/gantt/:proyectoId/:userId", isAuth, eliminarDocumento);

// Parametros
router.param("areaId", areaId);
router.param("userId", userId);
router.param("proyectoId", proyectoId);

// Exportacion
module.exports = router;