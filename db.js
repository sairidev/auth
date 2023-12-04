const { createConnection } = require('mysql2');
require('dotenv').config();

const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
});

// creating DB
db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`, (err) => {
  if (err) throw err;

  console.log('DB Created');
});

db.database = process.env.DB_NAME;
db.query(`USE ${process.env.DB_NAME}`);

// creating roles table and inserting admin moderator & user
db.query(
  'CREATE TABLE IF NOT EXISTS roles (id INT PRIMARY KEY AUTO_INCREMENT, type VARCHAR(255));',
  (err) => {
    if (err) throw err;

    console.log('Created Roles table!');
  }
);

db.query(
  'INSERT INTO roles (type) VALUES ("admin"), ("moderator"), ("user")',
  (err) => {
    if (err) throw err;

    console.log('created roles!');
  }
);

// creating users table and admin
db.query(
  'CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, username VARCHAR(255) UNIQUE, email VARCHAR(255) UNIQUE, password VARCHAR(255), role INT DEFAULT 3, FOREIGN KEY (role) REFERENCES roles(id))',
  (err) => {
    if (err) throw err;

    console.log('Created Users table!');
  }
);

module.exports = db;
