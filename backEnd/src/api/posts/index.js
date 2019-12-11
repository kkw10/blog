const Express = require('express');
const router = Express.Router();
const postsCtrl = require('./posts.ctrl');
const isLoggedIn = require('../../lib/isLoggedIn');

router.get('/', postsCtrl.list);
router.get('/user/:UserId', postsCtrl.userList);
router.get('/tagged/:TagName', postsCtrl.tagList);
router.get('/liked', 
  isLoggedIn,
  postsCtrl.likedList
);

module.exports = router;