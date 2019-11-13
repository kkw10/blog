const httpContext = require('express-http-context');

const checkLogedIn = (req, res, next) => {
  if (!httpContext.get('user')) {
    return res.status(401).send('[Unauthorized]: 유효하지 않은 사용자입니다.');
  }

  return next();
};

module.exports = checkLogedIn;
