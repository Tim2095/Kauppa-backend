const productRouter = require('express').Router()
const productSchema = require('../models/productSchema')

productRouter.post('/', async (req, res) => {
  const product = req.body
  console.log(product)
  res.json(product)
})

module.exports = productRouter