const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "key";

router.post("/register", async (req, res) => {
  const { firstName, lastName, age, gender, username, password } = req.body;

  if (!firstName || !lastName || !age || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (first_name, last_name, age, gender, username, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [firstName, lastName, age, gender, username, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err
          });
        }

        res.json({
          message: "User registered successfully"
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error hashing password" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT id, username, password FROM users WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  });
});

module.exports = router;