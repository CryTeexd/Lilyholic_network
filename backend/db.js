const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysqlstudenti.litv.sssvt.cz",
  user: "scheiberlukas",
  password: "123456",
  database: "4a2_scheiberlukas_db2"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;