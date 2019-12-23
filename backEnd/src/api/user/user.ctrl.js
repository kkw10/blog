const db = require('../../models');
const httpContext = require('express-http-context');

exports.findTargetUser = async (req, res, next) => {
  const targetId = req.params.userId;

  try {
    const user = await db.User.findOne({
      where: { id: targetId },
      attributes: {
        exclude: ['password'],
      }
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
      type: 'follow',
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
      type: 'unfollow',
      targetUser,
      me
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.unfollowing = async (req, res, next) => {
  const targetUser = httpContext.get('targetUser');
  const me = httpContext.get('user');

  try {
    await me.removeFollowers(targetUser.id);
    await me.update({
      followers: me.followers - 1,
    });
    await targetUser.update({
      followings: targetUser.followings - 1,
    });

    res.json({
      type: 'unfollowing',
      targetUser,
      me
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

exports.readFollowers = async (req, res, next) => {
  const targetId = req.params.userId;

  try {
    const targetUser = await db.User.findOne({
      where: { id: targetId },
      include: [{
        model: db.User,
        through: 'Follow',
        as: 'Followers',
        attributes: {
          exclude: ['password']
        },
      }],      
    });

    if (!targetUser) {
      res.status(404).send('[Not Found]: 존재하지 않는 유저입니다.');
      return;
    }

    res.json({
      type: 'followers',
      list: targetUser.Followers,
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.readFollowings = async (req, res, next) => {
  const targetId = req.params.userId;

  try {
    const targetUser = await db.User.findOne({
      where: { id: targetId },
      include: [{
        model: db.User,
        through: 'Follow',
        as: 'Followings',
        attributes: {
          exclude: ['password']
        },
      }],      
    });

    if (!targetUser) {
      res.status(404).send('[Not Found]: 존재하지 않는 유저입니다.');
      return;
    }

    res.json({
      type: 'followings',
      list: targetUser.Followings,
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
};