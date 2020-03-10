const router = require('express').Router()
const {Product, Order} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    cart = await Order.findOne({
      where: {userId: req.user.id, completed: false}
    })
    await cart.getProducts().then(async products => {
      products.forEach(product => {
        if (product.id === req.body.productId) {
          product.product_order.quantity = req.body.quantity
          return product.product_order.save()
        }
      })
    })
    const updatedOrders = await Order.findAll({
      where: {userId: req.user.id},
      include: {model: Product, required: false}
    })
    res.json(updatedOrders)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const productById = await Product.findByPk(req.body.productId)
    const cart = await Order.findOrCreate({
      where: {userId: req.user.id, completed: false}
    })
    await cart[0].addProduct(productById, {
      through: {quantity: req.body.quantity}
    })
    const updatedOrders = await Order.findAll({
      where: {userId: req.user.id},
      include: {model: Product, required: false}
    })
    res.json(updatedOrders)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    const order = await Order.findOne({
      where: {userId: req.user.id, completed: false}
    })
    await order.removeProduct(product)

    const updatedOrders = await Order.findAll({
      where: {userId: req.user.id},
      include: {model: Product, required: false}
    })
    res.json(updatedOrders)
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {userId: req.user.id, completed: false}
    })
    await cart.update({completed: true})
    await Order.create({userId: req.user.id})

    const updatedOrders = await Order.findAll({
      where: {userId: req.user.id},
      include: {model: Product, required: false}
    })
    res.json(updatedOrders)
  } catch (error) {
    next(error)
  }
})
