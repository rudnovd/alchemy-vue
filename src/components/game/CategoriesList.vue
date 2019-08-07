<template lang='pug'>
b-col(class='elements-categories' cols='12' sm='12' md='2' lg='2' xl='2')
  p(class='text-center') Categories
  slot
</template>

<script>

</script>

<style lang='scss' scoped>
@media screen and (max-width: 768px) {
  .elements-categories {
    overflow: auto;
    display: inline-block;
    float: none;
    margin-bottom: 15px;
    max-width: 300px;
    max-height: 200px;
  }
}

@media screen and (min-width: 769px) {
  .elements-categories {
    max-height: 65vh;
    overflow: auto
  }
}
</style>
