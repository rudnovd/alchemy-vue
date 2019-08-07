<template lang='pug'>
div(class='active-elements-action')
  span(v-show='history.last.firstElement && history.last.secondElement') {{ history.last.firstElement }} + {{ history.last.secondElement }}
  span(v-show='history.last.result')  = {{ history.last.result }}

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      history: 'game/history'
    })
  }
}
</script>

<style lang="scss" scoped>
.active-elements-action {
  order: 1;
  margin-top: auto;
  opacity: 0.5;
}
</style>
