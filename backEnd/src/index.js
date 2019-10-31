require('dotenv').config();
const { PORT } = process.env;

const Express = require('express');
const morgan = require('morgan');
const db = require('./models');

const app = new Express();
db.sequelize.sync();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("Hello, Blog server!!");
})

const port = PORT || 8080;
app.listen(port, () => {
  console.log(`[@@@ Backend server is running on ${port}port...]`)
})