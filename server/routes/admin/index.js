const express = require('express');
const router = express.Router();

// 引入各模块接口
const loginRoutes = require('./login');
const uploadRoutes = require('./upload');
const articlesRoutes = require('./articles');
const categoriesRoutes = require('./categories');
const commentsRoutes = require('./comments');
const emailRoutes = require('./email');
const linksRoutes = require('./links');
const messagesRoutes = require('./messages');
const productsRoutes = require('./Product');
const slideshowsRoutes = require('./Slideshow');
const usersRoutes = require('./User');

// 挂载各模块路由
router.use('/login', loginRoutes);          // 登录
router.use('/upload', uploadRoutes);        // 上传
router.use('/articles', articlesRoutes);    // 文章
router.use('/categories', categoriesRoutes); // 分类
router.use('/comments', commentsRoutes);    // 评论
router.use('/email', emailRoutes);          // 邮件
router.use('/links', linksRoutes);          // 链接
router.use('/messages', messagesRoutes);    // 消息
router.use('/products', productsRoutes);    // 产品
router.use('/slideshows', slideshowsRoutes);// 轮播图
router.use('/users', usersRoutes);          // 用户

module.exports = router;
