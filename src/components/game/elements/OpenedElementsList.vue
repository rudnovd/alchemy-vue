<template>
  <div class='opened-elements-list'>
    <div class='loading' v-if='state.isLoading && !state.error'>
      <b-spinner class='spinner'/>
    </div>

    <div class='error' v-if='state.error && !state.isLoading'>
      <div class='error'>
        {{ state.error }}
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      state: 'elements/state',
      openedCategories: 'categories/openedCategories'
    })
  },
  methods: {
    ...mapActions({
      setSelectedCategory: 'categories/setSelectedCategory',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory'
    }),
    selectCategory (category) {
      this.updateOpenedElementsByCategory(category)
    }
  }
}
</script>

<style lang='scss' scoped>
.opened-elements-list {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  border: 1px solid black;

  &:active {
    position: unset;
  }

  .loading, .error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    .spinner {
      color: map-get($colors, "alchemy-green");
      width: 3rem;
      height: 3rem;
    }
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .opened-elements-list {
    height: 100%;
    width: 300px;

    &::-webkit-scrollbar {
      width: 7px;
      background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
}
</style>
