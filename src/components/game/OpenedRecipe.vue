<template lang='pug'>
div(class='opened-recipe')
  b-row(class='row align-items-center')
    b-col(cols='5')
      b-row
        b-col(cols='12')
          | {{ recipe.result.name }}
        b-col(cols='12')
          | descrption
    b-col(class="text-right pr-0" cols='3')
      strong {{ recipe.recipe[0].name }}
    b-col(class="text-center pl-0 pr-0" cols='1')
      | +
    b-col(class="text-left pl-0" cols='3')
      strong {{ recipe.recipe[1].name }}
</template>

<script>
export default {
  props: {
    recipe: Object
  },
  data () {
    return {
      showPopover: false
    }
  }
}
</script>

<style lang="scss" scoped>
.opened-recipe {

}
</style>
