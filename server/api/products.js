/* eslint-disable complexity */
const router = require('express').Router()
const {Product} = require('../db/models')
const {adminsOnly} = require('./helperFuncs')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    if (!products) res.sendStatus(404)
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const productById = await Product.findByPk(req.params.productId)
    if (!productById) res.sendStatus(404)
    res.json(productById)
  } catch (error) {
    next(error)
  }
})

// eslint-disable-next-line complexity
router.put('/:productId', adminsOnly, async (req, res, next) => {
  try {
    let productById = await Product.findByPk(req.params.productId)
    if (!productById) {
      res.sendStatus(404)
    } else {
      const formData = {}
      formData.id = req.body.id
      if (req.body.name) formData.name = req.body.name
      if (req.body.price) formData.price = req.body.price
      if (req.body.description) formData.description = req.body.description
      if (req.body.image) formData.image = req.body.image
      const updatedProduct = await productById.update(formData)
      res.send(updatedProduct)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', adminsOnly, async (req, res, next) => {
  try {
    let productById = await Product.findByPk(req.params.productId)
    if (!productById) {
      res.sendStatus(404)
    } else {
      await Product.destroy({
        where: {
          id: req.params.productId
        }
      })
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const formData = {}
    if (req.body.name) {
      formData.name = req.body.name
    } else {
      res.status(206).send('Name is required')
    }
    if (req.body.price) formData.price = req.body.price
    if (req.body.description) formData.description = req.body.description
    if (req.body.image) formData.image = req.body.image
    const newProduct = await Product.create(formData)
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})
