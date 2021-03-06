const jwt = require('jsonwebtoken');
const httpContext = require('express-http-context');
const db = require('../models');

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const me = await db.User.findOne({
      where: {
        id: decoded.id
      }
    });

    httpContext.set('user', me);

    // 토큰 재발급
    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp - now < 60 * 60 * 24 * 2) {
      const user = await db.User.findOne({
        where: {
          email: decoded.email
        }
      });

      const token = user.generateToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: true,
      });      
    }

    return next();

  } catch (e) {
    console.error(e);
    return next();
  }
}

module.exports = jwtMiddleware;