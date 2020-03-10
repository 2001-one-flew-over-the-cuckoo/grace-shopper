const router = require('express').Router()
const {Product, Order, Product_Order} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    // req.body includes user

    // const existingCart = await Order.findOne({
    //       where: {
    //         userId: req.user.id,
    //         completed: false
    //       },
    //       include: [
    //         {
    //           model: Product,
    //           required: false,
    //           where: { id: req.body.productId },
    //           through: {
    //             attributes: ['quantity']
    //           }
    //         }
    //       ]
    //     })
    //     let existingItemQty = existingCart.products[0].product_order.quantity

    //     console.log(
    //       'existingCart....',
    //       existingCart.products[0].product_order.quantity
    //     )

    // existingCart.products[0].product_order.quantity = req.body.quantity
    // existingCart.products[0].product_order.save()

    // u.getProjects().then(projects => {
    //   const project = projects[0]
    //   if (project.UserProjects.status === 'active') {
    //     // .. do magic
    //     // since this is a real DAO instance, you can save it directly after you are done doing magic
    //     return project.UserProjects.save()
    //   }
    // })

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

    console.log('updatedOrders', updatedOrders)
    res.json(updatedOrders)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  // code before else statement is super hacky so ignore
  // basically you can update join table Product_Object instance directly, and you can do it in this route
  try {
    let cart
    const productById = await Product.findByPk(req.body.productId)

    const cartId = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    // console.log('cartId', cartId.id)

    // const cartContainsProduct = await Order.findOne({
    //   where: {
    //     userId: req.user.id,
    //     completed: false
    //   },
    //   include: [
    //     {
    //       model: Product,
    //       where: {
    //         id: req.body.productId
    //       }
    //     }
    //   ]
    // })

    // if (cartContainsProduct) {
    //   const joinTable = await Product_Order.findOne({
    //     where: {orderId: cartId.id}
    //   })
    //   console.log('cartContainsProduct', cartContainsProduct)
    //   console.log('req.body.quantity', req.body.quantity)

    //   await joinTable.update({
    //     quantity:
    //       cartContainsProduct.products[0].product_order.quantity +
    //       req.body.quantity
    //   })
    // } else {
    cart = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    // if prod isnt in cart
    await cart[0].addProduct(productById, {
      through: {quantity: req.body.quantity}
    })
    // }

    // console.log('magic methods', Object.keys(cart.__proto__))

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
