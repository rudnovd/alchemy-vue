<template>
  <vue-draggable-resizable
    class-name='element'
    class-name-active='selected-element'
    :draggable='true'
    :disable-user-select='true'
    :resizable='false'
    :minHeight='40'
    :maxHeight='40'
    :w='280'
    :h='40'
    :x='elementData.x'
    :y='elementData.y'
    :z='elementData.z'
    :onDragStart='onDragStart'
    @activated='onActivated'
    @dragstop='onDragstop'
  >
    {{ elementData.name }}
  </vue-draggable-resizable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as game from '@/js/game/game'

export default {
  props: {
    elementData: Object
  },
  computed: {
    ...mapGetters({
      gameFieldSize: 'game/gameFieldSize',
      elementsListFieldSize: 'game/elementsListFieldSize',
      openedElements: 'elements/openedElements',
      activeElements: 'elements/activeElements',
      selectedElement: 'elements/selectedElement',
      recipes: 'recipes/recipes',
      openedRecipes: 'recipes/openedRecipes',
      openedElementsFieldSize: 'game/openedElementsFieldSize',
      state: 'elements/state'
    }),
    openedElementWidth () {
      if (this.openedElementsFieldSize.width < 500) {
        return this.openedElementsFieldSize.width * 0.3
      } else {
        return this.openedElementsFieldSize.width * 0.2
      }
    }
  },
  methods: {
    ...mapActions({
      addActiveElement: 'elements/addActiveElement',
      deleteActiveElement: 'elements/deleteActiveElement',
      setSelectedElement: 'elements/setSelectedElement',
      setSelectedElementCoordinates: 'elements/setSelectedElementCoordinates',
      deleteSelectedElement: 'elements/deleteSelectedElement',
      updateOpenedElementsPositions: 'elements/updateOpenedElementsPositions',
      setOpenedElements: 'elements/setOpenedElements',
      addHistory: 'game/addHistory',
      addOpenedRecipe: 'recipes/addOpenedRecipe',
      addOpenedElement: 'elements/addOpenedElement'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated () {
      this.setSelectedElement(this.elementData)
    },

    // Called whenever the user clicks anywhere outside the component, in order to deactivate it
    onDeactivated () {
      this.deleteSelectedElement()
    },

    // Called when dragging starts (element is clicked or touched)
    onDragStart () {
      this.setSelectedElement(this.elementData)
      this.setSelectedElementCoordinates({
        x: this.elementData.x,
        y: this.elementData.y,
        z: 101
      })
    },

    // Called whenever the component stops getting dragged
    onDragstop (x, y) {
      this.setSelectedElementCoordinates({ x, y })

      let addElement = false

      if (x < this.gameFieldSize.x) { // if element dropped on game board
        this.setSelectedElementCoordinates({
          x: this.gameFieldSize.x - Math.abs(this.selectedElement.x),
          y: Math.abs(this.selectedElement.y)
        })
        if (this.activeElements.length === 0) { // If game board without active elements then add active element
          addElement = true
        } else if (this.activeElements.length > 0) { // If game board has active elements then check elements on drop
          let closestElement = game.findClosestElement(this.selectedElement, this.activeElements)
          if (closestElement.gameId) {
            let resultRecipe = game.findRecipeOfTwoElements(this.selectedElement, closestElement, this.recipes)
            if (Object.keys(resultRecipe).length !== 0) {
              let filteredByOpenedRecipes = this.openedRecipes.filter(recipe => {
                return resultRecipe.result._id === recipe._id
              })

              if (filteredByOpenedRecipes.length === 0) { // if recipe not opened for user then open recipe
                this.addOpenedElement(resultRecipe.result).then(response => {
                  if (!this.state.error) {
                    this.addOpenedRecipe(resultRecipe)
                  }
                })
              }
              const resultElement = {
                ...resultRecipe.result,
                x: this.elementData.x,
                y: this.selectedElement.y
              }
              this.addActiveElement(resultElement)

              this.addHistory({
                firstElement: this.selectedElement.name,
                secondElement: closestElement.name,
                result: resultRecipe.result.name
              })
              this.deleteActiveElement(this.selectedElement)
              this.deleteActiveElement(closestElement)
            } else {
              addElement = true
            }
          } else {
            addElement = true
          }
        }
      } else if (x === 0) { // If click on element
        this.setSelectedElementCoordinates({ x: 400, y: 400 })
        addElement = true
      }

      if (addElement) {
        this.addActiveElement(this.elementData)
      }

      this.deleteSelectedElement()

      this.$nextTick(() => {
        this.updateOpenedElementsPositions()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.element {
  text-align: center;
  line-height: 40px;
  background-color: rgb(245, 245, 245);
  user-select: none;
  height: 40px;
  width: 100%;

  &:hover {
    cursor: grab;
  }

  &:active {
    cursor: grabbing;
  }
}

@media screen and (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 767px) {
  .element {
    font-size: 0.9rem;
  }
}
</style>
