const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //Middlewares
        this.middlewares();

        //Rutas de mi apliación
        this.routes();
    }

    middlewares(){
        //directorio público
        this.app.use(express.static('public'))
        // CORS
        this.app.use(cors())
        // Lectura y parse
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          });
    }

}

module.exports = Server;