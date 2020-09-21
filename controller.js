var {Pool} = require('pg')
var config = require('./config')

var pool = new Pool(config)

var consult = {

    getAll: async function(req, res){
        const books = await pool.query('select * from books');
        res.status(200).send({publications: books.rows})
    },

    saveData: async function(req,res){
        const data = req.body
        console.log(data);
    }
}

module.exports = consult