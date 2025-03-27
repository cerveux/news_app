import express, { Application } from "express";
import morgan from "morgan";
import { UserRoute } from "./routes";
import { errorHandler } from "./middlewares/handlers.middleware";
import swaggerDocs from "./config/swagger";
import { config } from "./config/config";


const app: Application = express();

// Swagger documentation
swaggerDocs( app, config.port );

// Middlewares
app.use( express.json() );

app.use( morgan( "short" ) );


// Routes
app.use( "/api/user", UserRoute );
app.all( "*", ( _req, res ) =>{ res.status( 404 ).json( { message: "This path doesn't exist." } );} );
app.use( "*", errorHandler );

export default app;