/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe.only('User model', () => {
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
    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@gmail.com',
        password: '123cody'
      })
    })

    it('includes `email` and `password` fields', async () => {
      cody = await User.findOne({where: {email: 'cody@gmail.com'}})
      expect(cody.email).to.equal('cody@gmail.com')
      // expect(cody.password).to.exist; // eslint-disable-line no-unused-expressions
    })

    it('sets isAdmin to false by default', async () => {
      cody = await User.findOne({where: {email: 'cody@gmail.com'}})
      expect(cody.isAdmin).to.equal(false)
    })

    it('obscures the salt when serializing it to JSON', async () => {
      const codyInstance = await User.findOne({
        where: {email: 'cody@gmail.com'}
      })
      expect(codyInstance.salt).to.be.a('function')
    })

    it('`email` must not be an empty string', async () => {
      const harry = await User.build({
        email: 'harry@gmail.com',
        password: 'harry'
      })
      harry.email = ''
      let result, error
      try {
        result = await harry.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when email is empty')
      expect(error).to.be.an.instanceOf(Error)
    })

    it('`email` must not be null', async () => {
      const harry = await User.build({
        email: 'harry@gmail.com',
        password: 'harry'
      })
      harry.email = null
      let result, error
      try {
        result = await harry.validate()
      } catch (err) {
        error = err
      }
      if (result) throw Error('validation should fail when email is null')
      expect(error).to.be.an.instanceOf(Error)
    })
  })

  describe('class methods', () => {
    describe('generateSalt', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('generates a salt', async () => {
        const newSalt = await User.generateSalt()
        expect(newSalt).to.have.lengthOf.at.least(1)
      })
    })
    describe('encryptPassword', () => {
      it('is a function', async () => {
        expect(User.encryptPassword).to.be.a('function')
      })

      it('is must take two strings as arguments', async () => {
        let result, error
        try {
          result = await User.encryptPassword()
        } catch (err) {
          error = err
        }
        if (result) throw Error('must take two arguments')
        expect(error).to.be.an.instanceOf(Error)
        expect(
          User.encryptPassword('string1', 'string2')
        ).to.have.lengthOf.at.least(1)
      })
    })

    describe('hooks', () => {
      describe('setSaltAndPassword', async () => {
        let cody

        cody = await User.build({
          email: 'cody@gmail.com',
          password: 'bones'
        })

        it('before creation, user should not have a salt', async () => {
          expect(cody.dataValues).to.not.have.any.keys('salt')
        })

        it('after creation, user should have a salt', async () => {
          const codyInstance = await cody.save()
          expect(codyInstance.dataValues).to.include.all.keys('salt')
        })
      })
    })
  })
}) // end describe('User model')
