import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Checkout = props => {
  return (
    <div>
      <button>Confirm Checkout</button>
    </div>
  )
}

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect(mapState, mapDispatch)(Checkout)
