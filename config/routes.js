const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const requestsController = require('../app/controllers/requestsController')
const departmentsController = require('../app/controllers/departmentsController')
const {authenticateUser}  = require('../app/middlewares/authenticate')


router.get('/requests',authenticateUser,requestsController.list)

router.get('/departments', departmentsController.list)

router.get('/users', usersController.list)
router.post('/login',usersController.login)
router.delete('/logout',authenticateUser,usersController.logout)
router.get('/users/account', authenticateUser, usersController.account)



module.exports = router
