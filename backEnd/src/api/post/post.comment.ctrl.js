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
  const user = httpContext.get('user');
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

    let comments = await db.Comment.findAndCountAll({
      where,
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      }],
      distinct: true,
      order: [['createdAt', 'DESC']],
      limit: 10,
    })
    .then(result => { // 댓글 총개수 계산
      res.set('Comments-Count', result.count);
      return result;
    })
    .then(async (result) => { // 좋아요, 싫어요한 댓글 확인
      let newResult = result.rows
      if (user) {
        newResult = await Promise.all(result.rows.map(async (v) => {
          const isLiked = await v.getLikers({ where: { id: user.id } });
          const isDisliked = await v.getDislikers({ where: { id: user.id } });
  
          if (isLiked[0]) {
            v.dataValues.isLiked = true;
          }
          if (isDisliked[0]) {
            v.dataValues.isDisliked = true;
          }
          return v;
        }))
      }
      return newResult;
    });

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
  const user = httpContext.get('user');
  
  try {
    let subComments = await db.Comment.findAll({
      where: {
        parentCommentId: parentId,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'email', 'nickname', 'portrait']
      }],
    });

    if (user) {
      subComments = await Promise.all(subComments.map(async (v) => {
        const isLiked = await v.getLikers({ where: { id: user.id } });
        const isDisliked = await v.getDislikers({ where: { id: user.id } });

        if (isLiked[0]) {
          v.dataValues.isLiked = true;
        }
        if (isDisliked[0]) {
          v.dataValues.isDisliked = true;
        }
        return v;
      }))
    }

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
    const isDisliked = await comment.getDislikers({
      where: {
        id: user.id
      },
      attributes: ['id'],
    })

    if (isDisliked) {
      await comment.removeDislikers([user.id]);
      await comment.update({
        dislikeNumb: (comment.dislikeNumb !== 0) ? comment.dislikeNumb - 1 : 0,
      })
    }

    const isLiked = await comment.getLikers({
      where: {
        id: user.id
      },
      attributes: ['id'],
    });

    if (isLiked[0]) {
      await comment.removeLikers([user.id]);
      await comment.update({
        likeNumb: (comment.likeNumb !== 0) ? comment.likeNumb - 1 : 0,
      })      
    } else {
      await comment.addLikers(user.id);
      await comment.update({
        likeNumb: comment.likeNumb + 1,
      })
    }

    const newComment = await db.Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      }],
    })

    if (isLiked[0]) {
      newComment.dataValues.isLiked = false;
    } else {
      newComment.dataValues.isLiked = true;
    }

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
      await comment.update({
        likeNumb: (comment.likeNumb !== 0) ? comment.likeNumb - 1 : 0,
      })      
    }

    const isDisliked = await comment.getDislikers({
      where: {
        id: user.id
      },
      attributes: ['id'],
    });

    if (isDisliked[0]) {
      await comment.removeDislikers([user.id]);
      await comment.update({
        dislikeNumb: (comment.dislikeNumb !== 0) ? comment.dislikeNumb - 1 : 0,
      })      
    } else {
      await comment.addDislikers(user.id);
      await comment.update({
        dislikeNumb: comment.dislikeNumb + 1,
      })      
    }

    const newComment = await db.Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      }],   
    });

    if (isDisliked[0]) {
      newComment.dataValues.isDisliked = false;
    } else {
      newComment.dataValues.isDisliked = true;
    }

    return res.json(newComment);    
  } catch (e) {
    console.error(e);
    return next(e);
  }
};
