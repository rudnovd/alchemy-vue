import * as shortid from 'shortid'
import { getAccountElements, addOpenedElement } from '@/js/api/account'

export default {
  async getOpenedElements ({ state, commit }) {
    if (state.openedElements.length === 0) {
      commit('LOADING_START')
      await getAccountElements().then(response => {
        commit('LOADING_END')
        if (response.status === 200) {
          response.data.elements.forEach(element => {
            element.x = 0
            element.y = 0
            element.z = 100
            element.show = false
          })
          commit('SET_OPENED_ELEMENTS', response.data.elements)
        } else {
          commit('SET_ERROR', response)
        }
      })
    }
  },
  async addOpenedElement ({ commit, dispatch }, element) {
    commit('LOADING_START')
    await addOpenedElement(element._id).then(response => {
      commit('LOADING_END')
      if (response.status === 200) {
        element = {
          ...element,
          x: 0,
          y: 0,
          z: 100,
          show: false
        }
        commit('ADD_OPENED_ELEMENT', element)
        dispatch('updateOpenedElementsPositions')
      } else {
        commit('SET_ERROR', response)
      }
    })
  },
  setActiveElements ({ commit }, elements) {
    commit('SET_ACTIVE_ELEMENTS', elements)
  },
  addActiveElement ({ commit }, element) {
    element = {
      ...element,
      z: 100,
      gameId: shortid.generate()
    }
    commit('ADD_ACTIVE_ELEMENT', element)
  },
  deleteActiveElement ({ commit, state }, element) {
    state.activeElements.forEach((activeElement, index) => {
      if (activeElement.gameId === element.gameId) {
        commit('DELETE_ACTIVE_ELEMENT', index)
      }
    })
  },
  deleteActiveElements ({ commit }) {
    commit('DELETE_ACTIVE_ELEMENTS')
  },
  setSelectedElement ({ commit }, element) {
    commit('SET_SELECTED_ELEMENT', element)
  },
  setSelectedElementCoordinates ({ commit }, { x, y, z }) {
    commit('SET_SELECTED_ELEMENT_COORDINATES', { x, y, z })
  },
  deleteSelectedElement ({ commit }) {
    commit('DELETE_SELECTED_ELEMENT')
  },

  updateOpenedElementsPositions ({ commit, rootState }) {
    commit('UPDATE_OPENED_ELEMENTS_POSITIONS', rootState.game.gameFieldSize)
  },
  updateOpenedElementsByCategory ({ commit }, category) {
    commit('UPDATE_OPENED_ELEMENTS_BY_CATEGORY', category)
  }
}
