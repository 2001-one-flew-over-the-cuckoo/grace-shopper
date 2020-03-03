import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AdminHome = () => {
  return (
    <div>
      <h1>Yer an Admin Harry!</h1>
      <Link to="/manageUsers">MANAGE USERS</Link>
      <br />
      <Link to="/manageProducts">MANAGE PRODUCTS</Link>
    </div>
  )
}
