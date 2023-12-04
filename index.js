const express = require('express');
const morgan = require('morgan');
const router = require('./server');
require('dotenv').config();

// init
const app = express();

// config
const port = process.env.PORT || 3000;
require('./db');
// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => res.send('hello world!'));
router(app);

// server
app.listen(port, () => console.log(`server on http://localhost:${port}`));
