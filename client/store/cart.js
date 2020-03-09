import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const addedToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}
export const addToCart = productId => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/${productId}`)
    dispatch(addedToCart(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.cart
    default:
      return state
  }
}
