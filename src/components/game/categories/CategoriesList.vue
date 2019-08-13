<template>
  <b-col
    class='elements-categories pl-0 pl-sm-0 pl-md-2 pl-lg-3 pl-xl-3 pr-0 pr-sm-0 pr-md-2 pr-lg-3 pr-xl-3 text-center'
    cols='12'
    sm='12'
    md='3'
    lg='2'
    xl='2'
  >
    <p class='text-center mb-1'>
      Categories
    </p>

    <SelectCategoryButton
      class='select-category-button'
      v-for='openedCategory in openedCategories'
      :key='openedCategory._id'
      :categoryName='openedCategory.name'
    />
  </b-col>
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
  .elements-categories {
    overflow-y: auto;
    overflow-x: hidden;
    display: inline-block;
    float: none;
    margin-bottom: 15px;
    max-width: 300px;
    min-height: 50px;
    max-height: 10%;
  }

  .select-category-button {
    margin-right: 5px;
    margin-bottom: 5px;
    height: 40px;
    width: 31%;
  }
}

@media screen and (min-width: 768px) {
  .elements-categories {
    max-height: 100%;
    overflow: auto;
  }

  .select-category-button {
    margin-bottom: 8px;
  }
}
</style>
