const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = `
    SELECT posts.*, users.first_name, users.last_name
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;

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

router.get("/:postId", (req, res) => {
  const postId = req.params.postId;

  const sql = `
    SELECT posts.*, users.first_name, users.last_name
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?
  `;

  db.query(sql, [postId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json(result[0]);
  });
});

router.post("/", (req, res) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const sql = `
    INSERT INTO posts (user_id, title, content)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userId, title, content], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    res.json({
      message: "Post created successfully",
      postId: result.insertId
    });
  });
});

router.get("/:postId/comments", (req, res) => {
  const postId = req.params.postId;

  const sql = `
    SELECT comments.*, users.first_name, users.last_name
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.created_at DESC
  `;

  db.query(sql, [postId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    res.json(result);
  });
});

router.post("/:postId/comments", (req, res) => {
  const postId = req.params.postId;
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const sql = `
    INSERT INTO comments (user_id, post_id, content)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userId, postId, content], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    res.json({
      message: "Comment added successfully",
      commentId: result.insertId
    });
  });
});

router.post("/:postId/like", (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      message: "Missing userId"
    });
  }

  const checkSql = `
    SELECT * FROM likes
    WHERE user_id = ? AND post_id = ?
  `;

  db.query(checkSql, [userId, postId], (checkErr, checkResult) => {
    if (checkErr) {
      return res.status(500).json({
        message: "Database error",
        error: checkErr
      });
    }

    if (checkResult.length > 0) {
      return res.status(400).json({
        message: "User already liked this post"
      });
    }

    const insertSql = `
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)
    `;

    db.query(insertSql, [userId, postId], (insertErr, insertResult) => {
      if (insertErr) {
        return res.status(500).json({
          message: "Database error",
          error: insertErr
        });
      }

      res.json({
        message: "Like added successfully",
        likeId: insertResult.insertId
      });
    });
  });
});

router.get("/:postId/likes", (req, res) => {
  const postId = req.params.postId;

  const sql = `
    SELECT COUNT(*) AS likeCount
    FROM likes
    WHERE post_id = ?
  `;

  db.query(sql, [postId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err
      });
    }

    res.json(result[0]);
  });
});

module.exports = router;