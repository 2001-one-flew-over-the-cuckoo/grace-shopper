Care Kit Schema

/////// MVP
Checked by Caitlin, Hilary

Models:

* [] User

  * [] email (STRING, unique, not empty, not null)
  * [] name (STRING)
  * [] address (TEXT)
  * [] password (needs salt)
  * [] salt (for password)
  * [] phone_num (INTEGER)
  * [] is_admin (BOOLEAN)

* [] Product

  * [] name (STRING, unique, not empty)
  * [] price (INTEGER)
  * [] description (TEXT)
  * [] image (STRING)

* [] Product_Order

  * [] orderId (INTEGER)
  * [] productId (INTEGER)
  * [] orderPrice (INTEGER)
  * [] quantity (INTEGER)

* [] Order
  * [] user_id (INTEGER)
  * [] date_ordered (DATE)
  * [] completed (BOOLEAN)
  * [] shipped (BOOLEAN)
  * [] confirmation_num (STRING)
  * [] shipping_address (TEXT)

Associations:

User.hasMany(Order)
Product.belongsToMany(Order, through: Product_Order)
Order.belongsToMany(Product, through: Product_Order)

/////// ROUND 2

* [] Category
* [] OAUTH
* [] payments (Stripe, PayPal)
* [] Product: num_in_stock

<img
  src="https://drive.google.com/file/d/1J-dOnU9l1kukAp4G6QJMglQU6uH_ZI0Z/view"
  alt="schema image"
/>
