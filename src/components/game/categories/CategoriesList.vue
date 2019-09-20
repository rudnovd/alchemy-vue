<template>
  <div class='elements-categories-list text-center'>
    <SelectCategoryButton
      class='select-category-button'
      v-for='openedCategory in openedCategories'
      :key='openedCategory._id'
      :categoryName='openedCategory.name'
    />
  </div>
</template>

<script>
import SelectCategoryButton from '@/components/game/categories/SelectCategoryButton.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    SelectCategoryButton
  },
  computed: {
    ...mapGetters({
      openedCategories: 'categories/openedCategories'
    })
  }
}
</script>

<style lang='scss' scoped>
@media screen and (max-width: 767px) {
  .elements-categories-list {
    overflow-y: auto;
    overflow-x: hidden;
    display: inline-block;
    float: none;
    min-width: 300px;
    min-height: 50px;
    max-height: 110px;
  }
}

@media (min-width: 768px) {
  .elements-categories-list {
    height: inherit;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    height: 100%;
    max-height: 100%;
    width: 300px;
    z-index: 101;
  }

  .select-category-button {
    margin-bottom: 8px;
  }
}
</style>
