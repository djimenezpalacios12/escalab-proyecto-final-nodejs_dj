// Middleware para proceso de Incubación
const Incubation = require("../models/incubation");
const Application = require("../models/application");

// Busqueda de application por _id
exports.incubacionId = (req, res, next, id) => {
  Incubation.findById(id).exec()
    .then(incubacion => {
      if (!incubacion) {
        return res.status(400).send({ message: "Error!" });
      }
      req.incubacion = incubacion;
      next();
    }).catch(
      error => res.status(500).send({ message: "Error!!" })
    );
};

// Consultar postulaciones aprobadas
exports.proyectoAprobado = (req, res) => {
  Application.find({ condition: "Aceptado" })
    .then(aprobado => {
      if (aprobado.length) {
        return res.status(200).send({ aprobado });
      }
      return res.status(400).send({ message: "No se ecuentran postulaciones aceptadas actualmente" });
    }).catch(
      error => res.status(500).send({ message: "Error en Servidor" })
    );
};

exports.incubacion = (req, res) => {
  const incubacion = new Incubation(req.body);
  incubacion.save({})
    .then(
      incubacion => res.status(201).send({ incubacion })
    ).catch(
      error => res.status(500).send({ message: "Error en la Solicitud de ingreso" })
    );
};

// Actualización de etapa y presupuesto asigando de la incubación
exports.actualizarEtapa = (req, res) => {
  Incubation.findByIdAndUpdate({ _id: req.incubacion._id }, { $set: { course: req.body.course } }, { new: true, runValidators: true }, (err, incubacion) => {
    if (err) {
      return res.status(400).json({ message: "Error en la actualización del stage" });
    }
    res.status(200).send({ incubacion })
  });
};