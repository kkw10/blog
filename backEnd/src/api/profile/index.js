const Express = require('express');
const router = Express.Router();
const upload = require('../../lib/upload');
const isLoggedIn = require('../../lib/isLoggedIn');
const profileCtrl = require('./profile.ctrl');

router.post('/',
  isLoggedIn,
  profileCtrl.submitProfile,
);
router.post('/portrait',
  isLoggedIn,
  upload.single('portrait'),
  profileCtrl.submitPortrait,
);

module.exports = router;