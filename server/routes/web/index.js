const express = require('express');
const router = express.Router();

// 引入各模块接口
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const articlesRoutes = require('./articles');
const tagsRoutes = require('./category');
const productsRoutes = require('./products');
const slideshowsRoutes = require('./slideshows');
const commentsRoutes = require('./comments');
const messagesRoutes = require('./messages');


// 挂载各模块路由
router.use('/articles', articlesRoutes);
router.use('/tags', tagsRoutes);
router.use('/users', usersRoutes);  //用户
router.use('/products', productsRoutes);    //商品
router.use('/slideshows', slideshowsRoutes);    //轮播图
router.use('/comments', commentsRoutes);
router.use('/messages', messagesRoutes);
router.use('/auth', authRoutes);    //用户登入

module.exports = router;
