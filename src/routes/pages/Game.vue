<template lang='pug'>
  b-container
    .game-field
      vue-draggable-resizable(
        class-name-active='active-element'
        class-name='element'
        v-for='(value, index) in data.elements'
        :key='value'
        :resizable='false'
        :w='100'
        :h='50'
        :x='data.elementsX[index]'
        :y='data.elementsY[index]'
        :parent='true'
        :on-drag-start='onDragStartCallback'
        @dragging='onDrag'
      ) {{ value }}
      b-btn.clear-field-button(variant='link' @dblclick='clearGameField')
        font-awesome-icon.fa-3x(icon='trash')
</template>

<script>
export default {
  name: 'Game',
  mounted () {
    const playerScreen = document.getElementsByClassName('game')
    this.data.playerScreenWidth = playerScreen.clientWidth
    this.data.playerScreenHeight = playerScreen.clientHeight
    window.addEventListener('resize', () => {
      this.data.playerScreenWidth = playerScreen.clientWidth
      this.data.playerScreenHeight = playerScreen.clientHeight
    })
  },
  data () {
    return {
      data: {
        playerScreenWidth: 0,
        playerScreenHeight: 0,

        activeElement: {
          x: null,
          y: null,
          z: null
        },

        elements: ['Earth', 'Water', 'Fire'],

        elementsX: [400, 600, 800],
        elementsY: [250, 250, 250]
      }
    }
  },
  methods: {
    onDrag (x, y) {
      console.log(`X: ${x}, Y: ${y}`)
    },
    onDragStartCallback (ev) {
      const activeElement = document.getElementsByClassName('active-element')
      console.log(activeElement)
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
