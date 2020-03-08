const router = require('express').Router()
const {Product, Order} = require('../db/models')
module.exports = router

router.post('/:productId', async (req, res, next) => {
  try {
    let cart
    console.log('req.params.productId', req.params.productId)
    const productById = await Product.findByPk(req.params.productId)
    // for logged in user
    if (req.user) {
      console.log('hitting router.post')
      // find user cart
      cart = await Order.findOne({
        where: {
          userId: req.user.id,
          completed: false
        }
      })
      const cartBefore = await Order.findOne({
        where: {
          userId: req.user.id,
          completed: false
        },
        include: [
          {
            model: Product,
            required: false
          }
        ]
      })
      cartBefore.products.map(product =>
        console.log('cartv1 id, name', product.id, product.name)
      )
      await cart.addProduct(productById)
      const cartAfter = await Order.findOne({
        where: {
          userId: req.user.id,
          completed: false
        },
        include: [
          {
            model: Product,
            required: false
          }
        ]
      })
      cartAfter.products.map(product =>
        console.log('cartv2 id, name', product.id, product.name)
      )

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
    } else if (req.session.cart) {
      // console.log('req.session.cart', req.session.cart)
      // use session cart
      cart = req.session.cart
      cart.push(productById)
      req.session.save()
    } else {
      // make new cart/cart
      cart = Order.build({})
      cart.push(productById)
      req.session.cart = cart
      req.session.save()
    }
  } catch (error) {
    // console.log('error', error)
    next(error)
  }
})
