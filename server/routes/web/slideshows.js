const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Slideshow = mongoose.model("Slideshow");

// 获取所有轮播图
router.get('/', async (req, res) => {
  const slideshow = await Slideshow.find();
  res.send(slideshow);
});

module.exports = router;
