export default {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  isAdmin: state => {
    if (state.data.role === 'Admin') {
      return true
    } else {
      return false
    }
  },
  username: state => {
    return state.data.username
  }
}
