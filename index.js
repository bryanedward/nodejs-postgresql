var { Pool } = require('pg')
var app = require('./App')
var config = require('./config')


const pool = new Pool(config)

async function connectpg() {
    pool.connect((err) => {
        if (err) {
            return console.error('eror de conexion', err.stack)
        }
        app.listen(5432)
        console.log('conexion');
    })
};

connectpg()