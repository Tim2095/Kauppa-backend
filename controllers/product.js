const productRouter = require('express').Router()
const Product = require('../models/productSchema')

productRouter.post('/', async (req, res) => {
  try {
    const product = new Product(req.body) 
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
})


productRouter.get('/', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

module.exports = productRouter