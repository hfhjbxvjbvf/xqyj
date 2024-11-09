const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/AdminUser');
const assert = require('http-assert');
const jwt = require('jsonwebtoken');

// 登录接口
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await AdminUser.findOne({ username }).select('+password');
  assert(user, 422, '用户不存在');

  const isValid = require('bcryptjs').compareSync(password, user.password);
  assert(isValid, 422, '密码错误');

  const token = jwt.sign({ id: user._id }, req.app.get('secret'));
  res.send({ token, username });
});

//获取管理员列表
router.get('/', async (req, res) => {
  const data = await AdminUser.find();
  res.send(data);
});
//获取单个管理员
router.get('/:id', async (req, res) => {
  const data = await AdminUser.findById(req.params.id);
  res.send(data);
});

//删除管理员
router.delete('/:id', async (req, res) => {
  await AdminUser.findByIdAndDelete(req.params.id);
  res.send({});
});
//编辑管理员
router.put('/:id', async (req, res) => {
  console.log(req.params.id);
  const data = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
  res.send(data);
});
// 第一次登录把注册注释取消
router.post('/register', async (req, res) => {
    const user = await AdminUser.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send(user);
  });

module.exports = router;