const db = require('../../models');

exports.list = async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: db.User,
        attributes: ['email', 'nickname']
      }, {
        model: db.HashTag,
        attributes: ['name']
      }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(posts);

  } catch (e) {
    console.error(e);
    return next(e);
  }
};