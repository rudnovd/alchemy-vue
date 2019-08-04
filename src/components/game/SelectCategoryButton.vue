<template lang='pug'>
b-btn(
  variant='info'
  block
  @click='selectCategory'
) {{ categoryName }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    categoryName: String
  },
  computed: {
    ...mapGetters({
      openedElements: 'game/openedElements',
      selectedCategory: 'game/selectedCategory'
    })
  },
  methods: {
    ...mapActions({
      updateOpenedElementsPositions: 'game/updateOpenedElementsPositions',
      setSelectedCategory: 'game/setSelectedCategory',

      setOpenedElements: 'game/setOpenedElements',
      updateOpenedElementsByCategory: 'game/updateOpenedElementsByCategory'
    }),
    selectCategory () {
      this.setSelectedCategory(this.categoryName)
      this.updateOpenedElementsByCategory(this.categoryName)

      this.$nextTick(() => {
        this.updateOpenedElementsPositions()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
