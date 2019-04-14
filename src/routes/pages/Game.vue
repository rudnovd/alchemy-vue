<template lang='pug'>
  b-container
    .game-field
      vue-draggable-resizable(
        class-name-active='active-element'
        class-name='element'
        v-for='(value, index) in openedElements'
        :key='value._id'
        :resizable='false'
        :w='100'
        :h='50'
        :x='activeElements[index].x'
        :y='activeElements[index].y'
        :parent='true'
        @dragging='onDrag'
        @activated="onActivated(value)"
        @dragstop="onDragstop(value)"
      ) {{ value.name }}
      b-btn.clear-field-button(variant='link' @dblclick='clearGameField')
        font-awesome-icon.fa-3x(icon='trash')
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
      setSelectedElement: 'game/setSelectedElement'
    }),
    onDrag (x, y) {
      console.log(`X: ${x}, Y: ${y}`)
    },
    onActivated (element) {
      this.setSelectedElement(element)
    },
    onDragstop (element) {
      this.setSelectedElement(element)
    },
    clearGameField () {
      console.log('clearGameField method called')
    }
  }
}
</script>

<style lang='scss'>
@import '@/css/colors.scss';

.game-field {
  position: absolute;
  top: 10vh;
  bottom: 5vh;
  left: 10vw;
  right: 10vw;
  box-shadow: 0 0 5px $alchemy-light-green;
  background-color: white;
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
  background-color: $alchemy-green;
}

.clear-field-button {
  color: black;
}
</style>
