import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const {products} = this.props
    return (
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
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
