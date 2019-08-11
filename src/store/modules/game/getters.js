export default {
  gameFieldSize: state => {
    return state.settings.gameFieldSize
  },
  elementsListFieldSize: state => {
    return state.settings.elementListFieldSize
  },
  history: state => {
    return state.history
  }
}
