const Express = require('express');
const router = Express.Router();
const postsCtrl = require('./posts.ctrl');

router.get('/', postsCtrl.list);

module.exports = router;