<template lang='pug'>
b-col(class='game-field' cols='12' sm='12' md='9' lg='9' xl='9')
  slot
</template>

<script>

</script>

<style lang='scss' scoped>
.game-field {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  box-shadow: 0 0 5px rgb(170, 170, 170);
  background-color: color('white');
  min-height: 85vh;
}
</style>
