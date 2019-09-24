<template>
  <div class='opened-elements-list'>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
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
