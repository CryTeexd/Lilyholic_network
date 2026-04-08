const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Post route' });
});

router.get('/:postId', (req, res) => {
    const postId = req.params.postId;
    res.json({ 
        message: `Post details for ID: ${postId}`,
        postId
    });
});

router.post('/', (req, res) => {
    const { title, content, userId } = req.body;
    res.json({ 
        message: 'Post created',
        title,
        content,
        userId
    });
});

router.get("/:postId/comments", (req, res) => {
  const postId = req.params.postId;

  res.json({
    message: "Comments for post",
    postId
  });
});

router.post("/:postId/comments", (req, res) => {
  const postId = req.params.postId;
  const { userId, content } = req.body;

  res.json({
    message: "Comment added to post",
    postId,
    userId,
    content
  });
});

router.post("/:postId/like", (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;

  res.json({
    message: "Like added to post",
    postId,
    userId
  });
});

module.exports = router;