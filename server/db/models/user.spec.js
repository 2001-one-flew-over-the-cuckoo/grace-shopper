/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('user attributes definition', () => {
    let cody
    beforeEach(() => {
      cody = User.build({
        email: 'cody@gmail.com',
        password: '123cody'
      })
    })

    it('includes `email` and `password` fields', async () => {
      await cody.save()
      cody = await User.findOne({where: {email: 'cody@gmail.com'}})

      expect(cody.email).to.equal('cody@gmail.com')
      // expect(cody.password).to.exist; // eslint-disable-line no-unused-expressions
    })
  })
}) // end describe('User model')
