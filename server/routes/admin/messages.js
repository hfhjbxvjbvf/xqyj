const express = require('express')
const router = express.Router()
const Messages = require('../../models/Message')

//获取评论列表
router.get('/', async (req, res) => {
  const items = await Messages.find()
  res.send(items)
})

//删除评论
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Messages.findByIdAndDelete(req.params.id, req.body)
  res.send({
    message: '删除成功'
  })
})

module.exports = router