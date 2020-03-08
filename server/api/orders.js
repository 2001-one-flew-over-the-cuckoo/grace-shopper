const router = require('express').Router()
const {Product, Order} = require('../db/models')
module.exports = router

router.post('/:productId', async (req, res, next) => {
  try {
    let cart
    const productById = await Product.findByPk(req.params.productId)
    // console.log('productById', productById)
    // console.log('req.user', req.user)

    if (req.user) {
      // console.log('req.user hit', req.user)
      // find user cart
      cart = await Order.findOne({
        where: {
          userId: req.user.id,
          completed: false
        }
        // include: [
        //   {
        //     model: Product,
        //     required: false
        //   }
        // ]
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

      cart = cart.products
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

    // console.log('order', order)

    res.json(cart)
  } catch (error) {
    // console.log('error', error)
    next(error)
  }
})
