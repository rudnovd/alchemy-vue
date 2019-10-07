import { getLogin, getLogout } from '@/js/api/authentication'

export default {
  async getLogin ({ state, commit }) {
    if (!state.isLoggedIn) {
      commit('LOADING_START')
      await getLogin()
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
  async getLogout ({ commit }) {
    commit('LOADING_START')
    await getLogout()
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
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  }
}
