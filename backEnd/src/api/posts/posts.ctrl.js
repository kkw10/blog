const db = require('../../models');

exports.list = async (req, res, next) => {
  let pageNum = req.query.page || 1;
  let offset = 0;

  if (pageNum < 1) {
    res.status(400).send('요청하신 페이지가 존재하지 않습니다.');
  }
 
  if (pageNum > 1) {
    offset = 10 * (pageNum - 1)
  }
  
  try {
    const posts = await db.Post.findAndCountAll({
      include: [{
        model: db.User,
        attributes: ['email', 'nickname']
      }, {
        model: db.HashTag,
        attributes: ['name']
      }, {
        model: db.Comment,
        attributes: ['id'],
      }, {
        model: db.User,
        through: 'RecomendPost',
        as: 'Recomenders',
        attributes: ['id', 'email', 'nickname']
      }],
      distinct: true, // result.count 오류 해결 
      offset: offset,
      limit: 10,
      order: [['createdAt', 'DESC']],
    })
    .then(result => {
      res.set('Last-Page', Math.ceil(result.count / 10));
      return result.rows;
    });   

    res.status(200).json(posts);

  } catch (e) {
    console.error(e);
    return next(e);
  }
};

exports.userList = async (req, res, next) => {
  const targetId = req.params.UserId;

  try {
    let pageNum = req.query.page || 1;
    let offset = 0;
  
    if (pageNum < 1) {
      res.status(400).send('요청하신 페이지가 존재하지 않습니다.');
    }
   
    if (pageNum > 1) {
      offset = 10 * (pageNum - 1)
    }
    
    const posts = await db.Post.findAndCountAll({
      where: {
        UserId: targetId,
      },
      include: [{
        model: db.User,
        attributes: ['email', 'nickname']
      }, {
        model: db.HashTag,
        attributes: ['name']
      }, {
        model: db.Comment,
        attributes: ['id'],
      }, {
        model: db.User,
        through: 'RecomendPost',
        as: 'Recomenders',
        attributes: ['id', 'email', 'nickname']
      }],
      distinct: true, // result.count 오류 해결 
      offset: offset,
      limit: 10,
      order: [['createdAt', 'DESC']],
    })
    .then(result => {
      res.set('Last-Page', Math.ceil(result.count / 10));
      return result.rows;
    });   

    res.status(200).json(posts);

  } catch (e) {
    console.error(e);
    return next(e);
  }
};