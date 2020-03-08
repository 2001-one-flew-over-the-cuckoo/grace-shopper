const router = require('express').Router()
const {Product, Order} = require('../db/models')
module.exports = router

router.post('/:productId', async (req, res, next) => {
  try {
    let cart
    const productById = await Product.findByPk(req.params.productId)
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
    } else if (req.session.cart) {
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
    // console.log('req.user', req.user)
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false
      }
    })

    console.log('cart', cart)
    await cart.update({completed: true})
    await Order.create({
      userId: req.user.id
    })

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
    console.log(updatedOrders)
    res.json(updatedOrders)
    // const updatedRobot = await robotById.update(req.body)
    // res.send(updatedRobot)
  } catch (error) {
    next(error)
  }
})
