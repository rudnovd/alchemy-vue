import * as shortid from 'shortid'
import Account from '@/services/api/account'
import Elements from '@/services/api/elements'

export default {
  async getOpenedElements({ commit }) {
    commit('DELETE_ERROR')
    commit('LOADING_START')
    await Elements.get()
      .then(response => {
        response.data.elements.forEach(element => {
          element.x = 0
          element.y = 0
          element.z = 100
          element.show = false
        })
        commit('SET_OPENED_ELEMENTS', response.data.elements)
      })
      .catch(error => {
        commit('SET_ERROR', error.data)
      })
      .finally(() => {
        commit('LOADING_END')
      })
  },
  async addOpenedElement({ commit, rootState, dispatch }, element) {
    commit('DELETE_ERROR')
    commit('LOADING_START')
    await Account.addOpenedElement(element._id)
      .then(() => {
        const newElement = {
          ...element,
          category: element.category[0]._id,
          x: 0,
          y: 0,
          z: 100,
          show: false
        }
        commit('ADD_OPENED_ELEMENT', newElement)

        const filteredByOpenedCategory = rootState.categories.openedCategories.filter(openedCategory => {
          return openedCategory._id === newElement.category
        })
        if (filteredByOpenedCategory.length === 0) {
          dispatch(
            'categories/addOpenedCategory',
            { _id: element.category[0]._id, name: element.category[0].name },
            { root: true }
          )
        }
        dispatch('updateOpenedElementsByCategory', rootState.categories.selectedCategory)
        dispatch('updateOpenedElementsPositions')
      })
      .catch(error => {
        commit('SET_ERROR', error)
      })
      .finally(() => {
        commit('LOADING_END')
      })
  },
  async getInitialElements({ commit }) {
    commit('DELETE_ERROR')
    commit('LOADING_START')
    await Elements.getInitialElements()
      .then(response => {
        response.data.elements.forEach(element => {
          element.x = 0
          element.y = 0
          element.z = 100
          element.show = false
        })
        commit('SET_OPENED_ELEMENTS', response.data.elements)
      })
      .catch(error => {
        commit('SET_ERROR', error.data)
      })
      .finally(() => {
        commit('LOADING_END')
      })
  },
  setActiveElements({ commit }, elements) {
    commit('SET_ACTIVE_ELEMENTS', elements)
  },
  addActiveElement({ commit }, element) {
    commit('ADD_ACTIVE_ELEMENT', {
      _id: element._id,
      name: element.name,
      x: element.x,
      y: element.y,
      z: 100,
      gameId: shortid.generate()
    })
  },
  deleteActiveElement({ commit }, element) {
    commit('DELETE_ACTIVE_ELEMENT', element)
  },
  deleteActiveElements({ commit }) {
    commit('DELETE_ACTIVE_ELEMENTS')
  },
  setSelectedElement({ commit }, element) {
    commit('SET_SELECTED_ELEMENT', element)
  },
  setSelectedElementCoordinates({ commit }, { x, y, z }) {
    commit('SET_SELECTED_ELEMENT_COORDINATES', { x, y, z })
  },
  deleteSelectedElement({ commit }) {
    commit('DELETE_SELECTED_ELEMENT')
  },

  updateOpenedElementsPositions({ commit, rootState }) {
    commit('UPDATE_OPENED_ELEMENTS_POSITIONS', rootState.game.gameFieldSize)
  },
  updateOpenedElementsByCategory({ commit }, category) {
    commit('UPDATE_OPENED_ELEMENTS_BY_CATEGORY', category)
  },
  updateActiveElementsPositions({ commit, rootState }) {
    commit('UPDATE_ACTIVE_ELEMENTS_POSITIONS', rootState.game.gameFieldSize)
  }
}
