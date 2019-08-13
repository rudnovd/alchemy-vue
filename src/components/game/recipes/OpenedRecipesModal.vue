<template>
  <b-modal
    v-model='showModal'
    size='xl'
    hide-header='hide-header'
    hide-footer='hide-footer'
    centered='centered'
  >
    <b-row class='ml-3 mr-3'>
      <b-col cols='8'>
        <h4>
          Opened recipes
        </h4>
      </b-col>

      <b-col class='ml-auto text-right' cols='2'>
        <b-button class='close-button' size='sm' variant='link' @click='showModal = false'>
          <font-awesome-icon class='c-pointer fa-2x' icon='times' />
        </b-button>
      </b-col>

      <b-col class='mt-2 opened-recipes-categories' cols='4'>
        <b-btn
          block='block'
          v-for='category in openedCategories'
          :key='category._id'
          :class='{ "btn-success": category.name === selectedCategory}'
          @click='selectedCategory = category.name'
        >
          {{ category.name }}
        </b-btn>
      </b-col>

      <b-col class='mt-2 opened-recipes-list' cols='7'>
        <b-row
          class='opened-recipes-list-item'
          v-for='recipe in openedRecipes'
          :key='recipe._id'
          v-if='recipe.result.category === selectedCategory'
        >
          <b-col class='mb-1' cols='12'>
            <OpenedRecipe :recipe='recipe' />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import OpenedRecipe from '@/components/game/recipes/OpenedRecipe.vue'

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
      openedCategories: 'categories/openedCategories',
      openedRecipes: 'recipes/openedRecipes'
    })
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    })
  }
}
</script>

<style lang='scss' scoped>
.opened-recipes-categories {
  max-height: 80vh;
  overflow-y: auto;
}

.opened-recipes-list {
  max-height: 80vh;
  overflow-y: auto;
  margin-bottom: 20px;
}

.opened-recipes-list-item {
  background-color: rgb(250, 250, 250);
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
