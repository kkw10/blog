const Express = require('express');
const router = Express.Router();
const authCtrl = require('./auth.ctrl');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/check', authCtrl.check);
router.post('/logout', authCtrl.logout);

module.exports = router;