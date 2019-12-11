const db = require('../../models');
const httpContext = require('express-http-context');

exports.getPostById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await db.Post.findOne({
      where: { id },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      }, {
        model: db.HashTag,
        attributes: ['name']
      }, {
        model: db.User,
        through: 'RecomendPost',
        as: 'Recomenders',
      }],
    })
  
    if (!post) {
      res.status(404).send('[Not Found]: 존재하지 않는 포스트입니다.')
      return;
    }
  
    httpContext.set('post', post);
    return next();
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

exports.getCommentsInPost = async (req, res, next) => {
  const post = httpContext.get('post').dataValues;

  try {
    let comments = await db.Comment.findAndCountAll({
      where: {
        PostId: post.id,
      },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname', 'portrait']
      },{
        model: db.User,
        through: 'CommentsLike',
        as: 'Likers',
        attributes: ['id', 'email', 'nickname']
      }],
      distinct: true,
      order: [['createdAt', 'DESC']],
    })
    .then(result => {
      res.set('Comments-Count', result.count);
      return result.rows;
    });

    await httpContext.set('comments', comments);
    return next();
  } catch (e) {
    console.error(e);
    return next(e);
  }  
}

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

exports.isMyPost = (req, res, next) => {
  const user = httpContext.get('user');
  const post = httpContext.get('post').dataValues;

  if (user.id !== post.UserId) {
    res.status(403).send('[Unauthorized]: 유효하지 않은 사용자입니다.');
    return;
  };

  return next();
};

exports.write = async (req, res, next) => {
  const { title, contents, hashTags } = req.body;

  try {
    const newPost = await db.Post.create({
      title: title,
      contents: contents,
      views: 0,
      UserId: httpContext.get('user').id,
    });

    const newTags = await Promise.all(hashTags.map((tag) => (
      db.HashTag.findOrCreate({
        where: {
          name: tag.toLowerCase()
        }
      }))
    ));

    await newPost.addHashTag(newTags.map((newTag) => newTag[0]));

    res.status(200).json(newPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

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
        attributes: ['id', 'email', 'nickname'],
      }],
    })

    res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.read = async (req, res, next) => {
  const post = httpContext.get('post');
  const comments = httpContext.get('comments');

  try {
    await post.update({
      views: post.views + 1,
    })

    const data = {
      post,
      comments,
    }

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.readComments = async (req, res, next) => {
  const post = httpContext.get('post');

  try {
    const comments = await db.Comment.findAndCountAll({
      where: {
        PostId: post.id,
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
      distinct: true,
      order: [['createdAt', 'DESC']],
    })
    .then(result => {
      res.set('Comments-Count', result.count);
      return result.rows;
    })

    res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

exports.update = async (req, res, next) => {
  const { title, contents, hashTags } = req.body;
  const postId = req.params.id;
  const user = httpContext.get('user');

  try {
    const updatedPost = await db.Post.update({
      title: title,
      contents: contents,
    }, {
      returning: true,
      where: { id: postId },
    })
    .then(() => {
      const post = db.Post.findOne({
        where: { id: postId },
        include: [{
          model: db.User,
          attributes: ['email', 'nickname']
        }, {
          model: db.HashTag,
          attributes: ['name']
        }],
      })

      return post;
    });

    const updatedTags = await Promise.all(hashTags.map((tag) => (
      db.HashTag.findOrCreate({
        where: {
          name: tag.toLowerCase()
        }
      }))
    ));
    await updatedPost.setHashTags([]); // 기존 연결관계 초기화
    await updatedPost.addHashTag(updatedTags.map((updatedTag) => updatedTag[0]));

    res.json({
      UserId: user.id,
      id: postId
    });
  } catch(e) {
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

exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const post = httpContext.get('post')

  try {
    await post.setHashTags([]);
    await db.Post.destroy({
      where: {
        id: id,
      }
    });

    res.status(200).send('삭제가 완료되었습니다.');
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

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
}

exports.recomendPost = async (req, res, next) => {
  const user = httpContext.get('user');
  const post = httpContext.get('post');
  
  try {
    const isRecomended = await post.getRecomenders({
      where: {
        id: user.id,
      },
      attributes: ['id'],
    })

    if (isRecomended[0]) {
      await post.removeRecomenders(user.id);
    } else {
      await post.addRecomenders(user.id);
    }

    const newRecomenders = await post.getRecomenders();

    res.json(newRecomenders);
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

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