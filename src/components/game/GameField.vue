<template>
  <b-col
    class='game-field pl-4 pl-sm-4 pl-md-4 pl-lg-0 pl-xl-0 pr-4 pr-sm-4 pr-md-4 pr-lg-0 pr-xl-0'
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

<style lang='scss' scoped>
.game-field {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  background-color: rgb(236, 240, 241);
}

@media screen and (max-width: 768px) {
  .game-field {
    height: 70vh;
  }
}

@media screen and (min-width: 768px) {
  .game-field {
    height: 80vh;
  }
}
</style>
