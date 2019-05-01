export default {
  openedElements: state => {
    return state.openedElements
  },
  activeElements: state => {
    return state.activeElements
  },
  selectedElement: state => {
    return state.selectedElement
  },

  openedCategories: state => {
    return state.openedCategories
  },
  selectedCategory: state => {
    return state.selectedCategory
  },

  gameFieldSize: state => {
    return state.settings.gameFieldSize
  },
  elementsListFieldSize: state => {
    return state.settings.elementListFieldSize
  },

  error: state => {
    return state.error
  }
}
