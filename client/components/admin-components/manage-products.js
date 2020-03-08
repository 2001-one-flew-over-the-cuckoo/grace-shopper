import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ProductForm from './manage-products-form.js'
import {fetchOneProduct, updateProductThunk} from '../../store/singleProduct'
import {removeProductThunk, addProductThunk} from '../../store/products'

class ManageProducts extends Component {
  constructor(props) {
    super(props)
    const priceInDollars = (props.product.price / 100).toFixed(2)
    //conditional - state is either nothing, or come from props.product
    //if it comes from /products - name = ''...
    //else, autopopulate it
    let defaultState
    if (this.props.history.location.pathname === '/products') {
      defaultState = {
        name: '',
        price: 0,
        description: '',
        image:
          'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
      }
    } else {
      defaultState = {
        name: props.product.name,
        price: priceInDollars,
        description: props.product.description,
        image: props.product.image
      }
    }

    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  // componentDidMount() {
  //   const productId = this.props.product.id
  //   this.props.getProduct(productId)
  // }

  handleSubmit(event) {
    event.preventDefault()
    const priceInCents = this.state.price * 100

    if (this.props.history.location.pathname === '/products') {
      const newProduct = {
        name: this.state.name,
        price: priceInCents,
        description: this.state.description,
        image: this.state.image
      }
      this.props.addProductThunk(newProduct)
    } else {
      const productId = this.props.product.id
      const updatedProduct = {
        id: productId,
        name: this.state.name,
        price: priceInCents,
        description: this.state.description,
        image: this.state.image
      }
      this.props.updateProductThunk(updatedProduct)
    }

    //Add a function to re-render list after update
    // this.props.getProduct(this.props.product.id)
    this.props.closeForm()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(product) {
    this.props.removeProductThunk(product)
    this.props.history.push('/products')
  }

  render() {
    // console.log('this.props', this.props)
    // console.log(
    //   'this.props.history.location.pathname',
    //   this.props.history.location.pathname
    // )
    return (
      <div>
        {this.props.history.location.pathname === '/products' ? (
          <div />
        ) : (
          <button
            type="button"
            onClick={() => this.handleClick(this.props.product)}
          >
            Remove Product
          </button>
        )}
        <ProductForm
          name={this.state.name}
          price={this.state.price}
          description={this.state.description}
          image={this.state.image}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => {
  return {
    // getProduct: productId => dispatch(fetchOneProduct(productId)),
    updateProductThunk: product => dispatch(updateProductThunk(product)),
    removeProductThunk: product => dispatch(removeProductThunk(product)),
    addProductThunk: product => dispatch(addProductThunk(product))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ManageProducts))
