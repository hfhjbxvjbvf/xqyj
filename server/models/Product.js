// models/Product.js
const mongoose = require('mongoose');

// 定义产品模型
const productSchema = new mongoose.Schema({
  name: { 
    type: String 
  },
  description: {
     type: String
    },
  price: {
     type: Number
    },
  category: {
     type: String 
    },
  image: [{
    type:String
  }] 
    
   // 图片路径
}, { timestamps: true });  // 自动生成创建和更新的时间戳

module.exports = mongoose.model('Product', productSchema);
