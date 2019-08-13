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
    width: 100px;
  }
}

@media screen and (min-width: 768px) {
  .select-category-button {
    display: block;
    width: 100%;
  }
}

.select-category-button {
  height: 50px;
  background: rgb(240, 240, 240);
  opacity: 0.5;
  color: black;
  word-break: normal;
}

.select-category-button:hover {
  opacity: 0.8;
  border: 1px solid color('alchemy-light-green');
}

.select-category-button.active {
  opacity: 1;
  background-color: color('alchemy-green');
  border-color: color('alchemy-light-green');
  font-weight: bold;
  border: 1px solid color('dark');
}
</style>
