import React from 'react'
import {Link} from 'react-router-dom'

export const AdminHome = () => {
  return (
    <div>
      <Link to="/manageUsers">MANAGE USERS</Link>s
      <br />
      <Link to="/manageProducts">MANAGE PRODUCTS</Link>
    </div>
  )
}
