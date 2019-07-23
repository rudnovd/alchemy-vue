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

import * as game from '@/js/game/game'

export default {
  props: {
    elementData: Object
  },
  computed: {
    ...mapGetters({
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
      removeSelectedElement: 'game/removeSelectedElement'
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
        this.removeActiveElement(this.selectedElement.gameId)
        this.removeActiveElement(combineElement.gameId)
        this.addActiveElement(combineElement)
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
