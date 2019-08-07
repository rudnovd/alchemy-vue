<template lang='pug'>
vue-draggable-resizable(
  class-name-active='selected-element'
  class-name='element'
  :resizable='false'
  :disable-user-select='true'
  :w='100'
  :h='50'
  :x='elementData.x'
  :y='elementData.y'
  :z='elementData.z'
  :parent='".active-elements"'
  :onDragStart='onDragStart'
  @activated='onActivated'
  @dragstop='onDragstop'
  @deactivated='onDeactivated'
)
  | {{ elementData.name }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { addOpenedElement } from '@/js/api/account'

import { getElements } from '@/js/api/elements'

import * as game from '@/js/game/game'

import * as shortid from 'shortid'

export default {
  props: {
    elementData: Object
  },
  computed: {
    ...mapGetters({
      activeElements: 'game/activeElements',
      selectedElement: 'game/selectedElement',

      openedRecipes: 'game/openedRecipes',
      recipes: 'game/recipes'
    })
  },
  methods: {
    ...mapActions({
      addActiveElement: 'game/addActiveElement',
      removeActiveElement: 'game/removeActiveElement',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates',
      removeSelectedElement: 'game/removeSelectedElement',

      setOpenedElements: 'game/setOpenedElements',

      addOpenedRecipe: 'game/addOpenedRecipe',

      addHistory: 'game/addHistory'
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
      if (!this.selectedElement) {
        return
      }
      this.setSelectedElementCoordinates({ x, y, z: 100 })

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

          this.addActiveElement({
            _id: resultOfRecipe._id,
            name: resultOfRecipe.name,
            x: x,
            y: y,
            gameId: shortid.generate()
          })
          this.addHistory({
            firstElement: this.selectedElement.name,
            secondElement: combineElement.name,
            result: resultOfRecipe.name
          })
          this.removeActiveElement(this.selectedElement.gameId)
          this.removeActiveElement(combineElement.gameId)
        }
      }
      this.removeSelectedElement()
    }
  }
}
</script>

<style lang="scss" scoped>
.element {
  text-align: center;
  line-height: 50px;
  background-color: #AAA;
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
  border-radius: 25px;
  user-select: none;
}

.selected-element {
  background-color: color('alchemy-green');
}
</style>
