import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {userCheckoutThunk} from '../store/user'
import Notifications, {notify} from 'react-notify-toast'
const Checkout = props => {
  const handleConfirmCheckout = event => {
    event.preventDefault()
    props.userCheckoutThunk()
    notify.show('Thanks for your order!', 'success')
  }
  return (
    <div>
      <Notifications />
      <button type="button" onClick={handleConfirmCheckout}>
        Confirm Checkout
      </button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  userCheckoutThunk: () => dispatch(userCheckoutThunk())
})

export default connect(null, mapDispatch)(Checkout)
