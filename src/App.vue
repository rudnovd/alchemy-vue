<template>
  <body>
    <noscript>
      <strong>
        We're sorry but public doesn't work properly without JavaScript enabled. Please enable it to continue.
      </strong>
    </noscript>

    <header>
      <b-navbar type="dark" variant="dark">
        <TheNavbar />
      </b-navbar>
    </header>

    <main>
      <transition name="fade">
        <router-view :key="$route.fullPath" />
      </transition>
    </main>
  </body>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  components: {
    TheNavbar
  }
}
</script>
