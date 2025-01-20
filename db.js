const mysql = require('mysql2');

const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,

  host: "sql7.freesqldatabase.com",
  database : "sql7758150",
  user: "sql7758150",
  password: "ESdNyH3gzd"
//   Port number: 3306


});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;
