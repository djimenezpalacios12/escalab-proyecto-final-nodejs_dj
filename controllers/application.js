// Middleware para proceso de postulación
const Application = require("../models/application");

// Busqueda de application por _id
exports.applicationId = (req, res, next, id) => {
  Application.findById(id).exec()
    .then(application => {
      if (!application) {
        return res.status(400).send({ message: "Error!" });
      }
      req.application = application;
      next();
    }).catch(
      error => res.status(500).send({ message: "Error!!" })
    );
};

// Procesar un proyecto, enviar a revision para su aprovacion o rechazo
exports.procesar = (req, res) => {
  const postulacion = new Application(req.body);
  postulacion.save()
    .then(
      postulacion => res.status(201).send({ postulacion })
    ).catch(
      error => res.status(500).send({ message: "Error en la Solicitud de ingreso" })
    );
};

// listar condiciones de la postulacion
exports.condicion = (req, res) => {
  res.json(Application.schema.path("condition").enumValues);
};

// Resultado de la postulación
exports.resolucion = (req, res) => {
  Application.findByIdAndUpdate({ _id: req.application._id }, { $set: { condition: req.body.condition } }, { new: true, runValidators: true }, (err, application) => {
    if (err) {
      return res.status(400).json({ error: "Error en el proceso de resolución" });
    }
    res.status(200).send({ application })
  });
};