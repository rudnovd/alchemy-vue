<template lang='pug'>
vue-draggable-resizable(
  class-name-active='active-element'
  class-name='element'
  :resizable='false'
  :draggable='true'
  :disable-user-select="true"
  :minWidth='50'
  :maxWidth='100'
  :minHeight='20'
  :maxHeight='50'
  :w='100'
  :h='50'
  :x="elementData.x"
  :y='elementData.y'
  :parent="'.game-field'"
  @activated="onActivated"
  @dragstop="onDragstop"
)
  | {{ elementData.name }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ifGameIdUniq } from '@/js/game/check'

export default {
  name: 'elementsList',
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

      openedCategories: 'game/openedCategories',

      error: 'game/error'
    })
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',

      setOpenedElements: 'game/setOpenedElements',
      addOpenedElement: 'game/addOpenedElement',
      removeOpenedElement: 'game/removeOpenedElement',

      setActiveElements: 'game/setActiveElements',
      addActiveElement: 'game/addActiveElement',
      removeActiveElement: 'game/removeActiveElement',
      removeAllActiveElements: 'game/removeAllActiveElements',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates',
      removeSelectedElement: 'game/removeSelectedElement',

      setOpenedCategories: 'game/setOpenedCategories',
      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated () {
      this.setSelectedElement(this.elementData)
    },

    // Called whenever the component stops getting dragged
    onDragstop (x, y) {
      this.setSelectedElementCoordinates({ x, y })

      if ((x > 0 && y > 0) && (x < this.gameFieldSize.x - this.elementsListFieldSize.x) && ifGameIdUniq(this.selectedElement, this.activeElements)) {
        this.removeOpenedElement(this.elementData)
        this.addActiveElement(this.elementData)
        // this.addOpenedElement(this.elementData)
      } else {

      }
      this.updateOpenedElementsPositions()

      // const d = this.activeElements.length

      // for (let i = 0; i < d; i++) {
      //   console.log(i, this.activeElements[i])
      //   if (this.selectedElement && this.activeElements[i].gameId !== this.selectedElement.gameId) {
      //     if ((this.activeElements[i].x <= this.selectedElement.x + 50 && this.activeElements[i].x >= this.selectedElement.x - 50) && (this.activeElements[i].y <= this.selectedElement.y + 25 && this.activeElements[i].y >= this.selectedElement.y - 25)) {
      //       console.log(`Element ${this.selectedElement.name} dropped at element ${this.activeElements[i].name}`)

      //       const newElement = {
      //         name: Math.random(),
      //         category: 'Elements'
      //       }
      //       // removeElementsArray.push(this.selectedElement, this.activeElements[i])

      //       this.removeActiveElement(this.selectedElement)
      //       this.removeActiveElement(this.activeElements[i])

      //       this.addActiveElement(newElement)

      //       this.removeSelectedElement()
      //     }
      //   }
      // }
    }
    // onDeactivated () {
    //   this.setSelectedElement(null)
    // },
  }
}
</script>

<style lang='scss'>
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

.active-element {
  background-color: color('alchemy-green');
}
</style>
