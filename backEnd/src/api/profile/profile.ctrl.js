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
