const { Router } = require('express')

var controller = require('./controller')

var router = Router()

router.get('/mascotas/:edad?', controller.consultarMascotas)
router.get('/usuarios', controller.consultarUsuarios)
router.get('/medicamentos', controller.consultarMedicamentos)
router.get('/edadesMascotas', controller.consultarEdad)
router.get('/get/:data?', controller.getOne)
router.post('/guardarRegistro', controller.guardarRegistro)
router.post('/guardarIngreso', controller.guardarIngreso)
router.post('/guardarProducto', controller.guardarProducto)
router.post('/actualizarRegistro', controller.actulizarRegistro)
router.post('/update',controller.updateBook)
router.delete('/elimnar',controller.eliminar)

module.exports = router