const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // the through table automatically generates the foreign keys for product and user, so we do not need to define here
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  confirmationNumber: {
    type: Sequelize.STRING
  },
  shipping_address: {
    type: Sequelize.TEXT
  },
  dateOrdered: {
    type: Sequelize.DATE
  }
})

module.exports = Order
