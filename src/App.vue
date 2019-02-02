<template lang="pug">
  #app
    Navbar
    .container
      router-view(:key="$route.fullPath")
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar: Navbar
  }
}
</script>

<style lang="scss">
@import '@/assets/css/main.scss';
</style>
