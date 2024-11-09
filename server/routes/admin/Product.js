  const express = require('express');
  const Product = require('../../models/Product');

  const router = express.Router();

  // 创建产品
  router.post('/', async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (error) {
      res.status(400).send({ message: '创建产品失败' });
    }
  });

  // 更新产品
  router.put('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(product);
    } catch (error) {
      res.status(400).send({ message: '更新产品失败' });
    }
  });

  // 删除产品
  router.delete('/:id', async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.send({ success: true });
    } catch (error) {
      res.status(400).send({ message: '删除产品失败' });
    }
  });

  // 获取所有产品
  router.get('/', async (req, res) => {
    try {
      //空值似乎不能作为传递的值了，不会输出全部
      const category = req.query.category || 'CPU';
      const products = await Product.find({category});
      res.send({ products });
    } catch (error) {
      res.status(400).send({ message: '获取产品失败' });
    }
  });

  // 获取单个产品
  router.get('/:id', async (req, res) => {
    try {
      id = req.params.id;
      console.log(id);
      const product = await Product.findById(req.params.id);
      console.log(product);
      // if (!product) {
      //   return res.status(404).send({ message: '产品未找到' });
      // }
      res.send(product);
    } catch (error) {
      res.status(400).send({ message: '获取产品详情失败' });
    }
  });

  module.exports = router;
