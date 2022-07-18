const router = require('express').Router();
const auth = require('../middlewares/auth');

const container = require('../denpendency-injection')
const userController = container.resolve('userController')

// all users
router.get('/all', userController.all);
// get current user
router.get('/me', auth, userController.me);
// get user by id
router.get('/id/:id', userController.userById);
// update user
router.post('/update', auth, userController.update);
// delete user
router.post('/delete', auth, userController.delete);
module.exports = router; 