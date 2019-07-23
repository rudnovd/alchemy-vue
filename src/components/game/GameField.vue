<template lang='pug'>
b-col(class='game-field' cols='12')
  slot
</template>

<script>

</script>

<style lang='scss' scoped>
.game-field {
  position: relative;
  box-shadow: 0 0 5px color('alchemy-light-green');
  background-color: color('white');
  min-height: 60vh;
  min-width: 100%;
  max-width: inherit;
}
</style>
