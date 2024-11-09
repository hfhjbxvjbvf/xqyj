const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = mongoose.model('Category');

// 标签
router.get('/', async (req, res) => {
    const data = await Category.aggregate([{
      $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: 'categories',
        as: 'tagsList'
      }
    }]).unwind('$tagsList').sort({
      'tagsList.createdAt': -1
    }).group({
      _id: "$name",
      count: {
        $sum: 1
      },
      list: {
        $push: {
          _id: '$_id',
          title: '$title',
          categories: '$tagsList',
          createdAt: '$createdAt',
        }
      }
    }).sort({
      'count': -1,
      '_id': -1
    })
    res.send(data)
  })

  module.exports = router;