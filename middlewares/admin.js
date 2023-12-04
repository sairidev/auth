const jwt = require('../utils/jwt');
const db = require('../db');
require('dotenv').config();

function admin(req, res, next) {
  const { token } = req.headers;

  const result = jwt.compare_token(token, process.env.SECRET_KEY);

  db.query(
    `SELECT * FROM users INNER JOIN roles ON users.role = roles.id WHERE email = "${result.data.email}"`,
    (err, result) => {
      if (err) throw err;

      if (result[0].role == 1 || result[0].role == 2) {
        next();
      }
    }
  );
}

module.exports = admin;
