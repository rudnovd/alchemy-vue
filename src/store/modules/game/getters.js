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

  getGameFieldSize: state => {
    return state.settings.gameFieldSize
  }
}
