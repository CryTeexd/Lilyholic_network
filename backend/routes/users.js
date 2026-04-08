const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Users route" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: "User details",
    id
  });
});

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;

  res.json({
    message: "User posts",
    id
  });
});

module.exports = router;