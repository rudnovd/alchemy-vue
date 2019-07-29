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
      selectedElement: 'game/selectedElement'
    })
  },
  methods: {
    ...mapActions({
      addActiveElement: 'game/addActiveElement',
      removeActiveElement: 'game/removeActiveElement',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates',
      removeSelectedElement: 'game/removeSelectedElement',

      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions'
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
            this.removeActiveElement(this.selectedElement.gameId)
            this.removeActiveElement(combineElement.gameId)
            this.addActiveElement(combineElement)
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
