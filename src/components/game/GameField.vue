<template>
  <b-col
    class='game-field pl-0 pr-0'
    cols='12'
    sm='12'
    md='9'
    lg='10'
    xl='10'
  >
    <slot></slot>
  </b-col>
</template>

<script>
</script>

<style lang='scss'>
.game-field {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  background-color: rgb(236, 240, 241);
}
</style>
