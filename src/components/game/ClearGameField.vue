<template lang='pug'>
font-awesome-icon(class='fa-3x clear-game-field-button' icon='trash' @dblclick='removeAllActiveElements')
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      removeAllActiveElements: 'game/removeAllActiveElements'
    })
  }
}
</script>

<style lang='scss'>
.clear-game-field-button {
  color: color('dark');
}
</style>
