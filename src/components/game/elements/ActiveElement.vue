<template>
  <vue-draggable-resizable
    class-name-active='selected-element'
    class-name='element'
    :resizable='false'
    :disable-user-select='true'
    :w='75'
    :h='75'
    :x='elementData.x'
    :y='elementData.y'
    :z='elementData.z'
    :parent='true'
    :onDragStart='onDragStart'
    @activated='onActivated'
    @dragstop='onDragstop'
    @deactivated='onDeactivated'
  >
    <div class='d-block'>
      <b-img :src='require("@/assets/images/elementExample.png")'/>
    </div>
    <span>
      {{ elementData.name }}
    </span>
  </vue-draggable-resizable>
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
      activeElements: 'elements/activeElements',
      selectedElement: 'elements/selectedElement',
      openedRecipes: 'recipes/openedRecipes',
      recipes: 'recipes/recipes'
    })
  },
  methods: {
    ...mapActions({
      addActiveElement: 'elements/addActiveElement',
      deleteActiveElement: 'elements/deleteActiveElement',
      setSelectedElement: 'elements/setSelectedElement',
      setSelectedElementCoordinates: 'elements/setSelectedElementCoordinates',
      deleteSelectedElement: 'elements/deleteSelectedElement',
      setOpenedElements: 'elements/setOpenedElements',
      addOpenedRecipe: 'recipes/addOpenedRecipe',
      addHistory: 'game/addHistory'
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
            z: 100,
            gameId: shortid.generate()
          })
          this.addHistory({
            firstElement: this.selectedElement.name,
            secondElement: combineElement.name,
            result: resultOfRecipe.name
          })
          this.deleteActiveElement(this.selectedElement)
          this.deleteActiveElement(combineElement)
        }
      }
      this.deleteSelectedElement()
    }
  }
}
</script>

<style lang='scss' scoped>
.element {
  text-align: center;
  line-height: 35px;
  background-color: rgb(223, 223, 223);
  width: 100px;
  height: 100px;
  display: inline-block;
  position: absolute;
  user-select: none;
  border-radius: 100%;
}

.selected-element {
  background-color: map-get($colors, 'alchemy-green');
}
</style>
