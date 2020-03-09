import axios from 'axios'

const GUEST_ADD_TO_CART = 'GUEST_ADD_TO_CART'
// const CHECKOUT = 'CHECKOUT'

const guestAddToCart = (product, userId) => {
  return {
    type: GUEST_ADD_TO_CART,
    product
  }
}
// const checkout = () => {
//   return {
//     type: CHECKOUT
//   }
// }

export const guestAddToCartThunk = productId => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/${productId}`)
    dispatch(addedToCart(data))
  } catch (error) {
    console.error(error)
  }
}

// const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    // case GUEST_ADD_TO_CART:
    //   return [...state, action.product]
    default:
      return state
  }
}
