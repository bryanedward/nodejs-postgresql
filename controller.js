var { Pool } = require('pg')
var config = require('./config')

var pool = new Pool(config)

var consult = {

    getAll: async function (req, res) {
        // obtener todos los datos
        const mascota = await pool.query('select * from mascota');
        res.status(200).json(mascota.rows)
    },

    getOne: async function (req, res) {
        // obtener un dato
        try {
            const data = await
                pool.query(`select * from mascota where nivelsalud = '${req.params.data}'`);
            res.status(200).json(data.rows )
        } catch (error) {
            console.log(error);
        }
    },

    saveData: async function (req, res) {
        // guardar datos
        try {
            const text = `
            INSERT INTO books (namebook,descriptbook,yearbook, price)
            VALUES ($1, $2, $3, $4);
            `;
            const values = [req.body.name, req.body.descrip, req.body.year, req.body.price];
            await pool.query(text, values);
            res.send({ message: 'libro creado' })
        } catch (e) {
            res.send(e);
        }
    },

    updateBook: async function (req, response) {
        // actualizar un libro
        await pool.query(`update books set 
            namebook = '${req.body.namebook}',
            descriptbook = '${req.body.descriptbook}',
            price = '${req.body.price}' 
            where isbn = ${req.body.isbn}`, (err, res) => {

            if (err != null) {
                console.log(err);
            } else {
                response.send('ok');
            }
        });
    }
}

module.exports = consult