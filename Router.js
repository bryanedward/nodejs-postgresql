const { Router } = require('express')

var controller = require('./controller')

var router = Router()

router.get('/home', controller.getAll)
router.get('/get/:data?', controller.getOne)
router.post('/post', controller.saveData)
router.post('/update',controller.updateBook)

module.exports = router