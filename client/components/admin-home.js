import React from 'react'
import {Link} from 'react-router-dom'

export const AdminHome = () => {
  return (
    <div className="admin-home">
      <Link to="/products">
        <button id="white-btn">Manage Products</button>
      </Link>
    </div>
  )
}
