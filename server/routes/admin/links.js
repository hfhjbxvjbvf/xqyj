const express = require('express')
const router = express.Router()
const link = require('../../models/Link')

router.post('/', async (req, res) => {
    const model = await link.create(req.body)
    res.send(model)
  })
  router.put('/:id', async (req, res) => {
    const model = await link.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await link.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true,
    })
  })
  router.get('/', async (req, res) => {
    const queryOptions = {}
    const items = await link.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  router.get('/:id', async (req, res) => {
    const model = await link.findById(req.params.id)
    res.send(model)
  })

  module.exports = router
