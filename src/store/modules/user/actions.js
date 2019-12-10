import Authentication from '@/services/api/authentication'

export default {
  async login({ state, commit }) {
    if (!state.isLoggedIn) {
      commit('LOADING_START')
      await Authentication.getUserData()
        .then(response => {
          if (response.data.user) {
            commit('SET_USER', response.data.user)
          }
        })
        .catch(error => {
          commit('SET_ERROR', error.data)
        })
        .finally(() => {
          commit('LOADING_END')
        })
    }
  },
  async logout({ commit }) {
    commit('LOADING_START')
    await Authentication.logout()
      .then(() => {
        commit('DELETE_USER')
      })
      .catch(error => {
        commit('SET_ERROR', error.data)
      })
      .finally(() => {
        commit('LOADING_END')
      })
  },
  setUser({ commit }, user) {
    commit('SET_USER', user)
  }
}
