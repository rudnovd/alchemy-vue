<template>
  <div class='elements-categories-list text-center'>
    <p class='text-center mb-1'>
      Categories
    </p>

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
    max-height: 175px;
  }
}

@media (min-width: 768px) {
  .elements-categories-list {
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .select-category-button {
    margin-bottom: 8px;
  }
}
</style>
