var {Pool} = require('pg')
var config = require('./config')

var pool = new Pool(config)

var consult = {

    getAll: async function(req, res){
        const books = await pool.query('select * from books');
        res.status(200).send({publications: books.rows})
    }
}

module.exports = consult