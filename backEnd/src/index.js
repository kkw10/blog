require('dotenv').config();
const { PORT } = process.env;

const Express = require('express');
const morgan = require('morgan');
const db = require('./models');
const authAPIRouter = require('./api/auth');

const app = new Express();
db.sequelize.sync();

// Middleware 설정
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// API 설정
app.use('/api/auth', authAPIRouter);

const port = PORT || 8080;
app.listen(port, () => {
  console.log(`[@@@ Backend server is running on ${port}port...]`)
})