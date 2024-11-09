const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const Article = mongoose.model("Article");

// 创建评论
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    await Article.findByIdAndUpdate(
      req.body.relateBlogId,
      { $inc: { msgs: 1 } }  // 增加评论计数
    );
    res.send(comment);
  } catch (error) {
    res.status(400).send({ message: '评论创建失败', error });
  }
});

// 获取指定文章的评论
router.get('/:blogsId', async (req, res) => {
  try {
    const comments = await Comment.find({ relateBlogId: req.params.blogsId });
    res.send(comments);
  } catch (error) {
    res.status(400).send({ message: '获取评论失败', error });
  }
});

module.exports = router;
