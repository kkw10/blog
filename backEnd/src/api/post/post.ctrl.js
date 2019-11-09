const db = require('../../models');
const httpContext = require('express-http-context');

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

};

exports.update = async (req, res, next) => {

};

exports.delete = async (req, res, next) => {

};