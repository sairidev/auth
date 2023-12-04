const express = require('express');

function router(app) {
  const common = express();
  app.use('/api/v1', common);

  common.use('/user', require('./routes/user'));
  common.use('/admin', require('./routes/admin'));
}

module.exports = router;
