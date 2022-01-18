// Servicios en el contexto de proyectos
const Project = require("../models/project");
const File = require("../models/file");
const formidable = require('formidable');
const path = require("path");
const fs = require('fs');
const folder = "gantt";

// Busqueda de area por _id
exports.proyectoId = (req, res, next, id) => {
  Project.findById(id).exec()
    .then(proyecto => {
      if (!proyecto) {
        return res.status(400).send({ message: "Error!" });
      }
      req.proyecto = proyecto;
      next();
    }).catch(
      error => res.status(500).send({ message: "Error!!" })
    );
};

// Crea carpeta ./gantt al inciar por primera vez el sistema (subcarpeta para archivos gantt de proyecto)
fs.mkdir(path.join(__dirname, `../${folder}`), (err) => {
  if (err) {
    return console.log("> La carpeta ya fue creada o existe en el sistema");
  }
  console.log("Directorio creado exitosamente");
});

// Ingreso de proyecto
exports.ingresoProy = (req, res) => {
  const proyecto = new Project(req.body);
  proyecto.save()
    .then(
      proyecto => res.status(201).send({ proyecto }),

      // Crear subcarpetas para proyectos (Almacen para archivos)
      fs.mkdir(path.join(__dirname, `../${folder}/${proyecto._id}`), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Directorio Creado...');
      })
    ).catch(
      error => res.status(500).send({ message: "Error al Ingresar proyecto" })
    );
};

// Consulta de proyectos
exports.consultaProy = (req, res) => {
  Project.find({})
    .populate({ path: "project_manager", select: ["firstname", "lastname", "email", "rut"] })
    .populate({ path: "area", select: "name" })
    .then(
      proyecto => res.status(201).send({ proyecto })
    ).catch(
      error => res.status(500).send({ message: "Error" })
    );
};

// Actualizar info. de un proyecto
exports.actualizarProy = (req, res) => {
  Project.findByIdAndUpdate({ _id: req.proyecto._id }, { $set: req.body }, { new: true }, (err, proyecto) => {
    if (err) {
      return res.status(400).json({ error: "Error" });
    }
    res.status(200).send({ proyecto })
  });
};


// Subir documento Gantt de proyecto y registrar en la Base de Datos
exports.gantt = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req);

  form.on('fileBegin', function (name, file) {
    file.path = __dirname + `/../${folder}/${req.proyecto._id}/` + file.name;

    fileDoc = {
      name: file.name,
      proyecto: req.proyecto._id
    }

    const files = new File(fileDoc);
    files.save((err, archivo) => {
      if (err) {
        return res.status(400).json({ message: "Error al registrar archivo en la Base de Datos" });
      }
      res.json({ archivo });
    });
  });

  form.once('end', () => {
    console.log('archivo cargado, Proceso Terminado');
  });
};


// Consulta de archivos perteneciente a proyecto
exports.buscadorDocumentos = (req, res) => {
  File.find({})
    .populate({ path: "proyecto", select: "name" })
    .then(
      fileDoc => res.status(201).send({ fileDoc })
    ).catch(
      error => res.status(500).send({ message: "Error en la solicitud" })
    );
};

// Eliminar Documento
exports.eliminarDocumento = (req, res) => {
  const docs = req.body;
  File.findOneAndDelete({})
    .then(fileDocument => {
      if (fileDocument) {
        return res.status(200).send({ message: "Archivo Eliminado" });
      }
      return res.status(400).send({ message: "Archivo no encontrado" });
    }).catch(
      error => res.status(500).send({ message: "Error en Servidor" })
    )
};