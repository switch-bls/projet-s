const router = require('express').Router();

const container  = require('../denpendency-injection')

const authController = container.resolve('authController')

// register
router.post('/', authController.register);
// login
router.post('/login', authController.login);

module.exports = router; 