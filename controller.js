var { Pool } = require('pg')
var config = require('./config')

var pool = new Pool(config)

var consult = {

    consultarMascotas: async function (req, res) {
        // obtener todos los datos
        const mascota = await pool.query(`select * from mascota where edad = ${req.params.edad}`);

        res.status(200).json(mascota.rows)
    },
    consultarUsuarios: async function (req, res) {
        const usuarios = await pool.query('select * from mascota inner join usuario on  usuario.cedula = mascota.responsable')
        res.status(200).json(usuarios.rows)
    },
    consultarMedicamentos: async function (req, res) {
        try {
            const producto = await pool.query('select * from producto');
            res.status(200).json(producto.rows)
        } catch (error) {

        }
    },
    consultarEdad: async function (req, res) {
        try {
            const edadesMascotas = await pool.query('select distinct edad from mascota');
            res.status(200).json(edadesMascotas.rows)
        } catch (error) {

        }
    },

    getOne: async function (req, res) {
        // obtener un dato
        try {
            const data = await
                pool.query(`select * from mascota where nivelsalud = '${req.params.data}'`);
            res.status(200).json(data.rows)
        } catch (error) {
            console.log(error);
        }
    },

    saveData: async function (req, res) {
        // guardar datos

        const { nombreClient, cedulaClient, dirreClient, celularClient, apellidoClient, fechaIngreso, generoAnimal } = req.body
        try {
            const text = `
            INSERT INTO usuario (cedula,nombre,apellido,genero,
                direccion,
                celular,fechavisita)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
            `;
            const values = [cedulaClient,
                nombreClient, apellidoClient,
                generoAnimal, dirreClient, celularClient, fechaIngreso];
            await pool.query(text, values);
            res.send({ message: 'creado' })
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