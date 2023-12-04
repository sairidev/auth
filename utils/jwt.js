const jwt = require('jsonwebtoken');
require('dotenv').config();

function token(data) {
  return jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    process.env.SECRET_KEY
  );
}

function compare_token(token) {
  return jwt.decode(token, process.env.SECRET_KEY);
}

module.exports = { token, compare_token };
