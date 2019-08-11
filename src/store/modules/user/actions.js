export default {
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },
  deleteUser ({ commit }) {
    commit('DELETE_USER')
  }
}
