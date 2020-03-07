import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const removeProduct = product => {
  return {
    type: REMOVE_PRODUCT,
    product
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeProductThunk = product => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${product.id}`, product.id)
      dispatch(removeProduct(product.id))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.product)
    default:
      return state
  }
}

export default productsReducer
