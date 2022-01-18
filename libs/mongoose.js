const mongoose = require('mongoose');
require('dotenv').config();

// Conexion a MongoDB
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,      // Nueva conexión
      useUnifiedTopology: true,
      useCreateIndex: true,       // Instancia de conexión
      useFindAndModify: false     // Metodos de consulta nativo de mongoDB
    });
    console.log('> Conectado a Base de Datos de MongoDB');
  } catch (error) {   // Capturar el error si ocurre
    console.log('> ERROR, No se puede conectar a Base de Datos', error);
  }
};

exports.db = db;