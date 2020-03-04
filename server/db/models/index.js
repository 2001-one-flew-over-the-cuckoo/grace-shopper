const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Product_Order = require('./product_order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Product.belongsToMany(Order, {through: 'product_orders'})
Order.belongsToMany(Product, {through: 'product_orders'})
User.hasMany(Order)
Order.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Product_Order,
  Order
}
