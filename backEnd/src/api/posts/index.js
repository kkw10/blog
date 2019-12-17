const Express = require('express');
const router = Express.Router();
const postsCtrl = require('./posts.ctrl');
const isLoggedIn = require('../../lib/isLoggedIn');

router.get('/', postsCtrl.list);
router.get('/user/:UserId', postsCtrl.userList);
router.get('/tagged/:TagName', postsCtrl.taggedList);
router.get('/liked', 
  isLoggedIn,
  postsCtrl.likedList
);
router.get('/search',
  postsCtrl.searchList,
);

module.exports = router;