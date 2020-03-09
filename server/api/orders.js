const router = require('express').Router()
const {Product, Order} = require('../db/models')
module.exports = router

router.post('/:productId', async (req, res, next) => {
  try {
    let cart
    const productById = await Product.findByPk(req.params.productId)
    if (req.user) {
      // if logged in
      cart = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          completed: false
        }
      })
      await cart[0].addProduct(productById)
      const updatedOrders = await Order.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: Product,
            required: false
          }
        ]
      })
      req.session.products = []
      req.session.save()
      res.json(updatedOrders)
    } else {
      // not logged in
      req.session.cart.products.push(productById)
      req.session.save()
      res.json(res.session.cart)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const productById = await Product.findByPk(req.params.productId)
    if (req.user) {
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          completed: false
        }
      })
      await order.removeProduct(productById)
      const updatedOrders = await Order.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: Product,
            required: false
          }
        ]
      })
      res.json(updatedOrders)
    } else {
      // need to test once front end up
      // req.session.cart.products = req.session.cart.products.filter(product => {
      //   product.id !== req.params.productId
      // })
      req.session.save()
      res.json(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    await cart.update({completed: true})
    await Order.create({
      userId: req.user.id
    })

    const updatedOrders = await Order.findAll({
      where: {
        userId: req.user.id
      },
      include: {
        model: Product,
        required: false
      }
    })
    res.json(updatedOrders)
  } catch (error) {
    next(error)
  }
})
