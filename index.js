var { Client } = require('pg')
var app = require('./App')
var config = require('./config')


const pool = new Client(config)

async function connectpg() {
    pool.connect((err) => {
        if (err) {
            return console.error('eror de conexion', err.stack)
        }
        app.listen(4000)
        console.log('conexion');
    })
};

connectpg()