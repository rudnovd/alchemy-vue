<template lang='pug'>
b-modal(
  v-model='showModal'
  size='xl'
  hide-header=true
  hide-footer=true
  centered=true
)
  b-row(class='ml-3 mr-3')
    //- text
    b-col(cols='8')
      h4 Opened recipes

    //- Close button
    b-col(class='ml-auto text-right' cols='2')
      b-button(
        class='close-button'
        size='sm'
        variant='link'
        @click='showModal = false'
      )
        font-awesome-icon(class='c-pointer fa-2x' icon='times')

    b-col(class='mt-2 opened-recipes-categories' cols='4')
      b-btn(
        block
        v-for='category in openedCategories'
        :key='category._id'
        :class='{ "btn-success": category.name === selectedCategory}'
        @click='selectedCategory = category.name'
      ) {{ category.name }}

    b-col(class='mt-2 opened-recipes-list' cols='7')
      OpenedRecipe(
        v-for='recipe in openedRecipes'
        :key='recipe._id'
        :recipe='recipe'
        v-if='recipe.result.category === selectedCategory'
      )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import OpenedRecipe from '@/components/game/OpenedRecipe.vue'

export default {
  components: {
    OpenedRecipe
  },
  data () {
    return {
      showModal: false,
      selectedCategory: 'Elements'
    }
  },
  mounted () {
    this.$root.$on('openedRecipesModalShow', () => {
      this.showModal = true
    })
  },
  computed: {
    ...mapGetters({
      openedCategories: 'game/openedCategories',
      openedRecipes: 'game/openedRecipes'
    })
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.opened-recipes-categories {
  max-height: 80vh;
  overflow-y: auto;
}

.opened-recipes-list {
  max-height: 80vh;
  overflow-y: auto;
  margin-bottom: 20px;
}
</style>
