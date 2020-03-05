const router = require('express').Router()

const {Product, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    req.session.hello = 'Hello'

    console.log('req.session', req.session)
    console.log('req.session.cookie', req.session.cookie)
    // const order = await Order.findOrCreate()
  } catch (error) {
    next(error)
  }
})

module.exports = router
