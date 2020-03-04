const router = require('express').Router()
const {User, Product, Order, Product_Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      id: req.params.userId,
      include: {
        model: Order,
        include: {
          model: Product
        }
      }
    })
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const oldU = await User.findByPk(userId)
    const newU = await oldU.update(req.body)
    res.json(newU)
  } catch (error) {
    next(error)
  }
})
