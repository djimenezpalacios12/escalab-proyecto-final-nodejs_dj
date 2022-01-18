const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const bcrypt = require("bcrypt");
const createError = require('http-errors');

// Registro
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(
      user => res.status(201).send({ user })
    ).catch(
      error => res.status(500).send({ message: "Error al registrar nuevo usuario" })
    );
};

// Inicio de Sesión (rut, password)
exports.signin = (req, res) => {
  const { rut, hashedpass } = req.body;

  User.findOne({ rut })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: "Error: Usuario no encontrado!" })
      }
      // Encuentra Usuario
      bcrypt.compare(hashedpass, user.hashedpass)
        .then(match => {
          if (match) {
            // Dar Acceso - token
            jwt.sign({ _id: user._id }, process.env.JWT_KEY, function (error, token) {
              if (error) {
                res.status(500).send({ error });
              } else {
                const { _id, name, rut, role } = user;
                res.status(200).send({ message: "Acceso Concedido", token, user: { _id, name, rut, role } });
                res.cookie("t", token, { expire: new Date() + 9999 });
              }
            });
          } else {
            // Negar acceso (No hay match con contraseña)
            return res.status(400).send({ message: "La contraseña es incorrecta" })
          }
        }).catch(
          error => res.status(500).send({ message: "Error!" })
        );
    }).catch(
      error => res.status(500).send({ message: "Error!" })
    );
};

// Cerrar Sesión
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Sesión Cerrada" });
};

// Comprobación si usuario es Admin
exports.Admin = (req, res, next) => {
  if (req.profile.role != "admin") {
    return res.status(400).send({ message: "Acceso denegado, Necesitas permisos de Administrador." });
  }
  next();
};

// Verificación de token de seguridad
exports.isAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
      const user = await User.findOne({ _id: data._id })
      if (!user) {
        throw new Error()
      }
      req.user = user
      req.token = token
      next()
    } catch (error) {
      res.status(401).send({ error: 'Acceso no autorizado' })
    }
  } catch {
    res.status(401).send({ error: "¡Error en el acceso!" })
  }
}