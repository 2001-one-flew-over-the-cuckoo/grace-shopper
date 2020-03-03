Care Kit Schema

/////// MVP
Checked by Caitlin

Models:
- [] User
  - [] name (STRING)
  - [] address (TEXT)
  - [] email (STRING, unique, not empty, not null)
  - [] password (needs salt)
  - [] phone_num (INTEGER)
  - [] is_admin (BOOLEAN)

- [] Product
  - [] name (STRING, unique, not empty)
  - [] price (DECIMAL)
  - [] description (TEXT)
  - [] image (STRING)
  - [] num_in_stock (INTEGER, min = 0, max = 100)

- [] Cart (through table)
  - [] user_id (INTEGER)
  - [] product_id (INTEGER)
  - [] quantity (INTEGER), max = Product.num_in_stock)

Associations: (needs work)
User.belongsToMany(Product, through: 'cart')
Product.belongsToMany(User, through: 'Product')
User.belongsToMany(Product, through: 'Order')
Product.belongsToMany(User, through: 'Order')
Product.belongsToMany(Order, through: 'Order_Product')
Order.belongsToMany(Product, through: 'Order_Product')


/////// ROUND 2
- [] Category
- [] OAUTH
- [] payments (Stripe, PayPal)

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

