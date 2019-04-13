// import axios from 'axios'

export default {
  // checkLogin ({ commit }) {
  //   try {
  //     axios.post('/api/login')
  //       .then(response => {
  //         if (response.status === 200) {
  //           if (response.data.user._id) {
  //             commit('SET_USER', response.data.user)
  //           }
  //         } else {
  //           commit('CLEAR_USER')
  //         }
  //       })
  //       .catch(error => {
  //         this.loginError = error
  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  }
}
