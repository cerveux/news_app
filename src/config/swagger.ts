import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// import { access } from "../interfaces/auth.interface";
import { config } from "./config";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node backend Challenge",
      version: "1.0.0",
      description: "Challenge for Mindfactory",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [{ url: `http://localhost:${config.port}/api` }],
  },
  apis: ["./src/docs/*.openapi.yml"],
};

const swaggerSpec = swaggerJSDoc( options );

const swaggerUiOptions = {
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
    validatorUrl: null,
    docExpansion: "none",
  },
};

const swaggerDocs = ( app: Application, port: number ) => {
  app.use( "/docs", swaggerUi.serve, swaggerUi.setup( swaggerSpec, swaggerUiOptions ) );

  console.info( `📄 Swagger Docs available at http://localhost:${port}/docs` );
};

export default swaggerDocs;
