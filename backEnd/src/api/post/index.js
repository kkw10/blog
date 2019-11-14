const Express = require('express');
const router = Express.Router();
const postCtrl = require('./post.ctrl');
const isLoggedIn = require('../../lib/isLoggedIn');

router.post('/', 
  isLoggedIn, 
  postCtrl.write
);
router.get('/:id',
  postCtrl.getPostById,
  postCtrl.read
);
router.patch('/:id',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.isMyPost,
  postCtrl.update
);
router.delete('/:id',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.isMyPost,
  postCtrl.delete
);

module.exports = router;