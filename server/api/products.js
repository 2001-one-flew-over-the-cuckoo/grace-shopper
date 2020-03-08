const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
    if (!products) res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const productById = await Product.findByPk(req.params.productId)
    res.json(productById)
    if (!productById) res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

// still need to permission this but need to refer to auther workshop solution
router.put('/:productId', async (req, res, next) => {
  try {
    console.log(req)
    let productById = await Product.findByPk(req.params.productId)
    if (!productById) {
      res.sendStatus(404)
    } else {
      const formData = {}
      if (req.body.name) formData.name = req.body.name
      if (req.body.price) formData.price = req.body.price
      if (req.body.description) formData.description = req.body.description
      if (req.body.image) formData.image = req.body.image
      const updatedProduct = await productById.update(formData)
      res.send(updatedProduct[1][0])
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    let productById = await Product.findByPk(req.params.productId)
    if (!productById) res.sendStatus(404)
    else {
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

router.post('/', async (req, res, next) => {
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
