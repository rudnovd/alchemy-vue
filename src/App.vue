<template>
  <div id='app'>
    <b-navbar type='dark' variant='dark'>
      <Navbar/>
    </b-navbar>

    <router-view :key='$route.fullPath'/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar: Navbar
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
</style>
