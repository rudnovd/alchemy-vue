<template lang='pug'>
  b-container
    .game-field
      vue-draggable-resizable(
        class-name-active='active-element'
        class-name='element'
        v-for='(value, index) in activeElements'
        :key='value._id'
        :resizable='false'
        :w='100'
        :h='50'
        :x='activeElements[index].x'
        :y='activeElements[index].y'
        :parent='true'
        @activated="onActivated(value)"
        @dragstop="onDragstop"
      ) {{ value.name }}
      font-awesome-icon.fa-3x.clear-field-button(icon='trash' @dblclick='clearGameField')
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Game',
  mounted () {
    const gameField = document.getElementsByClassName('game-field')
    this.setGameFieldSize({ x: gameField[0].clientWidth, y: gameField[0].clientHeight })

    window.addEventListener('resize', () => {
      this.setGameFieldSize({ x: gameField[0].clientWidth, y: gameField[0].clientHeight })
    })

    this.setOpenedElements([
      {
        _id: '5c543755405e9d103878d4be',
        name: 'Earth',
        category: 'Elements'
      },
      {
        _id: '5c543755405e9d103878d4bf',
        name: 'Fire',
        category: 'Elements'
      },
      {
        _id: '5c543755405e9d103878d4c0',
        name: 'Water',
        category: 'Elements'
      }
    ])

    this.setActiveElements([
      {
        _id: '5c543755405e9d103878d4be',
        name: 'Earth',
        category: 'Elements',
        x: 200,
        y: 250
      },
      {
        _id: '5c543755405e9d103878d4bf',
        name: 'Fire',
        category: 'Elements',
        x: 400,
        y: 250
      },
      {
        _id: '5c543755405e9d103878d4c0',
        name: 'Water',
        category: 'Elements',
        x: 600,
        y: 250
      }
    ])
  },
  computed: {
    ...mapGetters({
      getGameFieldSize: 'game/getGameFieldSize',
      openedElements: 'game/openedElements',
      activeElements: 'game/activeElements',
      selectedElement: 'game/selectedElement'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      setGameFieldSize: 'game/setGameFieldSize',

      setOpenedElements: 'game/setOpenedElements',

      setActiveElements: 'game/setActiveElements',
      addActiveElement: 'game/addActiveElement',
      removeActiveElement: 'game/removeActiveElement',

      setSelectedElement: 'game/setSelectedElement',
      setSelectedElementCoordinates: 'game/setSelectedElementCoordinates'
    }),

    // Called whenever the component gets clicked, in order to show handles
    onActivated (element) {
      this.setSelectedElement(element)
    },

    // Called whenever the component gets dragged
    // onDragging (x, y) {
    //   console.log(`X: ${x}, Y: ${y}`)
    // },

    // Called whenever the component stops getting dragged
    onDragstop (x, y) {
      this.setSelectedElementCoordinates({ x, y })

      // If element dropped at other element
      for (let i = 0; i < this.activeElements.length; i++) {
        if (this.activeElements[i]._id !== this.selectedElement._id) {
          if ((this.activeElements[i].x <= this.selectedElement.x + 50 && this.activeElements[i].x >= this.selectedElement.x - 50) && (this.activeElements[i].y <= this.selectedElement.y + 25 && this.activeElements[i].y >= this.selectedElement.y - 25)) {
            console.log(`Element ${this.selectedElement.name} dropped at element ${this.activeElements[i].name}`)
            this.removeActiveElement([this.selectedElement, this.activeElements[i]])
            this.addActiveElement({
              _id: '5c5d9f2b3e55d015ec96744e',
              name: 'new element',
              category: 'Elements'
            })
          }
        }
      }
    },
    clearGameField () {
      //
    }
  }
}
</script>

<style lang='scss'>
.game-field {
  position: absolute;
  top: 10vh;
  bottom: 5vh;
  left: 10vw;
  right: 10vw;
  box-shadow: 0 0 5px color('alchemy-light-green');
  background-color: color('white');
  min-width: 80vw;
}

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

.clear-field-button {
  color: color('dark');
}
</style>
