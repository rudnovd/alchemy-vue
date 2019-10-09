<template>
  <b-col class='elements-list mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0' cols='12' sm='12' md='12' lg='8' xl='8'>
    <b-card no-body='no-body'>
      <b-tabs
        card='card'
        pills='pills'
        vertical='vertical'
        small='small'
        nav-wrapper-class='w-30'
      >
        <b-tab
          v-for='category in categories'
          :title='category.name'
          :key='category._id'
          @click='selectedCategory = category'
        >
          <slot></slot>

          <b-btn
            class='element'
            size='sm'
            variant='outline-success'
            v-for='element in selectedCategory.elements'
            :key='element._id'
            @click='elementClick(element)'
          >
            {{ element.name }}
          </b-btn>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-col>
</template>

<script>
export default {
  props: {
    categories: {
      value: Array,
      default: [],
      required: true
    },
    elements: {
      value: Array,
      default: [],
      required: true
    }
  },
  data () {
    return {
      selectedCategory: this.categories[0]
    }
  },
  methods: {
    elementClick (element) {
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
