<template>
  <body>
    <noscript>
      <strong>
        We're sorry but public doesn't work properly without JavaScript enabled. Please enable it to continue.
      </strong>
    </noscript>

    <header>
      <b-navbar type="dark" variant="dark">
        <Navbar />
      </b-navbar>
    </header>

    <main>
      <router-view :key="$route.fullPath" />
    </main>
  </body>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar: Navbar
  }
}
</script>
