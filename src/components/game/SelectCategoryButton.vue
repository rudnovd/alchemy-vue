<template lang='pug'>
b-btn(
  class='select-category-button'
  @click='selectCategory'
  :class='{ "btn-success": categoryName === selectedCategory}'
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
      selectedCategory: 'game/selectedCategory'
    })
  },
  methods: {
    ...mapActions({
      setSelectedCategory: 'game/setSelectedCategory',
      updateOpenedElementsByCategory: 'game/updateOpenedElementsByCategory'
    }),
    selectCategory () {
      this.setSelectedCategory(this.categoryName)
      this.updateOpenedElementsByCategory(this.categoryName)
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .select-category-button {
    margin-right: 5px;
    width: 100px;
  }
}

@media screen and (min-width: 768px) {
  .select-category-button {
    display: block;
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
