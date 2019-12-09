<template>
  <div class="elements-list">
    <b-card no-body="no-body">
      <b-tabs card="card" pills="pills" vertical="vertical" small="small" nav-wrapper-class="w-30">
        <b-tab
          v-for="category in categories"
          :key="category._id"
          :title="category.name"
          @click="selectedCategory = category"
        >
          <slot></slot>

          <b-btn
            v-for="element in selectedCategory.elements"
            :key="element._id"
            class="element"
            size="sm"
            variant="outline-success"
            @click="elementClick(element)"
          >
            {{ element.name }}
          </b-btn>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ElementsList',
  props: {
    categories: {
      type: Array,
      default: function() {
        return []
      },
      required: true
    },
    elements: {
      type: Array,
      default: function() {
        return []
      },
      required: true
    }
  },
  data() {
    return {
      selectedCategory: this.categories[0]
    }
  },
  methods: {
    elementClick(element) {
      this.$emit('elementClick', element)
    }
  }
}
</script>

<style lang="scss" scoped>
.elements-list {
  .element {
    margin-right: 5px;
    margin-top: 5px;
    height: 40px;
    width: 100px;
  }
}
</style>
