const db = require('../../models');
const httpContext = require('express-http-context');

exports.findTargetUser = async (req, res, next) => {
  const targetId = req.params.userId;

  try {
    const user = await db.User.findOne({
      where: { id: targetId },
    });

    if (!user) {
      res.status(404).send('[Not found]: 존재하지 않는 유저입니다.');
      return;
    };

    httpContext.set('targetUser', user);
    return next();
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.follow = async (req, res, next) => {
  const targetUser = httpContext.get('targetUser');
  const me = httpContext.get('user');

  try {
    await targetUser.addFollowers(me.id);
    await targetUser.update({
      followers: targetUser.followers + 1,
    });
    await me.update({
      followings: me.followings + 1,
    });
    targetUser.dataValues.isFollowed = true;

    res.json({
      targetUser,
      me,
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

exports.unfollow = async (req, res, next) => {
  const targetUser = httpContext.get('targetUser');
  const me = httpContext.get('user');

  try {
    await targetUser.removeFollowers(me.id);
    await targetUser.update({
      followers: targetUser.followers - 1,
    });
    await me.update({
      followings: me.followings - 1,
    });
    targetUser.dataValues.isFollowed = false;

    res.json({
      targetUser,
      me
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};