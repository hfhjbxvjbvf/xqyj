const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

// 获取所有产品
router.get('/', async (req, res) => {
  const { category, page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  let query = category ? { category } : {};
  const products = await Product.find(query).skip(skip).limit(limit);
  res.send(products);
});

// 获取单个产品
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send({ message: '产品未找到' });
  res.send(product);
});

module.exports = router;
