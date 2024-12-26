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

productRouter.get('/new-products', async (req, res) => {
  const products = await Product.find({}).limit(8)
  res.json(products)
})

module.exports = productRouter