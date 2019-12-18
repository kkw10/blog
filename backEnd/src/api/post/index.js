const Express = require('express');
const router = Express.Router();
const postCtrl = require('./post.ctrl');
const commentCtrl = require('./post.comment.ctrl');
const isLoggedIn = require('../../lib/isLoggedIn');

// POST
router.post('/', 
  isLoggedIn,
  postCtrl.writePost
);
router.post('/:id/recomend',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.recomendPost,
)
router.post('/:id/comment',
  isLoggedIn,
  postCtrl.getPostById,
  commentCtrl.writeComment
);
router.post('/:id/comment/:commentId/up',
  isLoggedIn,
  commentCtrl.getComment,
  commentCtrl.thumbsUp,
);
router.post('/:id/comment/:commentId/down',
  isLoggedIn,
  commentCtrl.getComment,
  commentCtrl.thumbsDown,
);
router.post('/subcomment/:commentId',
  isLoggedIn,
  commentCtrl.getComment,
  commentCtrl.writeSubComment,
);

// GET
router.get('/:id',
  postCtrl.getPostById,
  postCtrl.readPost
);
router.get('/:id/comments',
  postCtrl.getPostById,
  commentCtrl.readComments
)
router.get('/subcomments/:commentId',
  commentCtrl.getComment,
  commentCtrl.readSubComments,
)

// PATCH
router.patch('/:id',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.isMyPost,
  postCtrl.updatePost,
);
router.patch('/comment/:id/:commentId',
  isLoggedIn,
  commentCtrl.getComment,
  commentCtrl.updateComment,
);
router.patch('/subcomment/:commentId',
  isLoggedIn,
  commentCtrl.getComment,
  commentCtrl.updateSubComment,
);

// DELETE
router.delete('/:id',
  isLoggedIn,
  postCtrl.getPostById,
  postCtrl.isMyPost,
  postCtrl.deletePost,
);
router.delete('/comment/:commentId',
  isLoggedIn,
  commentCtrl.getComment,
  commentCtrl.deleteComment
);

module.exports = router;