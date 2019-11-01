const db = require('../../models');

exports.register = async (req, res, next) => {
  try {
    const exists = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (exists) {
      res.status(409).send('[Conflict]: 이미 존재하는 이메일 주소입니다.');
      return;
    }

    const newUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: await db.User.setPassword(req.body.password)
    });

    const data = newUser.toJSON();
    delete data.password;

    return res.status(200).send(data);
    
  } catch (e) {
    console.error(e);
    return next(e);
  }
}

exports.login = async (req, res) => {
  try {

  } catch (e) {

  }
}

exports.check = async (req, res) => {
  try {

  } catch (e) {

  }
}

exports.logout = async (req, res) => {
  try {

  } catch (e) {

  }
}