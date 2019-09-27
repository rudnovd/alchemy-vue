import { getCategories } from '@/js/api/categories'

export default {
  async getOpenedCategories ({ commit }, openedElements) {
    commit('LOADING_START')
    await getCategories().then(response => {
      commit('LOADING_END')
      if (response.status === 200) {
        let openedCategories = []
        openedElements.forEach(openedElement => {
          let filteredByCategory = openedCategories.filter(openedCategory => {
            return openedElement.category === openedCategory._id
          })

          if (filteredByCategory.length === 0) {
            let filteredByCategoryName = response.data.response.filter(category => {
              return category._id === openedElement.category
            })

            openedCategories.push({
              _id: openedElement.category,
              name: filteredByCategoryName[0].name
            })
          }
        })
        commit('SET_OPENED_CATEGORIES', openedCategories)
      } else {
        commit('SET_ERROR', response)
      }
    })
  },
  deleteOpenedCategories ({ commit }) {
    commit('DELETE_OPENED_CATEGORIES')
  },
  addOpenedCategory ({ commit }, category) {
    commit('ADD_OPENED_CATEGORY', category)
  },
  deleteOpenedCategory ({ state, commit }, category) {
    for (let i = 0; i < state.openedCategories.length; i++) {
      if (state.openedCategories[i]._id === category._id) {
        commit('DELETE_OPENED_CATEGORY', i)
        break
      }
    }
  },
  setSelectedCategory ({ commit }, category) {
    commit('SET_SELECTED_CATEGORY', category)
  },
  deleteSelectedCategory ({ commit }) {
    commit('DELETE_SELECTED_CATEGORY')
  },
  updateOpenedElementsPositions ({ commit }) {
    commit('UPDATE_OPENED_ELEMENTS_POSITIONS')
  }
}
