const express = require('express');
const Slideshow = require('../../models/Slideshow');

const router = express.Router();

// 创建产品
router.post('/', async (req, res) => {
  try {
    const slideshow = await Slideshow.create(req.body);
    res.send(slideshow);
  } catch (error) {
    res.status(400).send({ message: '创建轮播图失败' });
  }
});

// 删除轮播图
router.delete('/:id', async (req, res) => {
  try {
    const deletedSlideshow = await Slideshow.findByIdAndDelete(req.params.id);
    console.log(deletedSlideshow);
    if (!deletedSlideshow) {
      return res.status(404).send({ message: '轮播图未找到' });
    }
    res.send({ success: true, deletedSlideshow });
  } catch (error) {
    res.status(400).send({ message: '删除产品失败' });
  }
});

// 获取轮播图
router.get('/', async (req, res) => {
  try {
    const slideshow = await Slideshow.find();
    res.send({ slideshow });
  } catch (error) {
    res.status(400).send({ message: '获取轮播图失败' });
  }
});
//更新轮播图

module.exports = router;
