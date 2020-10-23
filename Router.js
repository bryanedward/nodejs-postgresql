const { Router } = require('express')

var controller = require('./controller')

var router = Router()

router.get('/home', controller.getAll)
router.get('/save/:data?', controller.getOne)
router.post('/post', controller.saveData)

module.exports = router