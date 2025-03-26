import express, { Application } from "express";
const cors = require('cors')
const { connectDB } = require('../database/config.db.js')


class Server{
    app: Application;
    port: string;

    
    constructor(){
        this.app = express()
        this.port = process.env.PORT || '4000';

        this.usersPath = '/api/usuarios';
        this.authPath = '/api/auth'
        
        this.dbConnect()

        this.middlewares() //los middlewares deben de ejecutarse antes que las rutas 

        this.routes()
    }

    async dbConnect(){
        await connectDB()
    }

    middlewares(){
        /* CORS */
        this.app.use(cors())

        this.app.use( express.json() )

        this.app.use(express.static(('public')))
    }

    routes(){    
        
        this.app.use( this.usersPath, require('../routes/usuarios.routes.js'))
        this.app.use( this.authPath, require('../routes/auth.routes.js'))

        
    }


    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`App running at port: ${this.port}`);
        })
    }
}

module.exports = Server;