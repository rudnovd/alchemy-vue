export default {
  LOADING_START (state) {
    state.state.isLoading = true
  },
  LOADING_END (state) {
    state.state.isLoading = false
  },
  SET_ERROR (state, error) {
    state.state.error = error
  },

  SET_USER (state, user) {
    state.role = user.role
    state.isDisabled = user.isDisabled
    state._id = user._id
    state.email = user.email
    state.username = user.username
    state.created = user.created
    state.isLoggedIn = true
  },
  DELETE_USER (state) {
    state.role = ''
    state.isDisabled = ''
    state._id = ''
    state.email = ''
    state.username = ''
    state.created = ''
    state.isLoggedIn = false
  }
}
