export function findClosestElement(element, elements) {
  if (elements.length < 2) {
    // need two elements for mixing
    return {}
  }

  let closestElement = {}

  // Coordinates difference for find closest element
  let x = 50
  let y = 25

  // find closest element in elements
  elements.forEach(singleElement => {
    let xDifference = Math.abs(element.x - singleElement.x)
    let yDifference = Math.abs(element.y - singleElement.y)

    if (xDifference <= x && yDifference <= y) {
      if (element.gameId !== singleElement.gameId) {
        x = xDifference
        y = yDifference
        closestElement = singleElement
      }
    }
  })

  return closestElement
}

export function findRecipeOfTwoElements(firstElement, secondElement, recipes) {
  const result = recipes.filter(recipe => {
    return (
      (firstElement._id === recipe.recipe[0]._id && secondElement._id === recipe.recipe[1]._id) ||
      (secondElement._id === recipe.recipe[0]._id && firstElement._id === recipe.recipe[1]._id)
    )
  })

  if (result.length > 0) {
    return result[0]
  } else {
    return null
  }
}
