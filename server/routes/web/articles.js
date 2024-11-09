const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Article = mongoose.model("Article");

 // 文章列表
 router.get("/list", async (req, res) => {
  const data = await Article.find().sort({
    'createdAt': -1
  });
  res.send(data);
});

// 最近
router.get("/recent", async (req, res) => {
  const data = await Article.find()
    .sort({
      'createdAt': -1
    }).limit(4);
  res.send(data);
});

// 获取指定页码的文章
router.get('/:pageNum', async (req, res) => {
  const currentPage = req.params.pageNum;
  const list = await Article.find().sort({
    'createdAt': -1
  }).skip((currentPage - 1) * 6).limit(6).populate('categories')
  const count = await Article.find().lean().countDocuments()
  const totalPage = Math.ceil(count / 6)
  res.send({
    list,
    totalArticles: count,
    totalPage,
    currentPage
  })
})

// 按照年月进行归类后的数据
router.get('/archive', async (req, res) => {
  const data = await Article.aggregate([{
      $sort: {
        createdAt: -1
      }
    }, {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'newList'
      }
    },
    {
      $group: {
        _id: {
          $month: '$createdAt',
        },
        count: {
          $sum: 1
        },
        list: {
          $push: {
            _id: '$_id',
            title: '$title',
            categories: '$newList',
            createdAt: '$createdAt',
          }
        }
      }
    },
  ]).sort({
    '_id': -1,
  })
  res.send(data)
})


// 文章详情
router.get("/list/:id", async (req, res) => {
  const data = await Article.findById(req.params.id).populate('categories');
  res.send(data);
});

module.exports = router;
