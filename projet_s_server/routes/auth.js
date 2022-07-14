const router = require('express').Router();
const userauth = require('../controllers/auth.controller');
// register
router.post('/', userauth.register);
// login
router.post('/login', userauth.login);

module.exports = router; 