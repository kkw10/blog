require('dotenv').config();
const { PORT } = process.env;

const Express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const httpContext = require('express-http-context');
const db = require('./models');
const authAPIRouter = require('./api/auth');
const userAPIRouter = require('./api/user');
const profileAPIRouter = require('./api/profile');
const postAPIRouter = require('./api/post');
const postsAPIRouter = require('./api/posts');
const jwtMiddleware = require('./lib/jwtMiddleware');
const path = require('path');

const app = new Express();
db.sequelize.sync();

// Middleware 설정
app.use(morgan('dev'));
app.use('/uploads', Express.static('uploads'));
app.use(Express.static(path.resolve(__dirname, '../../frontEnd/dist')));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(httpContext.middleware);
app.use(jwtMiddleware);

// API 설정
app.use('/api/auth', authAPIRouter);
app.use('/api/user', userAPIRouter);
app.use('/api/profile', profileAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

// 빌드 파일 제공
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontEnd/dist', 'index.html'));
});

const port = PORT || 80;
app.listen(port, () => {
  console.log(`[@@@ Backend server is running on ${port}port...]`)
})