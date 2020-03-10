import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const USER_ADD_TO_CART = 'USER_ADD_TO_CART'
const USER_REMOVE_FROM_CART = 'USER_REMOVE_FROM_CART'
const USER_CHECKOUT = 'USER_CHECKOUT'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const userAddToCart = orders => ({type: USER_ADD_TO_CART, orders})
const userRemoveFromCart = orders => ({type: USER_REMOVE_FROM_CART, orders})
const userCheckout = orders => ({
  type: USER_CHECKOUT,
  orders
})
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const userAddCartThunk = productId => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/`, {
      productId: productId
    })
    dispatch(userAddToCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeProductFromCart = productId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${productId}`, productId)
    dispatch(userRemoveFromCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const userCheckoutThunk = () => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/checkout')
    dispatch(userCheckout(data))
  } catch (error) {
    console.error(error)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case USER_ADD_TO_CART:
      return {
        ...state,
        orders: action.orders
      }
    case USER_REMOVE_FROM_CART:
      return {
        ...state,
        orders: action.orders
      }
    case USER_CHECKOUT:
      return {
        ...state,
        orders: action.orders
      }
    default:
      return state
  }
}
