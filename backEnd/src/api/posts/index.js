const Express = require('express');
const router = Express.Router();
const postsCtrl = require('./posts.ctrl');

router.get('/', postsCtrl.list);
router.get('/:UserId', postsCtrl.userList);

module.exports = router;