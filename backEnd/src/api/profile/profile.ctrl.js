const db = require('../../models');
const httpContext = require('express-http-context');

exports.submitData = async (req, res, next) => {
  console.log(req.file);
  res.json(req.file.filename);
};
