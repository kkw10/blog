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
  const targetUser = req.params.userId;

  try {
    const userProfile = await db.User.findOne({
      where: { id: targetUser },
      attributes: [
        'id',
        'nickname',
        'portrait',
        'background',
        'title',
        'descript',
        'location',
        'favorite',
        'contact'
      ],
      include: [{
        model: db.User,
        through: 'Follow',
        as: 'Followers',
        attributes: {
          exclude: ['password']
        },
      }, {
        model: db.User,
        through: 'Follow',
        as: 'Followings',
        attributes: {
          exclude: ['password']
        },
      }],

    });

    res.send(userProfile);
  } catch (e) {
    console.error(e);
    return next(e);
  }
}
