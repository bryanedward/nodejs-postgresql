var { Pool } = require('pg')
var config = require('./config')

var pool = new Pool(config)

var consult = {

    getAll: async function (req, res) {
        // obtener todos los datos
        const books = await pool.query('select * from books');
        res.status(200).send({ publications: books.rows })
    },

    getOne: async function (req, res) {
        // obtener un dato
        try {
            const data = await
                pool.query(`select * from books where nameuser = '${req.params.data}'`);
                res.status(200).send({publications: data.rows})            
        } catch (error) {
            console.log(error);
        }
    }

    
}

module.exports = consult