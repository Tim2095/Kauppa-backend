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

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch(err) {
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = productRouter