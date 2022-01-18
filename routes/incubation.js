const express = require("express");
const router = express.Router();

// Servicios
const { userId } = require("../controllers/user");
const { proyectoId } = require("../controllers/project");
const { applicationId } = require("../controllers/application");
const { isAuth, Admin } = require("../controllers/auth");
const { incubacionId, incubacion, actualizarEtapa, proyectoAprobado } = require("../controllers/incubation");

// Rutas
router.get("/incubacion/consulta/:userId", isAuth, Admin, proyectoAprobado);
router.post("/incubacion/ingreso/:userId", isAuth, Admin, incubacion);
router.put("/incubacion/actualizacion/:incubacionId/:userId", isAuth, Admin, actualizarEtapa);


// Parametros
router.param("userId", userId);
router.param("proyectoId", proyectoId);
router.param("applicationId", applicationId);
router.param("incubacionId", incubacionId);

// Exportación
module.exports = router;