import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        orders: [
          {
            products: []
          }
        ]
      }
    }
  }

  componentDidMount() {
    this.props.fetchMe()
  }
  render() {
    // Not surrently being imported to User-Home yet.
    // Should we include cart when we use User.findOne() in Sequelize??
    // const {products} = props
    console.log('props', this.props)
    let cart = []

    if (this.props.user.orders.length > 0) {
      cart = this.props.user.orders[0].products
      return (
        <div>
          {this.props.user.email}
          {cart[0].products.map(prodInCart => {
            return (
              <div key={prodInCart.id} id="prodInCart">
                <img src={prodInCart.image} />
                <div>{prodInCart.name}</div>
                <div>Quantity (drop-down to be added)</div>
                <div>{(prodInCart.price / 100).toFixed(2)}</div>
                <div>[x]</div>
              </div>
            )
          })}
          <div id="subtotal">
            <div>Subtotal</div>
            <div>
              {(
                cart[0].products.reduce((acc, currVal) => {
                  return acc + currVal.price
                }, 0) / 100
              ).toFixed(2)}
            </div>
          </div>
          <button>Checkout</button>
        </div>
      )
    } else {
      return <div>You have no items in your cart.</div>
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    fetchMe: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propType = {
  user: PropTypes.object
}
