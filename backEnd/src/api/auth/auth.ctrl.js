const db = require('../../models');
const httpContext = require('express-http-context');

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

    const token = newUser.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
    })

    res.status(200).send(data);
    
  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(401).send('[Unauthorized]: 이메일과 비밀번호가 제대로 입력되지 않았습니다.');
  }

  try {
    const user = await db.User.findOne({
      where: { email: email },
      attributte: [
        'id',
        'email',
        'nickname',
      ]
    })

    if (!user) {
      res.status(401).send('[Unauthorized]: 일치하는 유저가 존재하지 않습니다.');
      return;
    }

    const valid = await user.checkPassword(password);

    if (!valid) {
      res.status(401).send('[Unauthorized]: 유효한 비밀번호가 아닙니다.');
      return;
    }

    const data = user.toJSON();
    delete data.password;

    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
    })

    res.status(200).send(data);

  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.check = async (req, res) => {
  const user = httpContext.get('user');

  try {
    if (!user) {
      res.status(401).send('[Unauthorized]: 유효하지 않은 사용자입니다.');
      return;
    };

    const profile = await db.User.findOne({
      where: {
        id: user.id
      },
      attributes: [
        'followers',
        'followings',
        'portrait',
        'background',
        'title',
        'descript',
        'location',
        'favorite',
        'contact',
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

    res.json({
      user,
      profile,
    });
  } catch(e) {
    console.error(e);
    return next(e);
  }  
};

exports.logout = async (req, res) => {
  res.cookie('access_token');
  res.status(200).send('로그아웃 하셨습니다.');
};