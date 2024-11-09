const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')

//编辑分类
router.put('/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    console.log(model)
    res.send(model)
})

//创建分类
router.post('/', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
})

//删除分类
router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
        success: true,
    })
})

//获取分类
router.get('/', async (req, res) => {
    const items = await Category.find().limit(100)
    res.send(items)
})

module.exports = router