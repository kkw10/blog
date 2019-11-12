require('dotenv').config();
const { PORT } = process.env;

const Express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const httpContext = require('express-http-context');
const db = require('./models');
const authAPIRouter = require('./api/auth');
const postAPIRouter = require('./api/post');
const postsAPIRouter = require('./api/posts');
const jwtMiddleware = require('./lib/jwtMiddleware');

const app = new Express();
db.sequelize.sync();

// Middleware 설정
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(httpContext.middleware);
app.use(jwtMiddleware);

// API 설정
app.use('/api/auth', authAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

const port = PORT || 8080;
app.listen(port, () => {
  console.log(`[@@@ Backend server is running on ${port}port...]`)
})