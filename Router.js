const { Router } = require('express')

var controller = require('./controller')

var router = Router()

router.get('/home', controller.getAll)
router.post('/save', controller.saveData)


module.exports = router