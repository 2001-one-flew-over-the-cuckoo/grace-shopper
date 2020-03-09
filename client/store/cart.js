import axios from 'axios'

const GUEST_ADD_TO_CART = 'GUEST_ADD_TO_CART'
// const CHECKOUT = 'CHECKOUT'

const guestAddToCart = allProductsInCart => {
  return {
    type: GUEST_ADD_TO_CART,
    allProductsInCart
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
    // will need to change route to /cart
    dispatch(guestAddToCart(data))
    console.log('recieving req.session.cart from api', data)
  } catch (error) {
    console.error(error)
  }
}

const initialState = {products: []}

export default function(state = initialState, action) {
  switch (action.type) {
    case GUEST_ADD_TO_CART:
      return {...state, products: [action.products]}
    // refreshes the cart based on session.cart
    default:
      return state
  }
}
