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
        <h1>{product.name}</h1>
        <h2>{product.price}</h2>
        <h2>{product.description}</h2>
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
