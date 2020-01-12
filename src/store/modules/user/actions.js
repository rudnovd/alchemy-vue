import Account from '@/services/api/account'
import Authentication from '@/services/api/authentication'

export default {
  async getUserData({ state, commit }) {
    if (!state.isLoggedIn) {
      commit('DELETE_ERROR')
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
  async login({ commit }, { usernameOrEmail, password, rememberLogin }) {
    commit('DELETE_ERROR')
    commit('LOADING_START')
    await Authentication.login(usernameOrEmail, password, rememberLogin)
      .then(response => {
        commit('SET_USER', response.data.user)
      })
      .catch(error => {
        commit('SET_ERROR', error)
      })
      .finally(() => {
        commit('LOADING_END')
      })
  },
  async logout({ commit }) {
    commit('DELETE_ERROR')
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
  async resetPassword({ commit }, email) {
    commit('DELETE_ERROR')
    commit('LOADING_START')
    await Account.resetPassword(email)
      .then(() => {
        commit('RESET_PASSWORD')
      })
      .catch(error => {
        commit('SET_ERROR', error.data)
      })
      .finally(() => {
        commit('LOADING_END')
      })
  },
  async register({ commit }, email) {
    commit('DELETE_ERROR')
    commit('LOADING_START')
    await Account.register(email)
      .then(() => {
        commit('RESET_PASSWORD')
      })
      .catch(error => {
        commit('SET_ERROR', error.data)
      })
      .finally(() => {
        commit('LOADING_END')
      })
  }
}
