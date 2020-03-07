import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// initial state
const defaultProduct = {}

const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const fetchOneProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProductThunk = product => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(product))
    } catch (error) {
      console.error(error)
    }
  }
}

const oneProductReducer = (state = defaultProduct, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default oneProductReducer
