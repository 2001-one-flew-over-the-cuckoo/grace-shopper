import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(getOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default ordersReducer
