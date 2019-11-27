const Express = require('express');
const router = Express.Router();
const upload = require('../../lib/upload');
const profileCtrl = require('./profile.ctrl');

router.post('/', 
  upload.single('portrait'),
  profileCtrl.submitData
);

module.exports = router;