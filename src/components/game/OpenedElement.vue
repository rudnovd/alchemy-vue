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
  :parent="'.game-field'"
  @activated='onActivated'
  @dragstop='onDragstop'
) {{ elementData.name }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import * as shortid from 'shortid'

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
      addOpenedElement: 'game/addOpenedElement',
      removeOpenedElement: 'game/removeOpenedElement',

      addActiveElement: 'game/addActiveElement',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates',
      removeSelectedElement: 'game/removeSelectedElement',

      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated () {
      this.setSelectedElement(this.elementData)
    },

    // Called whenever the component stops getting dragged
    onDragstop (x, y) {
      this.setSelectedElementCoordinates({ x, y })

      if (x < this.gameFieldSize.x - this.elementsListFieldSize.x) {
        this.addActiveElement({
          _id: this.elementData._id,
          name: this.elementData.name,
          category: this.elementData.name.category,
          gameId: shortid.generate()
        })
      }

      this.$nextTick(() => {
        this.updateOpenedElementsPositions()
      })

      this.removeSelectedElement()
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
}
</style>
