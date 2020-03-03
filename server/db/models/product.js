const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(5, 2),
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  }
})
