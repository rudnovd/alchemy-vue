<template lang='pug'>
div(class='clear-game-field-button')
  font-awesome-icon(id='clear-game-field-button' class='clear-game-field-button' icon='trash' @click='onClick')
  b-popover(
    target='clear-game-field-button'
    placement='bottom'
    content='Click for clear game field'
    :show='showPopover'
    @shown='onShown'
  )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      showPopover: false,
      isTimeout: false
    }
  },
  methods: {
    ...mapActions({
      removeAllActiveElements: 'game/removeAllActiveElements'
    }),
    onClick () {
      if (!this.showPopover && !this.isTimeout) {
        this.showPopover = true
      } else if (this.showPopover && this.isTimeout) {
        setTimeout(() => {
          this.isTimeout = false
          this.showPopover = false
          this.removeAllActiveElements()
        }, 0)
      }
    },
    onShown () {
      if (!this.isTimeout) {
        this.isTimeout = true
        setTimeout(() => {
          this.isTimeout = false
          this.showPopover = false
        }, 1500)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.clear-game-field-button {
  cursor: pointer;
  color: color('dark');
  order: 0;
  margin-left: auto;
  width: 30px;
  height: 30px;
  padding: 0;
}
</style>
