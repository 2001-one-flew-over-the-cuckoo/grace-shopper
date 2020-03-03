import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'

// initial state
const defaultProduct = {}

const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

export const fetchOneProduct = productId => {
  return async dispatch => {
    try {
      console.log('hello')
      const res = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const oneProductReducer = (state = defaultProduct, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default oneProductReducer
