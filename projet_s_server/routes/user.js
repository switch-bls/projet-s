const router = require('express').Router();
const user = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
// all users
router.get('/all', user.all);
// get current user
router.get('/me', auth, user.me);
// get user by id
router.get('/id/:id',  user.userById);
// update user
router.post('/update', auth, user.update);
// delete user
router.post('/delete', auth, user.delete);
module.exports = router; 