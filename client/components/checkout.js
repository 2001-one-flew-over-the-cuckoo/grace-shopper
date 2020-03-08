import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Checkout = props => {
  const confirmHandler = event => {
    event.preventDefault()
    // Thunk to change status on back end goes here
    // props.confirmCheckout()
  }
  return (
    <div>
      <button onClick={confirmHandler}>Confirm Checkout</button>
    </div>
  )
}

// const mapState = state => {}

const mapDispatch = dispatch => ({
  confirmCheckout: () => dispatch(confirmCheckout())
})

export default connect(null, mapDispatch)(Checkout)
