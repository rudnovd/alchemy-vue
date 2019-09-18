export default {
  LOADING_START (state) {
    state.state.isLoading = true
  },
  LOADING_END (state) {
    state.state.isLoading = false
  },

  SET_USER (state, user) {
    state.role = user.role
    state.isDisabled = user.isDisabled
    state.id = user.id
    state.email = user.email
    state.username = user.username
    state.created = user.created
    state.isLoggedIn = true
  },
  DELETE_USER (state) {
    state.role = null
    state.isDisabled = null
    state.id = null
    state.email = null
    state.username = null
    state.created = null
    state.isLoggedIn = false
  }
}
