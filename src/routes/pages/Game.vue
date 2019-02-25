<template lang='pug'>
  b-container
    #game(cols='12')
      vue-drag-resize(
        :isActive='true'
        :w='100'
        :h='50'
        :isResizable='false'
        :parentLimitation='true'
        :parentW='data.screenWidth'
        :parentH='data.screenHeight'
      )
        .filler Element
</template>

<script>
export default {
  name: 'Game',
  mounted () {
    const screen = document.getElementById('game')
    this.data.screenWidth = screen.clientWidth
    this.data.screenHeight = screen.clientHeight
    window.addEventListener('resize', () => {
      this.data.screenWidth = screen.clientWidth
      this.data.screenHeight = screen.clientHeight
    })
  },
  data () {
    return {
      data: {
        screenWidth: 0,
        screenHeight: 0
      }
    }
  }
}
</script>

<style lang='scss'>
#game {
  position: absolute;
  top: 10vh;
  bottom: 5vh;
  left: 20vw;
  right: 20vw;
  box-shadow: 0 0 5px #AAA;
  background-color: white;
}

.filler {
  text-align: center;
  line-height: 50px;
  background-color: red;
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
}
</style>
