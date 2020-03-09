import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {userCheckoutThunk} from '../store/user'

const Checkout = props => {
  const handleConfirmCheckout = event => {
    event.preventDefault()
    props.userCheckoutThunk()
    // history.push to thank you page
  }
  return (
    <div>
      <button onClick={handleConfirmCheckout}>Confirm Checkout</button>
    </div>
  )
}

const mapState = state => ({})

const mapDispatch = dispatch => ({
  userCheckoutThunk: () => dispatch(userCheckoutThunk())
})

export default connect(null, mapDispatch)(Checkout)
