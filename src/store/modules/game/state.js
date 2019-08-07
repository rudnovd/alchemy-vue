export default {
  openedElements: [],
  activeElements: [],
  selectedElement: null,

  openedCategories: [],
  selectedCategory: null,

  openedRecipes: [],
  recipes: [],

  history: {
    last: {
      firstElement: null,
      secondElement: null,
      result: null
    },
    past: []
  },

  settings: {
    gameFieldSize: {
      x: 0,
      y: 0
    },
    elementListFieldSize: {
      x: 0,
      y: 0
    }
  }
}
