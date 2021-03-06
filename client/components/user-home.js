import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AdminHome} from './admin-home'
// import Cart from './cart.js'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div className="user-home">
      <h3>Welcome, {email}</h3>
      <div>{isAdmin === true ? <AdminHome /> : null}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  isAdmin: PropTypes.bool
}
