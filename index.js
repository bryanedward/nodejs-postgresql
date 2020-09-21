var { Client } = require('pg')
var app = require('./App')
var config = require('./config')


const client = new Client(config)

console.log(config.user);

function connectpg() {
    client.connect((err) => {
        if (err) {
            return console.error('eror de conexion', err.stack)
        }else{
            app.listen(4000)
            console.log('conexion' + config.port);
        }
    })
};

connectpg()