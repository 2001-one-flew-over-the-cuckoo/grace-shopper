import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import ManageProducts from './admin-components/manage-products'
import {withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      showAddForm: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  handleClick() {
    this.setState({
      showAddForm: !this.state.showAddForm
    })
  }

  render() {
    const {products, user} = this.props
    const emptyProduct = {
      name: '',
      price: 0,
      description: '',
      image: ''
    }
    const isAdmin = user.isAdmin
    if (this.state.showAddForm) {
      return (
        <ManageProducts product={emptyProduct} closeForm={this.handleClick} />
      )
    }

    return (
      <div className="products">
        <div>
          {isAdmin === true && this.props.location.pathname === '/products' ? (
            <div className="add-product-link" onClick={this.handleClick}>
              {' '}
              Add New Product
            </div>
          ) : (
            <h1 />
          )}
        </div>
        <div className="all-prod-container">
          <div className="all-products">
            {products.map(product => {
              return (
                <div key={product.id} className="one-product">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image} />
                    <h4>{product.name}</h4>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
