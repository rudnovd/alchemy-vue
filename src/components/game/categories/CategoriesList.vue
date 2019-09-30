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

    <button
      class='select-category-button'
      v-for='openedCategory in openedCategories'
      :key='openedCategory._id'
      @click='selectCategory(openedCategory)'
      :class='{ "active": openedCategory._id === selectedCategory._id}'
    >
      {{ openedCategory.name }}
    </button>
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
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory'
    }),
    selectCategory (category) {
      this.setSelectedCategory(category)
      this.updateOpenedElementsByCategory(category)
    }
  }
}
</script>

<style lang='scss' scoped>
.categories-list {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  border: 1px solid black;

  .loading, .error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    .spinner {
      color: map-get($colors, "alchemy-green");
      width: 3rem;
      height: 3rem;
    }
  }

  .select-category-button {
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
    transition: background-color .4s;

    &.active {
      font-weight: bold;
      opacity: 1;
      color: #FFFFFF;
      background-color: map-get($colors, 'alchemy-green');
      border: 1px solid map-get($colors, 'alchemy-light-green');
    }
  }
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .categories-list {
    position: relative;
    height: 100%;
    max-width: 300px;
    direction: rtl;
    padding-left: 10px;

    &::-webkit-scrollbar {
      width: 7px;
      background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

    .select-category-button {
      height: 70px;
      width: 100%;
      font-size: 1.2rem;
      margin-bottom: 8px;

      &:hover {
        opacity: 0.8;
        border: 1px solid  map-get($colors, 'alchemy-dark-green');
      }
    }
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .categories-list {
    display: inline-block;
    float: none;
    height: 50px;

    .select-category-button {
      height: 50px;
      width: 31%;
      font-size: 1rem;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }

}

@media screen and (max-width: map-get($grid-breakpoints, 'min')) {
  .select-category-button {
    font-size: 0.8rem;
  }
}
</style>
