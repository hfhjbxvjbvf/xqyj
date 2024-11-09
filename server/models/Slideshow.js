const mongoose = require('mongoose');

const SlideshowSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // 关联产品的 ID
    ref: 'Product',
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Slideshow', SlideshowSchema);
