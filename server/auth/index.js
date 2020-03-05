const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
      // ,
      // include: [
      //   {
      //     model: Order,
      //     where: {
      //       completed: false
      //     },
      //     include: {
      //       model: Product
      //     }
      //   }
      // ]
    })
    // console.log('USER HERE', user.orders[0].products)
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
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
    if (email) userInfo.email = req.body.email
    if (password) userInfo.password = req.body.password
    const user = await User.create(userInfo)
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
})

router.use('/google', require('./google'))
