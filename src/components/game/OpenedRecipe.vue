<template lang='pug'>
b-col(class='opened-recipe-col' cols='12')
  b-row(class='row align-items-center')
    b-col(cols='6')
      p {{ recipe.result.name }}
      p descrption
    b-col(class="text-center" cols='6')
      | {{ recipe.recipe[0].name }} + {{ recipe.recipe[1].name }}
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
.opened-recipe-col {
  background-color: rgb(240, 240, 240);
  display: inline-block;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
