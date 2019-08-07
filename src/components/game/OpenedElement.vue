<template lang='pug'>
vue-draggable-resizable(
  class-name='element'
  class-name-active='selected-element'
  :draggable='true'
  :disable-user-select='true'
  :resizable='false'
  :minWidth='50'
  :maxWidth='100'
  :minHeight='20'
  :maxHeight='50'
  :w='200'
  :h='50'
  :x='elementData.x'
  :y='elementData.y'
  :z='elementData.z'
  :parent="'.game-field'"
  :onDragStart='onDragStart'
  @activated='onActivated'
  @dragstop='onDragstop'
) {{ elementData.name }}
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

      openedElements: 'game/openedElements',
      activeElements: 'game/activeElements',
      selectedElement: 'game/selectedElement',
      recipes: 'game/recipes',
      openedRecipes: 'game/openedRecipes'
    })
  },
  methods: {
    ...mapActions({
      addActiveElement: 'game/addActiveElement',
      removeActiveElement: 'game/removeActiveElement',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates',
      removeSelectedElement: 'game/removeSelectedElement',

      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions',

      addHistory: 'game/addHistory',
      addOpenedRecipe: 'game/addOpenedRecipe',
      setOpenedElements: 'game/setOpenedElements'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated () {
      this.setSelectedElement(this.elementData)
    },

    // Called whenever the user clicks anywhere outside the component, in order to deactivate it
    onDeactivated () {
      this.removeSelectedElement()
    },

    // Called when dragging starts (element is clicked or touched)
    onDragStart () {
      this.setSelectedElement(this.elementData)
      this.setSelectedElementCoordinates({ x: this.elementData.x, y: this.elementData.y, z: 101 })
    },

    // Called whenever the component stops getting dragged
    onDragstop (x, y) {
      this.setSelectedElementCoordinates({ x, y })

      let addElement = false

      if (x < this.gameFieldSize.x - this.elementsListFieldSize.x - 150) {
        if (this.activeElements.length > 0) {
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
                          response.data.response[i].x = null
                          response.data.response[i].y = null
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
              this.removeActiveElement(this.selectedElement.gameId)
              this.removeActiveElement(combineElement.gameId)
              this.addActiveElement(resultOfRecipe)
            }
          } else {
            addElement = true
          }
        } else if (this.activeElements.length === 0) {
          addElement = true
        }
      } else if (x >= this.gameFieldSize.x - this.elementsListFieldSize.x - 1 && x === this.selectedElement.x && y === this.selectedElement.y) {
        this.setSelectedElementCoordinates({ x: 200, y: 200 })
        addElement = true
      }

      if (addElement) {
        this.addActiveElement({
          _id: this.elementData._id,
          name: this.elementData.name,
          category: this.elementData.name.category,
          x: x,
          y: y,
          gameId: shortid.generate()
        })
      }

      this.removeSelectedElement()

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
  line-height: 50px;
  background-color: rgb(226, 226, 226);
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
  user-select: none;
}
</style>
