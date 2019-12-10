export default {
  user: state => {
    return state
  },
  isAdmin: state => {
    return state.role === 'Admin' ? true : false
  }
}
