const express = require('express')
const cors = require('cors')
const session = require('express-session');
const app = express()

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


app.set('secret', 'i2u34y12oi3u4y8'); //密钥推荐保存到环境变量,如 process.env.SESSION_SECRET
app.use(session({
  secret: app.get('secret'), // 使用 app.set 设置的密钥
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 若使用 HTTPS 则将其改为 true
}));
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
// const mainRouter = require('./routes/web/index.js'); // 确保路径正确
// app.use('/web/api', mainRouter); // 将主路由器挂载到 /web/api 下
require('./plugins/db')(app)
// 引入 admin 路由
const adminRoutes = require('./routes/admin/index');
app.use('/admin/api', adminRoutes);

// 错误处理函数
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message,
  });
});
const routerweb = require('./routes/web/index')
app.use('/web/api', routerweb)

app.listen(3000, async (req, res) => {
  console.log('http://localhost:3000')
})
