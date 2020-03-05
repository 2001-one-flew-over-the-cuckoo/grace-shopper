import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const Cart = props => {
  // Not surrently being imported to User-Home yet.
  // Should we include cart when we use User.findOne() in Sequelize??
  // const {products} = props
  // console.log('props', props)
  return (
    <div>
      <table>
        <tr>
          <th colSpan="2">Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>

        {/* {products.map(p => {
          return (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>
                <img src={p.image} />
              </td>
              <td>{p.price}</td>
              <td>{p.cart.quantity}</td>
            </tr>
          )
        })} */}
      </table>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.user.products
  }
}
export default connect(mapState)(Cart)

Cart.propType = {
  products: PropTypes.array
}
