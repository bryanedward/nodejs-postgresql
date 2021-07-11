const { Router } = require('express')

var controller = require('./controller')

var router = Router()

router.get('/mascotas/:edad?', controller.getAll)
router.get('/medicamentos', controller.consultarMedicamentos)
router.get('/edadesMascotas', controller.consultarEdad)
router.get('/get/:data?', controller.getOne)
router.post('/post', controller.saveData)
router.post('/update',controller.updateBook)

module.exports = router