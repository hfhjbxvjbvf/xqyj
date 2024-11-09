const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Message = mongoose.model("Message");

// 创建留言
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.send(message);
  } catch (error) {
    res.status(400).send({ message: '留言创建失败', error });
  }
});

// 获取所有留言
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.send(messages);
  } catch (error) {
    res.status(400).send({ message: '获取留言失败', error });
  }
});

module.exports = router;
