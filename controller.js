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
            res.status(200).send({ publications: data.rows })
        } catch (error) {
            console.log(error);
        }
    },

    saveData: async function (req, res) {
        // guardar datos
        try {
            const text = `
            INSERT INTO books (nameUser,emailUser,passUser, roleUser, photouser)
            VALUES ($1, $2, $3, $4, $5);
            `;
            const values = [req.body.name, req.body.email, req.body.password, req.body.role, 'https://n9.cl/ql56'];
            await pool.query(text, values);
            res.send({ publications: 'perfecto' })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = consult