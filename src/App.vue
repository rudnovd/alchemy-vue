<template>
  <body>
    <noscript>
      <strong>
        We're sorry but Alchemy game doesn't work properly without JavaScript enabled. Please enable it to continue.
      </strong>
    </noscript>

    <header>
      <TheNavbar />
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
