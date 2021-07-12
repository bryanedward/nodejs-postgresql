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
        const usuarios = await pool.query(`
        select distinct mascota.codmascota, mascota.nombreanimal, mascota.fechanac, mascota.genero,
			mascota.raza, mascota.raza, mascota.color, usuario.cedula, usuario.nombre,
			usuario.apellido, usuario.direccion, usuario.celular, usuario.fechavisita,
			fichamedica.codigoficha, fichamedica.veterinario, fichamedica.nivelsalud,
			fichamedica.esterilizado, fichamedica.descripcionmedica
            from mascota right join usuario on  usuario.cedula = mascota.responsable left join fichamedica  on fichamedica.responsable = usuario.cedula
            where especialidad is null`)
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
                pool.query(`
                select * from mascota right join fichamedica on mascota.codmascota = fichamedica.codanimal
                where nivelsalud = '${req.params.data}'`);
            res.status(200).json(data.rows)
        } catch (error) {
            console.log(error);
        }
    },

    guardarRegistro: async function (req, res) {
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

    guardarProducto: async function (req, res) {
        const { codigP, nombreP, descripC, cantidP, nombreProv } = req.body
        try {
            const text = ` INSERT INTO producto (codigoproduc,nombrevacuna,descripvacuna,
                cantdisponibidad, nombreproveedor)
            VALUES ($1, $2, $3, $4, $5);
            `;
            const values = [codigP, nombreP, descripC, Number(cantidP), nombreProv];
            await pool.query(text, values);
            res.send({ message: 'creado producto' })
        } catch (e) {
            res.send(e);
        }
    },

    guardarIngreso: async function (req, res) {
        const { cedula, nombre, apellido, direccion, celular, fechaIngreso, nombreAni, fechaNac, genero, raza, edad, color, esterilizado } = req.body
        try {
            const text = `
            INSERT INTO usuario (cedula,nombre,apellido,
                direccion,
                celular,fechavisita)
            VALUES ($1, $2, $3, $4, $5, $6);
            `;
            const values = [cedula,
                nombre, apellido,
                direccion, celular, fechaIngreso];
            await pool.query(text, values);

            const inserMasc = `INSERT INTO mascota (nombreanimal, fechanac, genero, raza, edad, color, 
                responsable) VALUES($1, $2, $3, $4, $5, $6, $7 ) RETURNING *`
            const valuesMasc = [nombreAni, fechaNac, genero, raza, Number(edad), color, cedula]


            const insercionFicha = `
                        INSERT INTO fichamedica (fechaFicha,responsable,
                             esterilizado,codAnimal)
                                    VALUES ($1, $2, $3, $4);
                `;
            // callback
            await pool.query(inserMasc, valuesMasc, (err, res) => {
                if (err) {
                    console.log(err.stack)
                } else {
                    var codmascota = res.rows[0].codmascota
                    const valuesFicha = [fechaIngreso,
                        cedula, esterilizado,
                        codmascota];
                    pool.query(insercionFicha, valuesFicha);
                }
            })
            res.send({ message: 'creado' })
        } catch (e) {
            res.send(e);
        }
    },
    actulizarRegistro: async function (req, response) {
        const { codProducto, fechaRegistro, cedulaResponsable, veterinario, nivelSalud, esterilizad } = req.body;
        await pool.query(`update fichamedica 
        set fechaficha= '${fechaRegistro}',
        veterinario = '${veterinario}',
        descripcionmedica = '${codProducto}',
        nivelsalud = '${nivelSalud}',
        esterilizado =  '${esterilizad}'
        where responsable = '${cedulaResponsable}'
        `, (err, res) => {
            if (err != null) {
                console.log(err);
            } else {
                response.send({ message: 'actualizado' })
            }
        })
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
    }, eliminar: async function (req, response) {
        await pool.query(`delete from usuario  
        where cedula = '${req.body.cedula}'`, (err, res) => {
            if (err != null) {
                console.log(err);
            } else {
                response.send({ message: "elom" });
            }
        });
        await pool.query(`delete from mascota  
        where responsable = '${req.body.cedula}'`, (err, res) => {
            if (err != null) {
                console.log(err);
            } else {
                response.send({ message: "elom" });
            }
        });
    }
}

module.exports = consult