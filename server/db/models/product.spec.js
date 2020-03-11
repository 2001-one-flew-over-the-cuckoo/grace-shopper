/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('validations', () => {
      let fakeFake
      beforeEach(async () => {
        fakeFake = await Product.create({
          name: 'Graduation Box',
          price: 10,
          description: 'description of birthday box'
        })
      })

      it('checks validations of the model and throws an error if requirements are not met', () => {
        fakeFake.name = 'Happy Birthday Box'

        expect(Product.update(fakeFake, {where: {id: 1}})[1]).to.throw()
        expect(Product.update(fakeFake, {where: {id: 1}})[1]).to.be.an('error')
      })
    }) // end describe('validations')
  }) // end describe('instanceMethods')
}) // end describe('Product model')
