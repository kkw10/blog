const db = require('../../models');
const httpContext = require('express-http-context');

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

exports.deleteSubComment = async (req, res, next) => {
  const user = httpContext.get('user');
  const comment = httpContext.get('comment');
  const parentId = req.body.parentId;

  try {
    if (user.id !== comment.UserId) {
      res.status(401).send('[Unauthorized]: 권한이 없는 사용자 입니다.');
      return;
    }

    await comment.destroy({
      where: {
        id: comment.id
      }
    });

    res.json({
      parentId,
      childId: comment.id,
    })
  } catch (e) {
    console.error(e);
    return next(e);
  }
};
