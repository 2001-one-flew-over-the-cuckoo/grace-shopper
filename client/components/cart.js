import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me, removeProductFromCart} from '../store/user'
import {useHistory} from 'react-router-dom'

const Cart = props => {
  // console.log(props)
  let history = useHistory()
  const handleDeleteClick = event => {
    event.preventDefault()
    props.removeProductFromCart(event.target.id)
  }
  const checkoutHandler = event => {
    event.preventDefault()
    history.push('/checkout')
  }
  const ordersArr = props.user.orders
  console.log('ordersArr', ordersArr)
  if (ordersArr.length > 0 && ordersArr[0].products.length > 0) {
    let cart = props.user.orders[0].products
    return (
      <div>
        {props.user.email}
        {cart.map(prodInCart => {
          return (
            <div key={prodInCart.id} id="prodInCart">
              <img src={prodInCart.image} />
              <div>{prodInCart.name}</div>
              <div>Quantity (drop-down to be added)</div>
              <div>{(prodInCart.price / 100).toFixed(2)}</div>
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
                return acc + currVal.price
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

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    fetchMe: () => dispatch(me()),
    removeProductFromCart: productId =>
      dispatch(removeProductFromCart(productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propType = {
  user: PropTypes.object
}
