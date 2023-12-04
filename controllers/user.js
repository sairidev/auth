const bcryptjs = require('bcryptjs');
const tkn = require('../utils/jwt');
const db = require('../db');

async function signin(req, res) {
  const { email, password } = req.body;

  try {
    db.query(
      `SELECT email, password FROM users WHERE email = '${email}'`,
      async (err, db) => {
        if (err) throw err;

        const result = await bcryptjs.compare(password, db[0].password);

        if (!result) {
          res.send('Invalid User!');
        }

        res.json({ token: tkn.token({ email }) }).status(200);
      }
    );
  } catch (error) {
    res.send('Server Error!');
  }
}

async function signup(req, res) {
  const { username, email, password } = req.body;

  const id = Math.floor(Math.random() * 10000) + 1000;
  const salt = await bcryptjs.genSalt(10);
  const new_password = await bcryptjs.hash(password, salt);

  try {
    db.query(
      `INSERT INTO users (id, username, email, password) VALUES (
        '${id}', '${username}', '${email}', '${new_password}'
      )`,
      (err, db) => {
        if (err) throw err;

        res.json({ token: tkn.token({ email }) }).status(201);
      }
    );
  } catch (error) {
    res.send('server error!');
  }
}

module.exports = { signin, signup };
