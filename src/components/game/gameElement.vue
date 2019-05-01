<template lang='pug'>
vue-draggable-resizable(
  class-name-active='active-element'
  class-name='element'
  :resizable='false'
  :w='100'
  :h='50'
  :x='elementData.x'
  :y='elementData.y'
  :parent='".elements-field"'
  :disable-user-select="true"
  @activated="onActivated"
  @dragstop="onDragstop"
  @deactivated='onDeactivated'
)
  | {{ elementData.name }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'gameElement',
  props: {
    elementData: Object
  },
  mounted () {
    this.elementCopy = this.elementData
  },
  computed: {
    ...mapGetters({
      gameFieldSize: 'game/gameFieldSize',

      openedElements: 'game/openedElements',
      activeElements: 'game/activeElements',
      selectedElement: 'game/selectedElement',

      openedCategories: 'game/openedCategories',

      error: 'game/error'
    })
  },
  data () {
    return {
      elementCopy: null
    }
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

    onActivated () {
      this.setSelectedElement(this.elementData)
    },
    onDeactivated () {
      this.setSelectedElement(null)
    },
    onDragstop (x, y) {
      this.setSelectedElementCoordinates({ x, y })

      let removeElementsArray = []

      const d = this.activeElements.length

      for (let i = 0; i < d; i++) {
        if (this.selectedElement && this.activeElements[i].gameId !== this.selectedElement.gameId) {
          if ((this.activeElements[i].x <= this.selectedElement.x + 50 && this.activeElements[i].x >= this.selectedElement.x - 50) && (this.activeElements[i].y <= this.selectedElement.y + 25 && this.activeElements[i].y >= this.selectedElement.y - 25)) {
            console.log(`Element ${this.selectedElement.name} dropped at element ${this.activeElements[i].name}`)

            const newElement = {
              name: parseInt(Math.random() * 100),
              category: 'Elements'
            }
            // removeElementsArray.push(this.selectedElement, this.activeElements[i])

            this.removeActiveElement(this.selectedElement)
            this.removeActiveElement(this.activeElements[i])

            this.addActiveElement(newElement)

            this.removeSelectedElement()
          }
        }
      }
    }
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
