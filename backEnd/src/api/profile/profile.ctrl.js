const db = require('../../models');
const httpContext = require('express-http-context');

exports.submitPortrait = async (req, res, next) => {
  res.json(req.file.filename);
};

exports.submitProfile = async (req, res, next) => {
  const user = httpContext.get('user');
  const data = req.body;

  try {
    await db.User.update({
      portrait: data.userPortrait,
      title: data.userTitle,
      descript: data.userDescription, 
      location: data.userLocation,
      favorite: data.userFavorite,
      contact: data.userContact,
    }, {
      where: { id: user.id },
    });

    res.json({
      portrait: data.userPortrait,
      title: data.userTitle,
      descript: data.userDescription, 
      location: data.userLocation,
      favorite: data.userFavorite,
      contact: data.userContact,
    });
  } catch(e) {
    console.error(e);
    return next(e);
  }
};

exports.read = async (req, res, next) => {
  const targetUserId = req.params.userId;
  const me = httpContext.get('user');

  try {
    const targetUser = await db.User.findOne({
      where: { id: targetUserId }
    });

    if (me) {
      const isFollowed = await targetUser.getFollowers({ where: { id: me.id } });

      if (isFollowed[0]) {
        targetUser.dataValues.isFollowed = true;
      } else {
        targetUser.dataValues.isFollowed = false;
      }
    }

    res.send(targetUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
}
