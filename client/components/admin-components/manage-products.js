import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './manage-products-form.js'
import {fetchOneProduct} from '../../store'

class ManageProducts extends Component {
  constructor() {
    super()
    const defaultState = {
      name: '',
      price: 0,
      description: '',
      image: ''
    }
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.product.name,
      price: this.props.product.price,
      description: this.props.products.description,
      image: this.props.product.image
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    // Reset form to blank
    this.setState(this.defaultState)
    //Add a function to re-render list after update
    this.props.getProduct(this.props.product.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
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
  products: state.products
})

const mapDispatch = dispatch => ({
  getProduct: product => {
    dispatch(fetchOneProduct(product.id))
  }
})

export default connect(mapState, mapDispatch)(ManageProducts)
