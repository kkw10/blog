const db = require('../../models');
const httpContext = require('express-http-context');

exports.getComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  try {
    const comment = await db.Comment.findOne({
      where: {
        id: commentId,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'nickname', 'portrait']
      },{
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      }, {
        model: db.User,
        through: 'CommentsDislike',
        as: 'Dislikers',
        attributes: ['id', 'email', 'nickname']
      }],
    })

    if (!comment) {
      res.status(404).send('[Not Found]: 존재하지 않는 댓글입니다.');
      return;
    }

    httpContext.set('comment', comment);
    return next();
  } catch (e) {
    console.error(e);
    return next(e);
  };
};

// 댓글
exports.writeComment = async (req, res, next) => {  
  const post = httpContext.get('post');
  const user = httpContext.get('user');  
  
  try {
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: user.id,
      contents: req.body.contents,
    })

    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      }, {
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      }, {
        model: db.User,
        through: 'CommentsDislike',
        as: 'Dislikers',
        attributes: ['id', 'email', 'nickname']
      }],
    })

    res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.readComments = async (req, res, next) => {
  const post = httpContext.get('post');
  const lastId = parseInt(req.query.lastCommentId, 10);
  let where = {};

  try {
    if (lastId) {
      where = {
        PostId: post.id,
        id: { [db.Sequelize.Op.lt]: lastId },
      }
    } else {
      where = {
        postId: post.id,
      }
    }

    const comments = await db.Comment.findAndCountAll({
      where,
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      }, {
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      }, {
        model: db.User,
        through: 'CommentsDislike',
        as: 'Dislikers',
        attributes: ['id', 'email', 'nickname']
      }],
      distinct: true,
      order: [['createdAt', 'DESC']],
      limit: 10,
    })
    .then(result => {
      res.set('Comments-Count', result.count);
      return result.rows;
    })

    console.log('@@@@@@@@@@@@@');
    console.log(comments);

    res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.updateComment = async (req, res, next) => {
  const user = httpContext.get('user');
  const targetComment = httpContext.get('comment');

  try {
    if (user.id !== targetComment.UserId) {
      res.status(401).send('[Unauthorized]: 권한이 없는 사용자 입니다.');
      return;
    }

    await db.Comment.update({
      contents: req.body.contents,
    }, {
      returning: true,
      where: { id: targetComment.id },
    })

    res.json({
      id: targetComment.id,
      contents: req.body.contents,
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

// 대댓글
exports.writeSubComment = async (req, res, next) => {
  const user = httpContext.get('user');
  const parentComment = httpContext.get('comment');

  try {
    const newComment = await db.Comment.create({
      UserId: user.id,
      contents: req.body.contents,
      parentCommentId: parentComment.id,
    });

    await parentComment.update({
      subCommentsNumb: parentComment.subCommentsNumb + 1,
    });

    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'nickname'],
      }, {
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      }, {
        model: db.User,
        through: 'CommentsDislike',
        as: 'Dislikers',
        attributes: ['id', 'email', 'nickname']
      }]
    })

    res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.readSubComments = async (req, res, next) => {
  const parentId = httpContext.get('comment').id;
  
  try {
    const subComments = await db.Comment.findAll({
      where: {
        parentCommentId: parentId,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'nickname', 'portrait']
      },{
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      }, {
        model: db.User,
        through: 'CommentsDislike',
        as: 'Dislikers',
        attributes: ['id', 'email', 'nickname']
      }],
    })

    res.json({
      parentId,
      subComments,
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.updateSubComment = async (req, res, next) => {
  const user = httpContext.get('user');
  const comment = httpContext.get('comment');
  const parentId = req.body.parentId;
  
  try {
    if (user.id !== comment.UserId) {
      res.status(401).send('[Unauthorized]: 권한이 없는 사용자 입니다.');
      return;
    }

    await comment.update({
      contents: req.body.contents,
    })

    res.json({
      parentId,
      childId: comment.id,
      editedContents: req.body.contents,
    })
  } catch (e) {
    console.error(e);
    return next(e);
  }
};


// 공통
exports.deleteComment = async (req, res, next) => {
  const user = httpContext.get('user');
  const targetComment = httpContext.get('comment');
  const parentId = req.query.parentId;

  try  {
    if (user.id !== targetComment.UserId) {
      res.status(401).send('[Unauthorized]: 권한이 없는 사용자 입니다.');
      return;
    }

    await db.Comment.destroy({
      where: {
        id: targetComment.id,
      }
    })

    if (parentId) {
      const parentComment = await db.Comment.findOne({
        where: {
          id: parentId
        }
      });
  
      await parentComment.update({
        subCommentsNumb: parentComment.subCommentsNumb - 1,
      });

      res.json({
        parentId,
        targetId: targetComment.id,
        subCommentsNumb: parentComment.subCommentsNumb,
      });  
      return;
    }
    
    res.json({
      targetId: targetComment.id,
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.thumbsUp = async (req, res, next) => {
  const user = httpContext.get('user');
  const comment = httpContext.get('comment');

  try {
    const isDisLiked = await comment.getDislikers({
      where: {
        id: user.id
      },
      attributes: ['id'],
    })

    if (isDisLiked) {
      await comment.removeDislikers([user.id]);
    }

    const isLiked = await comment.getLikers({
      where: {
        id: user.id
      },
      attributes: ['id'],
    });

    if (isLiked[0]) {
      await comment.removeLikers([user.id]);
    } else {
      await comment.addLikers(user.id);
    }

    const newComment = await db.Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      },{
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      },{
        model: db.User,
        through: 'CommentsDislike',
        as: 'Dislikers',
        attributes: ['id', 'email', 'nickname']
      }],      
    })

    return res.json(newComment);    
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.thumbsDown = async (req, res, next) => {
  const user = httpContext.get('user');
  const comment = httpContext.get('comment');

  try {
    const isLiked = await comment.getLikers({
      where: {
        id: user.id
      },
      attributes: ['id'],
    })

    if (isLiked) {
      await comment.removeLikers([user.id]);
    }

    const isDisliked = await comment.getDislikers({
      where: {
        id: user.id
      },
      attributes: ['id'],
    });

    if (isDisliked[0]) {
      await comment.removeDislikers([user.id]);
    } else {
      await comment.addDislikers(user.id);
    }

    const newComment = await db.Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      },{
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      }, {
        model: db.User,
        through: 'CommentsDislike',
        as: 'Dislikers',
        attributes: ['id', 'email', 'nickname']
      }],      
    })

    return res.json(newComment);    
  } catch (e) {
    console.error(e);
    return next(e);
  }
};
