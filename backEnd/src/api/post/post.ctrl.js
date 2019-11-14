const db = require('../../models');
const httpContext = require('express-http-context');

exports.getPostById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await db.Post.findOne({
      where: { id },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname']
      }, {
        model: db.HashTag,
        attributes: ['name']
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

exports.read = async (req, res, next) => {
  const post = httpContext.get('post').dataValues;
  res.status(200).json(post);
};

exports.update = async (req, res, next) => {
  const { title, contents, hashTags } = req.body;
  const id = req.params.id;

  try {
    const updatedPost = await db.Post.update({
      title: title,
      contents: contents,
    }, {
      returning: true,
      where: { id: id },
    })
    .then(() => {
      const post = db.Post.findOne({
        where: { id },
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

    res.status(200).send('수정이 완료되었습니다.');
  } catch(e) {
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