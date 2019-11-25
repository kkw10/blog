const Express = require('express');
const router = Express.Router();
const postCtrl = require('./post.ctrl');
const isLoggedIn = require('../../lib/isLoggedIn');

router.post('/', 
  isLoggedIn,
  postCtrl.write
);
router.post('/:id/recomend',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.recomendPost,
)
router.post('/:id/comment',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.writeComment
);
router.post('/:id/comment/:commentId/up',
  isLoggedIn,
  postCtrl.getComment,
  postCtrl.thumbsUp,
);
router.post('/:id/comment/:commentId/down',
  isLoggedIn,
  postCtrl.getComment,
  postCtrl.thumbsDown,
);
router.get('/:id',
  postCtrl.getPostById,
  postCtrl.getCommentsInPost,
  postCtrl.read
);
router.get('/:id/comments',
  postCtrl.getPostById,
  postCtrl.readComments
)
router.patch('/:id',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.isMyPost,
  postCtrl.update
);
router.patch('/:id/:commentId',
  isLoggedIn,
  postCtrl.getComment,
  postCtrl.updateComment,
);
router.delete('/:id',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.isMyPost,
  postCtrl.delete
);
router.delete('/:id/:commentId',
  isLoggedIn,
  postCtrl.getComment,
  postCtrl.deleteComment
)

module.exports = router;