<template>
  <div class='active-elements-history' @click='showHistory'>
    <span v-show='history.last.firstElement && history.last.secondElement'>{{ history.last.firstElement }} + {{ history.last.secondElement }}</span>
    <span v-show='history.last.result'> = {{ history.last.result }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      history: 'game/history'
    })
  },
  methods: {
    showHistory () {
      let history = []

      this.history.past.forEach(historyValue => {
        history.push(`${historyValue.firstElement} + ${historyValue.secondElement} = ${historyValue.result}`)
      })

      console.log('history:')
      history.forEach(value => {
        console.log(value)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.active-elements-history {
  opacity: 0.5;

  &:hover {
    cursor: pointer;
  }
}
</style>
