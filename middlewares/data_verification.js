function data_verification(req, res, next) {
  const { email, password } = req.body;
  if (email.length == 0 || password.length == 0) {
    res.send('The fields are empty!');
  }
  next();
}

module.exports = data_verification;
