const express = require('express');
const User = require('../../models/User');

const router = express.Router();

// 创建用户
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: '创建用户失败' });
  }
});

// 更新用户
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: '更新用户失败' });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (error) {
    res.status(400).send({ message: '删除用户失败' });
  }
});

// 获取所有用户
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send({ users });
  } catch (error) {
    res.status(400).send({ message: '获取用户失败' });
  }
});

// 获取单个用户
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: '用户未找到' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: '获取用户详情失败' });
  }
});

module.exports = router;
