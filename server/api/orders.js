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
      req.session.cart[0].products = []
      req.session.save()
      res.json(updatedOrders)
    } else {
      // not logged in
      req.session.cart.products.push(productById)
      req.session.save()
      res.json([req.session.cart]) // sends whole cart but as an array bc user orders sent as an array
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
      // const newCart = req.session.cart.products.filter(product => {
      //   parseInt(product.id) !== parseInt(req.params.productId)
      // })
      // not totally working yet... keeps deleting whole cart. front end seems ok though
      console.log('req.session.cart.products', req.session.cart.products)
      console.log('req.params.productId', parseInt(req.params.productId))
      // req.session.cart.products = newCart
      // req.session.save()
      // res.json([req.session.cart])
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
