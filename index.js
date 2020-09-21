var { Client } = require('pg')
var app = require('./App')
var config = require('./config')


const client = new Client(config)


async function connectpg() {
    try {
        await client.connect()
        app.listen(4000)
        console.log('coneccion');
    } catch (error) {
        console.log(error);
    }
};

connectpg()