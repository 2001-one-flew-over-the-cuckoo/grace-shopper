const router = require('express').Router()
const {Product, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let cart
    const productById = await Product.findByPk(req.body.productId)
    // for logged in user
    if (req.user) {
      // find user cart
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
      res.json(updatedOrders)
      // anonymous user with a cart
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    await order.removeProduct(product)

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
