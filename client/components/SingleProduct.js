import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/singleProduct'
import Select from 'react-select'
import {Link} from 'react-router-dom'

const options = [
  {value: 1, label: 1},
  {value: 2, label: 2},
  {value: 3, label: 3},
  {value: 4, label: 4},
  {value: 5, label: 5}
]

export class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchOneProduct(productId)
  }
  render() {
    const {product} = this.props
    console.log('this.props', this.props)
    return (
      <div className="product">
        <img src={product.image} />
        <div>
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
          <h3>{product.description}</h3>
          <h3>
            Quantity: <Select options={options} />
          </h3>
          <button>Add to Cart</button>
        </div>
        <div>
          {isAdmin === true ? (
            <Link to="/edit">Edit Product</Link>
          ) : (
            <h1>no</h1>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state', state)
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOneProduct: productId => dispatch(fetchOneProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
