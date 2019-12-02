const Express = require('express');
const router = Express.Router();
const isLoggedIn = require('../../lib/isLoggedIn');
const userCtrl = require('./user.ctrl');

router.post('/follow/:userId', 
  isLoggedIn,
  userCtrl.findTargetUser,
  userCtrl.follow,
);

router.post('/unfollow/:userId',
  isLoggedIn,
  userCtrl.findTargetUser,
  userCtrl.unfollow,
)

module.exports = router;