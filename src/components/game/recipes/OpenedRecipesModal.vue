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
        <button class='close-button' @click='showModal = false'>
          <font-awesome-icon icon='times'/>
        </button>
      </b-col>

      <b-col class='mt-2 opened-recipes-categories' cols='4'>
        <b-btn
          block='block'
          v-for='category in openedCategories'
          :key='category._id'
          :class='{ "btn-success": category._id === selectedCategory._id }'
          @click='selectCategory(category)'
        >
          {{ category.name }}
        </b-btn>
      </b-col>

      <b-col class='mt-2 opened-recipes-list' cols='7'>
        <b-row
          class='opened-recipes-list-item'
          v-for='recipe in filteredByCategoryRecipes'
          :key='recipe._id'
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
      selectedCategory: {}
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
    }),
    filteredByCategoryRecipes () {
      return this.openedRecipes.filter(openedRecipe => {
        return openedRecipe.result.category === this.selectedCategory._id
      })
    }
  },
  methods: {
    selectCategory (category) {
      this.selectedCategory = category
    }
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

.close-button {
  background: none;
  border: none;
  outline: none;
  color: black;
  font-size: 1.3em;

  &:hover {
    opacity: 0.8;
  }
}
</style>
