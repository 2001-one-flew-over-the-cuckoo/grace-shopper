import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './manage-products-form.js'
import {fetchOneProduct, updateProductThunk} from '../../store/singleProduct'

class ManageProducts extends Component {
  constructor(props) {
    super(props)
    const priceInDollars = (props.product.price / 100).toFixed(2)
    const defaultState = {
      name: props.product.name,
      price: priceInDollars,
      description: props.product.description,
      image: props.product.image
    }
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidMount() {
  //   const productId = this.props.product.id
  //   this.props.getProduct(productId)
  // }

  handleSubmit(event) {
    event.preventDefault()
    //Add a function to re-render list after update
    // this.props.getProduct(this.props.product.id)
    const productId = this.props.product.id
    const priceInCents = this.state.price * 100
    const updatedProduct = {
      id: productId,
      name: this.state.name,
      price: priceInCents,
      description: this.state.description,
      image: this.state.image
    }
    console.log('updatedProduct', updatedProduct)
    this.props.updateProductThunk(updatedProduct)
    this.props.closeForm()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log('state', this.state)
    console.log('this.props', this.props)
    return (
      <ProductForm
        name={this.state.name}
        price={this.state.price}
        description={this.state.description}
        image={this.state.image}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    )
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => {
  return {
    // getProduct: productId => dispatch(fetchOneProduct(productId)),
    updateProductThunk: product => dispatch(updateProductThunk(product))
  }
}

export default connect(mapState, mapDispatch)(ManageProducts)