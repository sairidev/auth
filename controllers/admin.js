const db = require('../db');

function updateRole(req, res) {
  const { id, role } = req.body;

  try {
    db.query(`UPDATE users SET role = ${role} WHERE id = "${id}"`);

    res.send('updated user roles!');
  } catch (error) {
    res.send('server error');
  }
}
function deleteteUser(req, res) {
  const { id } = req.body;

  try {
    db.query(`DELETE FROM users WHERE id = "${id}"`, (err, result) => {
      if (err) throw err;

      res.send('User deleted!');
    });
  } catch (error) {
    res.send('Sever Error');
  }
}

module.exports = { updateRole, deleteteUser };
