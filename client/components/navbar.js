import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Cart} from './cart'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <h1>
      <Link to="/">Care Kit</Link>
    </h1>
    <nav>
      <Link to="/products">Products</Link>
      {isLoggedIn ? (
        <span>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Account</Link>
          <Link to="#" onClick={handleClick}>
            Logout
          </Link>
        </span>
      ) : (
        <span>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </span>
      )}
      <Link to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} />
      </Link>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
