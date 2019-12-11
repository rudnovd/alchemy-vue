<template>
  <div class="categories-list">
    <div v-if="state.isLoading && !state.error" class="loading-section">
      <b-spinner class="loading-spinner" />
    </div>

    <div v-if="state.error && !state.isLoading" class="error-section">
      <div class="error">
        {{ state.error }}
      </div>
    </div>

    <template v-if="!state.isLoading && !state.error">
      <button
        v-for="openedCategory in openedCategories"
        :key="openedCategory._id"
        class="list-button"
        :class="{ active: openedCategory._id === selectedCategory._id }"
        @click="selectCategory(openedCategory)"
      >
        <b-img
          class="list-button-image"
          :src="`/images/categories/${openedCategory.name}.png`"
          width="45"
          height="45"
          :alt="openedCategory.name"
          @error="setBaseIcon"
        />
        <span class="list-button-name">{{ openedCategory.name }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CategoriesList',
  computed: {
    ...mapGetters({
      state: 'categories/state',
      selectedCategory: 'categories/selectedCategory',
      openedCategories: 'categories/openedCategories'
    })
  },
  methods: {
    ...mapActions({
      setSelectedCategory: 'categories/setSelectedCategory',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory',
      updateOpenedElementsPositions: 'elements/updateOpenedElementsPositions'
    }),
    selectCategory(category) {
      this.setSelectedCategory(category)
      this.updateOpenedElementsByCategory(category)

      this.$nextTick(() => {
        this.updateOpenedElementsPositions()
      })
    },
    setBaseIcon(event) {
      event.target.src = '/images/categories/Base.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.categories-list {
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 100%;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px;
  @extend %scrollbar;

  @include media-sm {
    height: 100%;
    padding: 5px;
  }

  @include media-lg {
    align-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    max-height: 90vh;
    padding-left: 10px;
    padding-right: 10px;
  }
}

.list-button {
  align-content: center;
  align-items: center;
  background: rgb(240, 240, 240);
  border-radius: 6px;
  border: 1px solid map-get($colors, 'light-green');
  display: flex;
  flex-wrap: nowrap;
  flex: 0 0 32%;
  font-size: 0.8rem;
  height: 2.5rem;
  justify-content: center;
  margin-bottom: 0.5rem;
  opacity: 0.5;
  text-align: center;
  transition: background-color 0.4s;
  word-break: break-word;
  flex-direction: column;

  &.active {
    font-weight: bold;
    opacity: 1;
    color: rgb(255, 255, 255);
    background-color: map-get($colors, 'green');
    border: 1px solid map-get($colors, 'light-green');
  }

  @include media-sm {
    flex: 0 0 31.625%;
    height: 3rem;
    margin-left: 5px;
    min-width: 90px;
  }

  @include media-md {
    flex-direction: row;
    flex: 0 0 24%;
  }

  @include media-lg {
    flex: 0 0 5rem;
    font-size: 1.2em;
    height: 70px;
    margin-bottom: 12px;
    width: 100%;

    &:hover {
      border: 1px solid map-get($colors, 'dark-green');
      opacity: 0.8;
    }
  }
}

.list-button-image {
  display: none;
  flex: 0 0 auto;
  order: 0;

  @include media-sm {
    display: flex;
    margin-right: 0.2rem;
    max-height: 1.2rem;
    max-width: 1.2rem;
  }

  @include media-md {
    display: flex;
    margin-right: 5px;
    max-height: 23px;
    max-width: 23px;
  }

  @include media-lg {
    max-height: 45px;
    max-width: 45px;
  }
}

.list-button-name {
  display: flex;
  justify-content: flex-start;
  flex: 0 0 auto;

  @include media-md {
    flex: 0 0 80%;
  }
}
</style>
