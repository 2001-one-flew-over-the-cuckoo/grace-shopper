const router = require('express').Router()
const {Product, Order} = require('../db/models')
module.exports = router

router.post('/:productId', async (req, res, next) => {
  try {
    let order
    const product = await Product.findByPk(req.params.productId)

    if (req.user) {
      console.log('req.user', req.user)
      // find user cart
      order = await Order.findOne({
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
      order.addProduct(product)
      order.save()

      order = order.products
    } else if (req.session.cart) {
      console.log('req.session.cart', req.session.cart)
      // use session cart
      order = req.session.cart
      order.push(product)
      req.session.save()
    } else {
      // make new order/cart
      order = Order.build({})
      order.push(product)
      req.session.cart = order
      req.session.save()
    }

    console.log('order', order)

    res.json(order)
  } catch (error) {
    console.log('error', error)
    next(error)
  }
})
