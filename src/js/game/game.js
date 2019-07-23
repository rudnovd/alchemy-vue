import * as shortid from 'shortid'

export function onDropCombine (selectedElement, combineWithElement) {
  if (selectedElement && selectedElement.gameId !== combineWithElement.gameId) {
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

export function findClosest (selectedElement, activeElements) {
  if (activeElements.length < 2) {
    return null
  }

  let closestElement = null
  let x = 1000
  let y = 1000

  for (let i = 0; i < activeElements.length; i++) {
    let newX = Math.abs(selectedElement.x - activeElements[i].x)
    let newY = Math.abs(selectedElement.y - activeElements[i].y)

    if (newX < x && newY < y && selectedElement.gameId !== activeElements[i].gameId) {
      x = newX
      y = newY
      closestElement = activeElements[i]
    }
  }

  if ((selectedElement.x + 50 >= closestElement.x && selectedElement.x - 50 <= closestElement.x) && (selectedElement.y + 25 >= closestElement.y && selectedElement.y - 25 <= closestElement.y)) {
    return closestElement
  } else {
    return null
  }
}
