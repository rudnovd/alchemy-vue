<template lang='pug'>
b-col(class='game-field' cols='9')
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
  box-shadow: 0 0 5px color('alchemy-light-green');
  background-color: color('white');
  min-height: 85vh;
}
</style>
