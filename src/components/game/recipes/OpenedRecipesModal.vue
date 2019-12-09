<template>
  <b-modal v-model="showModal" size="xl" hide-header="hide-header" hide-footer="hide-footer" centered="centered">
    <b-row class="ml-1 mr-1">
      <b-col cols="9">
        <h4>Opened recipes</h4>
      </b-col>

      <b-col class="ml-auto text-right" cols="3">
        <button class="close-button" @click="showModal = false">
          <font-awesome-icon icon="times" />
        </button>
      </b-col>
    </b-row>

    <b-row class="recipes-row">
      <b-col class="mt-2 opened-recipes-categories" cols="12" sm="12" md="12" lg="4" xl="4">
        <button
          v-for="category in openedCategories"
          :key="category._id"
          class="category"
          :class="{ active: category._id === selectedCategory._id }"
          @click="selectCategory(category)"
        >
          {{ category.name }}
        </button>
      </b-col>

      <b-col class="mt-2 recipes-list" cols="12" sm="12" md="12" lg="8" xl="8">
        <OpenedRecipe v-for="recipe in filteredByCategoryRecipes" :key="recipe._id" :recipe="recipe" />
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

import OpenedRecipe from '@/components/game/recipes/OpenedRecipe.vue'

export default {
  name: 'OpenedRecipesModal',
  components: {
    OpenedRecipe
  },
  data() {
    return {
      showModal: false,
      selectedCategory: {}
    }
  },
  computed: {
    ...mapGetters({
      openedCategories: 'categories/openedCategories',
      openedRecipes: 'recipes/openedRecipes'
    }),
    filteredByCategoryRecipes() {
      return this.openedRecipes.filter(openedRecipe => {
        return openedRecipe.result.category === this.selectedCategory._id
      })
    }
  },
  mounted() {
    this.$root.$on('openedRecipesModalShow', () => {
      this.showModal = true
    })
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .opened-recipes-categories {
    max-height: 80vh;
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .opened-recipes-categories {
    max-height: 200px;
  }
}

.recipes-row {
  min-height: 50vh;
}

.category {
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  opacity: 0.5;
  word-break: break-word;
  vertical-align: middle;
  color: black;
  background: rgb(240, 240, 240);
  border: 1px solid map-get($colors, 'alchemy-light-green');
  border-radius: 6px;
  transition: background-color 0.4s;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;

  &.active {
    font-weight: bold;
    opacity: 1;
    color: #ffffff;
    background-color: map-get($colors, 'alchemy-green');
    border: 1px solid map-get($colors, 'alchemy-light-green');
  }
}

.opened-recipes-categories {
  overflow-y: auto;
  direction: rtl;
  @extend %scrollbar;
}

.recipes-list {
  overflow-y: auto;
  min-height: 30vh;

  @extend %scrollbar;
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
