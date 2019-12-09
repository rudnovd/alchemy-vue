<template>
  <div id="active-elements-history" class="active-elements-history" @click="onClick">
    <span v-show="history.last.firstElement && history.last.secondElement">
      {{ history.last.firstElement }} + {{ history.last.secondElement }}
    </span>
    <span v-show="history.last.result"> = {{ history.last.result }}</span>

    <b-popover target="active-elements-history" placement="bottom" :show="showPopover" @shown="onShown">
      <template v-slot:default>
        <div class="active-elements-history-popover">
          <span v-for="text in historyText" :key="text">{{ text }}</span>
        </div>
      </template>
    </b-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ActiveElementsHistory',
  data() {
    return {
      showPopover: false,
      isTimeout: false,
      historyText: []
    }
  },
  computed: {
    ...mapGetters({
      history: 'game/history'
    })
  },
  methods: {
    onClick() {
      if (!this.showPopover && !this.isTimeout) {
        this.showPopover = true
        this.showHistory()
      } else if (this.showPopover && this.isTimeout) {
        setTimeout(() => {
          this.isTimeout = false
          this.showPopover = false
        }, 0)
      }
    },
    onShown() {
      if (!this.isTimeout) {
        this.isTimeout = true
        setTimeout(() => {
          this.isTimeout = false
          this.showPopover = false
        }, 5000)
      }
    },
    showHistory() {
      this.historyText = []
      this.history.past.forEach(historyValue => {
        if (historyValue.result) {
          this.historyText.push(`${historyValue.firstElement} + ${historyValue.secondElement} = ${historyValue.result}`)
        } else {
          this.historyText.push(`${historyValue.firstElement} + ${historyValue.secondElement}`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.active-elements-history {
  opacity: 0.5;

  &:hover {
    cursor: pointer;
    opacity: 1;
    color: map-get($colors, 'alchemy-green');
  }
}

.active-elements-history-popover {
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
  }
}
</style>
