import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const CHECKOUT = 'CHECKOUT'

const addedToCart = (product, userId) => {
  return {
    type: ADD_TO_CART,
    product,
    userId
  }
}
const checkout = () => {
  return {
    type: CHECKOUT
  }
}

export const addToCartThunk = productId => async dispatch => {
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
      return [...state, action.product]
    default:
      return state
  }
}
