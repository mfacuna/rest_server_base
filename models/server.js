const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user'

        //Middlewares.
        this.middleware();

        //Rutas Aplicación.
        this.routes();
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto:`, this.port)
        });
    }
};


module.exports = Server;