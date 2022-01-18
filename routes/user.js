const express = require("express");
const router = express.Router();

// Servicios
const { isAuth, Admin } = require("../controllers/auth")
const { userId, consultarUsuarios, eliminarUsuario, actualizarUsuario } = require("../controllers/user");

// Rutas
router.post("/user/consultar/:userId", isAuth, Admin, consultarUsuarios);
router.delete("/user/eliminar/:userId", isAuth, Admin, eliminarUsuario);
router.put("/user/actualizar/:userId", isAuth, actualizarUsuario);

// parametros
router.param("userId", userId);

// Exportacion
module.exports = router;