const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

// 创建用户
router.post('/', async (req, res) => {
  const data = await User.create(req.body);
  res.send(data);
});

// 获取所有用户
router.get('/', async (req, res) => {
  const data = await User.find();
  res.send(data);
});

// 更新用户
router.put('/:id', async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body);
  res.send(data);
});

module.exports = router;
