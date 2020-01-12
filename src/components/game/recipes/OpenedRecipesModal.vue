<template>
  <b-modal
    :visible="showModal"
    size="xl"
    hide-header="hide-header"
    hide-footer="hide-footer"
    centered="centered"
    @hide="onClose"
  >
    <b-row class="ml-1 mr-1 mb-3">
      <b-col cols="9">
        <h4>Opened recipes</h4>
      </b-col>

      <b-col class="ml-auto text-right" cols="3">
        <button class="close-button" @click="onClose">
          <font-awesome-icon icon="times" />
        </button>
      </b-col>
    </b-row>

    <b-row class="recipes-row">
      <b-col class="mt-2 opened-recipes-categories" cols="12" lg="3">
        <button
          v-for="category in openedCategories"
          :key="category._id"
          class="category"
          :class="{ active: category._id === selectedCategory._id }"
          @click="selectedCategory = category"
        >
          {{ category.name }}
        </button>
      </b-col>

      <b-col class="mt-2 recipes-list" cols="12" lg="8">
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
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
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
        return openedRecipe.result.category[0]._id === this.selectedCategory._id
      })
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
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
  color: rgb(0, 0, 0);
  background: rgb(245, 245, 245);
  border: 1px solid map-get($colors, 'light-green');
  border-radius: 6px;
  transition: background-color 0.4s;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;

  &.active {
    font-weight: bold;
    opacity: 1;
    color: #ffffff;
    background-color: map-get($colors, 'green');
    border: 1px solid map-get($colors, 'light-green');
  }
}

.opened-recipes-categories {
  max-height: 200px;
  overflow-y: auto;
  direction: rtl;
  @extend %scrollbar;

  @include media-md {
    max-height: 80vh;
  }
}

.recipes-list {
  overflow-y: auto;
  min-height: 30vh;

  @extend %scrollbar;
}
</style>
