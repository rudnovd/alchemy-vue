import { getLogin, getLogout } from '@/js/api/authentication'

export default {
  async getLogin ({ state, commit }) {
    if (!state.isLoggedIn) {
      commit('LOADING_START')
      await getLogin().then(response => {
        commit('LOADING_END')
        if (response.data.user) {
          commit('SET_USER', response.data.user)
        }
      })
    }
  },
  async getLogout ({ commit }) {
    commit('LOADING_START')
    await getLogout().then(response => {
      commit('LOADING_END')
      if (response.status === 200 || response.status === 304) {
        commit('DELETE_USER')
      }
    })
  },
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  }
}
