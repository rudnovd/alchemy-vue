<template>
  <div class='categories-list'>
    <div class='loading' v-if='state.isLoading && !state.error'>
      <b-spinner class='spinner'/>
    </div>

    <div class='error' v-if='state.error && !state.isLoading'>
      <div class='error'>
        {{ state.error }}
      </div>
    </div>

    <template v-if='!state.isLoading && !state.error'>
      <button
        class='select-category-button'
        v-for='openedCategory in openedCategories'
        :key='openedCategory._id'
        @click='selectCategory(openedCategory)'
        :class='{ "active": openedCategory._id === selectedCategory._id}'
      >
        <b-img :src='`/images/categories/${openedCategory.name}.png`' @error='setBaseIcon' width='45' height='45' :alt='openedCategory.name'/>
        <span>{{ openedCategory.name }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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
    selectCategory (category) {
      this.setSelectedCategory(category)
      this.updateOpenedElementsByCategory(category)

      this.$nextTick(() => {
        this.updateOpenedElementsPositions()
      })
    },
    setBaseIcon (event) {
      event.target.src = '/images/categories/Base.png'
    }
  }
}
</script>

<style lang='scss' scoped>
.categories-list {
  display: flex;
  justify-content: flex-start;
  flex: 1 0 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 90vh;

  @extend %scrollbar;

  .loading, .error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    .spinner {
      color: map-get($colors, "alchemy-green");
      width: 3em;
      height: 3em;
    }
  }

  .select-category-button {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    text-align: center;
    opacity: 0.5;
    word-break: break-word;
    background: rgb(240, 240, 240);
    border: 1px solid map-get($colors, 'alchemy-light-green');
    border-radius: 6px;
    transition: background-color .4s;

    &.active {
      font-weight: bold;
      opacity: 1;
      color: rgb(255, 255, 255);
      background-color: map-get($colors, 'alchemy-green');
      border: 1px solid map-get($colors, 'alchemy-light-green');
    }

    img {
      margin-right: 5px;
    }
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .categories-list {
    flex-direction: column;
    align-items: center;
    align-content: center;
    direction: rtl;
    padding-left: 10px;
    padding-right: 10px;

    .select-category-button {
      height: 70px;
      width: 100%;
      font-size: 1.2em;
      margin-bottom: 12px;

      &:hover {
        opacity: 0.8;
        border: 1px solid  map-get($colors, 'alchemy-dark-green');
      }

      img {
        height: 45px;
        width: 45px;
        order: 1;
      }
    }
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .categories-list {
    height: 100%;
    padding: 5px;
    flex-wrap: wrap;

    .select-category-button {
      flex: 0 0 32%;
      height: 50px;
      font-size: 1em;
      margin-right: 5px;
      margin-bottom: 5px;

      img {
        height: 25px;
        width: 25px;
      }
    }

  }

}

@media screen and (max-width: map-get($grid-breakpoints, 'min')) {
  .select-category-button {
    font-size: 0.8rem;
  }
}
</style>
