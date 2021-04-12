const express = require('express')
const router = express.Router()

//const auth = require('../middleware/auth')
const authControllers = require('../controllers/auth')



router.post('/signup',authControllers.signup)
router.post('/login',authControllers.login)


module.exports = router; 