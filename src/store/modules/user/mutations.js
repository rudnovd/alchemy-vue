export default {
  SET_USER (state, user) {
    state.isLoggedIn = true
    state.data = user
  },

  CLEAR_USER (state, user) {
    state.isLoggedIn = false
  }
}
