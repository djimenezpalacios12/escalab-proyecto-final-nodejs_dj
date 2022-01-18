const express = require("express");
const router = express.Router();

// Servicios
const { userId } = require("../controllers/user");
const { proyectoId } = require("../controllers/project");
const { isAuth, Admin } = require("../controllers/auth");
const { applicationId, procesar, condicion, resolucion } = require("../controllers/application");

// Rutas
router.post("/postulacion/ingreso/:userId", isAuth, Admin, procesar);
router.get("/postulacion/condicion/:userId", isAuth, Admin, condicion);
router.put("/postulacion/:applicationId/condicion/:userId", isAuth, Admin, resolucion);

// Parametros
router.param("userId", userId);
router.param("proyectoId", proyectoId);
router.param("applicationId", applicationId);

// Exportación
module.exports = router;