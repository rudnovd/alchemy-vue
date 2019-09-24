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

import * as shortid from 'shortid'

import * as game from '@/js/game/game'

import { addOpenedElement } from '@/js/api/account'

import { getElements } from '@/js/api/elements'

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
      openedElementsFieldSize: 'game/openedElementsFieldSize'
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
      addOpenedRecipe: 'recipes/addOpenedRecipe'
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
        if (this.activeElements.length === 0) { // If game board without active elements then add active element
          addElement = true
        } else if (this.activeElements.length > 0) { // If game board has active elements then check elements on drop
          let combineElement = game.findClosest(this.selectedElement, this.activeElements)
          if (combineElement) {
            let resultOfRecipe = game.findRecipe(this.selectedElement, combineElement, this.recipes)
            if (resultOfRecipe) {
              let isOpenedRecipe = false
              for (let i = 0; i < this.openedRecipes.length; i++) {
                if (resultOfRecipe._id === this.openedRecipes[i].result._id) {
                  isOpenedRecipe = true
                }
              }
              if (!isOpenedRecipe) {
                let d = this.selectedElement
                addOpenedElement(resultOfRecipe._id).then(response => {
                  if (response.status === 200) {
                    this.addOpenedRecipe({
                      recipe: [
                        { _id: d._id, name: d.name },
                        { _id: combineElement._id, name: combineElement.name }
                      ],
                      result: {
                        _id: resultOfRecipe._id,
                        name: resultOfRecipe._name
                      }
                    })

                    getElements().then(response => {
                      if (response.status === 200) {
                        for (let i = 0; i < response.data.response.length; i++) {
                          response.data.response[i].x = 0
                          response.data.response[i].y = 0
                          response.data.response[i].z = 100
                        }
                        this.setOpenedElements(response.data.response)
                      }
                    })
                  }
                })
              }
              this.addHistory({
                firstElement: this.selectedElement.name,
                secondElement: combineElement.name,
                result: resultOfRecipe.name
              })
              resultOfRecipe.x = this.selectedElement.x
              resultOfRecipe.y = this.selectedElement.y
              resultOfRecipe.z = 100

              this.deleteActiveElement(this.selectedElement)
              this.deleteActiveElement(combineElement)
              this.addActiveElement(resultOfRecipe)
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
        this.addActiveElement({
          _id: this.elementData._id,
          name: this.elementData.name,
          category: this.elementData.name.category,
          x: this.gameFieldSize.x - Math.abs(this.selectedElement.x),
          y: Math.abs(this.selectedElement.y),
          z: 100,
          gameId: shortid.generate()
        })
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
