import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/singleProduct'

export class SingleProduct extends Component {
  constructor() {
    super()
  }
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
          <h3>Quantity: X</h3>
          <button>Add to Cart</button>
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
