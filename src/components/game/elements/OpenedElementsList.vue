<template>
  <div class="opened-elements-list">
    <div v-if="openedCategories.length === 0 && state.isLoading && !state.error" class="loading-section">
      <b-spinner class="loading-spinner" />
    </div>

    <div v-if="openedCategories.length === 0 && state.error && !state.isLoading" class="error-section">
      {{ state.error }}
    </div>

    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OpenedElementsList',
  computed: {
    ...mapGetters({
      state: 'elements/state',
      openedCategories: 'categories/openedCategories'
    })
  }
}
</script>

<style lang="scss" scoped>
.opened-elements-list {
  position: relative;
  height: 100%;
  width: 100%;

  &:active {
    position: absolute;
  }
}
</style>
