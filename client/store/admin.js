import axios from 'axios'
import history from '../history'

const GET_ALL_USERS = 'GET_ALL_USERS'
// INITIAL STATE
const initialState = {
  userList: [],
  productList: [],
  selectedUser: {},
  selectedProduct: {}
}

const getAllUsers = userList => ({type: GET_ALL_USERS, userList})

export const manageUsers = () => async dispatch => {
  try {
    const userList = await axios.get('/api/users')
    dispatch(getAllUsers(userList))
  } catch (e) {
    console.error(e)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.userList
    default:
      return state
  }
}
