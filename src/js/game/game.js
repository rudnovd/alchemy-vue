import * as shortid from 'shortid'

export function onDropCombine (selectedElement, combineWithElement) {
  if (selectedElement && selectedElement.gameId !== combineWithElement.gameId) {
    if ((selectedElement.x + 50 >= combineWithElement.x &&
            selectedElement.x - 50 <= combineWithElement.x) &&
            (selectedElement.y + 25 >= combineWithElement.y &&
            selectedElement.y - 25 <= combineWithElement.y)) {
      console.log('onDropCombine success')

      const newElement = {
        name: parseInt(Math.random() * 100),
        category: 'Elements',
        gameId: shortid.generate()
      }
      return newElement
    } else {
      return null
    }
  }
}
