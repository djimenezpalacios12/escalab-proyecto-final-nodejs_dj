// Importaciones
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// App - Express
const app = express();

// Base de Datos
const dataBase = require('./libs/mongoose').db;
dataBase();

//Middleware - Servicios Express
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Rutas
const authR = require("./routes/auth");
const areaR = require("./routes/area");
const userR = require("./routes/user");
const projectR = require("./routes/project");
const incubationR = require("./routes/incubation");
const applicationR = require("./routes/application");

// Definiciones de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      version: '1.0.0',
      title: 'Incubación de Proyectos',
      description: 'Documentación de API',
      contact: {
        name: 'Sistema de Incubación'
      },
      servers: ['http://localhost:8000']
    },
    tags: {
      name: ['Auth', 'Area', 'Usuarios']
    },
    components: {
      securitySchemes: {
        JWT: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT'
        },
      }
    },
    security: [{
      JWT: []
    }]
  },
  apis: ['./routes/*.js']
};

// Final defitions with swagger - express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas Middleware
app.use("/api", authR);
app.use("/api", areaR);
app.use("/api", userR);
app.use("/api", projectR);
app.use("/api", incubationR);
app.use("/api", applicationR);

// Puerto
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`> Servidor iniciado en puerto: ${port}`)
});