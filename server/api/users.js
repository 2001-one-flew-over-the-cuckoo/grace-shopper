const router = require('express').Router()
const {User, Product, Order} = require('../db/models')
const {adminsOnly, matchingUserOrAdmin} = require('./helperFuncs')

module.exports = router

router.get('/', adminsOnly, async (req, res, next) => {
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

router.get('/:userId', adminsOnly, async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      where: {
        id: req.params.userId
      },
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

// router.put('/:userId', matchingUserOrAdmin, async (req, res, next) => {
//   try {
//     const oldUser = await User.findByPk(req.params.userId)
//     const newUser = await oldUser.update(req.body)
//     res.json(newUser)
//   } catch (error) {
//     next(error)
//   }
// })
