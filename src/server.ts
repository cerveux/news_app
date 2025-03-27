import express, { Application } from "express";
import morgan from "morgan";

import { UserRoute } from "./routes";
import { errorHandler } from "./middlewares/handlers.middleware";


const app: Application = express();

// Middlewares
app.use( express.json() );

app.use( morgan( "short" ) );


// Routes
app.use( "/api/user", UserRoute );
app.all( "*", ( req, res ) =>{ res.status( 404 ).json( { message: "This path doesn't exist." } );} );
app.use( "*", errorHandler );

export default app;