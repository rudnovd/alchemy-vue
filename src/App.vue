<template>
  <div id='app'>
    <b-navbar class='mb-3' type='dark' variant='dark'>
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
