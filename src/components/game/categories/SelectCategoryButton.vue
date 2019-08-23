<template>
  <button
    class='select-category-button'
    @click='selectCategory'
    :class='{ "active": categoryName === selectedCategory}'
  >
    {{ categoryName }}
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    categoryName: String
  },
  computed: {
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory'
    })
  },
  methods: {
    ...mapActions({
      setSelectedCategory: 'categories/setSelectedCategory',
      updateOpenedElementsByCategory: 'elements/updateOpenedElementsByCategory'
    }),
    selectCategory () {
      this.setSelectedCategory(this.categoryName)
      this.updateOpenedElementsByCategory(this.categoryName)
    }
  }
}
</script>

<style lang='scss' scoped>
@media screen and (max-width: 767px) {
  .select-category-button {
    height: 70px;
    width: 31%;
    font-size: 1rem;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}

@media screen and (min-width: 768px) {
  .select-category-button {
    height: 70px;
    width: 100%;
    font-size: 1.2rem;
    display: block;
  }

  .select-category-button:hover {
    opacity: 0.8;
    border: 1px solid  map-get($colors, 'alchemy-light-green');
  }
}

@media screen and (max-width: 320px) {
  .select-category-button {
    font-size: 0.8rem;
  }
}

.select-category-button {
  color: black;
  background: rgb(240, 240, 240);
  opacity: 0.5;
  word-break: break-word;
  vertical-align:middle
}

.select-category-button.active {
  opacity: 1;
  background-color: map-get($colors, 'alchemy-green');
  border-color: map-get($colors, 'alchemy-light-green');
  font-weight: bold;
  border: 2px solid black;
}
</style>
