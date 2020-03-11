const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [
        {
          model: Order,
          where: {
            completed: false
          },
          required: false,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    })

    if (!user) {
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const userInfo = {}
    if (req.body.email) userInfo.email = req.body.email
    if (req.body.password) userInfo.password = req.body.password
    const user = await User.create(userInfo)
    const order = await Order.create()
    user.addOrder(order)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  if (req.user) {
    const user = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [
        {
          model: Order,
          include: {
            model: Product
          }
        }
      ]
    })

    res.json(user)
  }
})

router.use('/google', require('./google'))
