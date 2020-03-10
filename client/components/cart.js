import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me, removeProductFromCart, userUpdateQtyThunk} from '../store/user'
import Select from 'react-select'
import {useHistory} from 'react-router-dom'

const Cart = props => {
  const history = useHistory()
  const handleChange = event => {
    props.userUpdateQtyThunk(event.prodId, event.value)
  }

  const handleDeleteClick = event => {
    event.preventDefault()
    props.removeProductFromCart(event.target.id)
  }

  const checkoutHandler = event => {
    event.preventDefault()

    history.push('/checkout')
  }

  if (props.user.orders === undefined || props.user.orders.length === 0) {
    return <div>You have no items in your cart.</div>
  } else {
    let getCart = props.user.orders.find(order => order.completed === false)
    if (getCart.products.length > 0) {
      cart = getCart.products
      return (
        <div>
          {props.user.email}
          {cart.map(prodInCart => {
            return (
              <div key={prodInCart.id} id="prodInCart">
                <img src={prodInCart.image} />
                <div>{prodInCart.name}</div>
                <div>Quantity {prodInCart.product_order.quantity}</div>
                <h3>
                  Quantity:{' '}
                  <Select
                    key={prodInCart.id}
                    options={[
                      {value: 1, label: 1, prodId: prodInCart.id},
                      {value: 2, label: 2, prodId: prodInCart.id},
                      {value: 3, label: 3, prodId: prodInCart.id},
                      {value: 4, label: 4, prodId: prodInCart.id},
                      {value: 5, label: 5, prodId: prodInCart.id}
                    ]}
                    defaultValue={{label: '1', value: 1}}
                    isSearchable={false}
                    onChange={handleChange}
                  />
                </h3>
                <div>Price ${(prodInCart.price / 100).toFixed(2)}</div>
                <button onClick={handleDeleteClick} id={prodInCart.id}>
                  [x]
                </button>
              </div>
            )
          })}
          <div id="subtotal">
            <div>Subtotal</div>
            <div>
              {(
                cart.reduce((acc, currVal) => {
                  return acc + currVal.price * currVal.product_order.quantity
                }, 0) / 100
              ).toFixed(2)}
            </div>
          </div>
          <button onClick={checkoutHandler}>Checkout</button>
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
    fetchMe: () => dispatch(me()),
    removeProductFromCart: productId =>
      dispatch(removeProductFromCart(productId)),
    userUpdateQtyThunk: (productId, quantity) =>
      dispatch(userUpdateQtyThunk(productId, quantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propType = {
  user: PropTypes.object
}
