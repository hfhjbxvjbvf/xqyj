const express = require('express')
const router = express.Router()
const articles = require('../../models/Article')

router.post('/', async (req, res) => {
    const model = await articles.create(req.body)
    res.send(model)
  })
  router.put('/:id', async (req, res) => {
    const model = await articles.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await articles.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
    })
  })
  router.get('/', async (req, res) => {
    const items = await articles.find().limit(100)
    res.send(items)
  })
  router.get('/:id', async (req, res) => {
    const model = await articles.findById(req.params.id)
    res.send(model)
  })
  module.exports = router