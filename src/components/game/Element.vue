<template lang='pug'>
vue-draggable-resizable(
  class-name-active='selected-element'
  class-name='element'
  :resizable='false'
  :w='100'
  :h='50'
  :x='elementData.x'
  :y='elementData.y'
  :z='elementData.z'
  :parent='".active-elements"'
  :disable-user-select='true'
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
      gameFieldSize: 'game/gameFieldSize',

      activeElements: 'game/activeElements',
      selectedElement: 'game/selectedElement',

      openedCategories: 'game/openedCategories'
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

    onActivated () {
      this.setSelectedElement(this.elementData)
    },
    onDeactivated () {
      this.removeSelectedElement()
    },

    onDragStart () {
      this.setSelectedElement(this.elementData)
    },
    onDragstop (x, y) {
      if (!this.selectedElement) {
        return
      }

      this.setSelectedElementCoordinates({ x, y })

      let newElement = null

      const activeElements = this.activeElements.length

      for (let i = 0; i < activeElements; i++) {
        newElement = game.onDropCombine(this.selectedElement, this.activeElements[i])

        if (newElement) {
          this.removeActiveElement(this.selectedElement.gameId)
          this.removeActiveElement(this.activeElements[i].gameId)

          this.addActiveElement(newElement)

          break
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
}

.selected-element {
  background-color: color('alchemy-green');
}
</style>
