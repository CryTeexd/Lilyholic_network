const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(result[0]);
  });
});

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM posts WHERE user_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    res.json(result);
  });
});

module.exports = router;