Care Kit Schema

/////// MVP
Checked by Caitlin, Hilary

Models:
- [] User
  - [] email (STRING, unique, not empty, not null)
  - [] name (STRING)
  - [] address (TEXT)
  - [] password (needs salt)
  - [] salt (for password)
  - [] phone_num (INTEGER)
  - [] is_admin (BOOLEAN)

- [] Product
  - [] name (STRING, unique, not empty)
  - [] price (DECIMAL)
  - [] description (TEXT)
  - [] image (STRING)

- [] Cart (through table)
  - [] user_id (INTEGER)
  - [] product_id (INTEGER)
  - [] quantity (INTEGER)

Associations: (needs work - but confident of belongsToMany associations)
User.belongsToMany(Product, through: 'Cart')
Product.belongsToMany(User, through: 'Cart')
User.belongsToMany(Product, through: 'Order')
Product.belongsToMany(User, through: 'Order')
Product.belongsToMany(Order, through: 'Order_Product')
Order.belongsToMany(Product, through: 'Order_Product')


/////// ROUND 2
- [] Category
- [] OAUTH
- [] payments (Stripe, PayPal)
- [] Product: num_in_stock, Cart: quantity = max(Product.num_in_stock)

/////// ROUND 3
- [] Order History

Models:
- [] Order
  - [] date_ordered (DATE)
  - [] shipped (BOOLEAN)
  - [] confirmation_num (INTEGER)
  - [] user_id (INTEGER)
  - [] shipping_address (TEXT)
  - [] invoice (https://www.npmjs.com/package/react-simple-invoice)

- [] Order_Product
  - [] order_id (INTEGER)
  - [] product_id (INTEGER)
  - [] price (DECIMAL)
  - [] quantity (INTEGER)
  - [] user_id (INTEGER)

<img
  src="https://drive.google.com/file/d/1J-dOnU9l1kukAp4G6QJMglQU6uH_ZI0Z/view"
  alt="schema image"
/>

