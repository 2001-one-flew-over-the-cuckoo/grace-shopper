const Sequelize = require('sequelize')
const db = require('../db')

const Product_Order = db.define('product_order', {
  // the through table automatically generates the foreign keys for product and order, so we do not need to define here
  orderPrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = Product_Order
