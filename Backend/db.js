// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // default XAMPP user
  password: "",        // default XAMPP password is empty
  database: "handygotest",   // your DB name
});

module.exports = pool.promise();
