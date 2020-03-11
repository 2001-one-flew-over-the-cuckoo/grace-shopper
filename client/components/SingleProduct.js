import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, updateProductThunk} from '../store/singleProduct'
import {userAddCartThunk} from '../store'
import Select from 'react-select'
import {Link} from 'react-router-dom'
import ManageProducts from './admin-components/manage-products'

// const options = [
//   {value: 1, label: 1},
//   {value: 2, label: 2},
//   {value: 3, label: 3},
//   {value: 4, label: 4},
//   {value: 5, label: 5}
// ]

export class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      showEditForm: false
    }
    this.handleClickToEdit = this.handleClickToEdit.bind(this)
    this.addToCartClick = this.addToCartClick.bind(this)
  }
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchOneProduct(productId)
  }
  handleClickToEdit() {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  }

  addToCartClick(event) {
    event.preventDefault()
    this.props.userAddCartThunk(this.props.product.id)
  }
  render() {
    const {product, user} = this.props
    const isAdmin = user.isAdmin
    if (this.state.showEditForm) {
      return (
        <ManageProducts product={product} closeForm={this.handleClickToEdit} />
      )
    } else
      return (
        <div className="product-container">
          <div className="product">
            <img src={product.image} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <h3>${(product.price / 100).toFixed(2)}</h3>
              <h3>{product.description}</h3>
              {/* <h3>
              Quantity: <Select options={options} />
            </h3> */}
              <button
                id="add-to-cart-btn"
                type="button"
                onClick={this.addToCartClick}
              >
                Add to Cart
              </button>
              <div>
                {isAdmin === true ? (
                  <button
                    className="manage-prod-link"
                    onClick={this.handleClickToEdit}
                  >
                    Manage Product
                  </button>
                ) : (
                  <h1 />
                )}
              </div>
            </div>
            <div />
          </div>
        </div>
      )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOneProduct: productId => dispatch(fetchOneProduct(productId)),
    updateProductThunk: product => dispatch(updateProductThunk(product)),
    userAddCartThunk: productId => dispatch(userAddCartThunk(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
