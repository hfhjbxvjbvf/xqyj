module.exports = (app) => {
  const mongoose = require("mongoose");
  const dbUri = "mongodb://localhost:27017/blog";

  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    console.log('数据库连接成功');
    require("require-all")(__dirname + "/../models"); // 在数据库连接成功后加载模型
  }).catch((error) => {
    console.error('数据库连接失败:', error);
  });
};