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
);
router.post('/unfollowing/:userId',
  isLoggedIn,
  userCtrl.findTargetUser,
  userCtrl.unfollowing,
);
router.get('/followers/:userId',
  userCtrl.readFollowers,
);
router.get('/followings/:userId',
  userCtrl.readFollowings,
)

module.exports = router;