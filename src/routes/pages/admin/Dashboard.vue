<template lang='pug'>
  b-container
    b-row: b-col(cols='12')
      .jumbotron
        h1 Admin dashboard
</template>

<script>
export default {
  name: 'AdminDashboard',

  beforeRouteEnter (to, from, next) {
    // Set page title
    document.title = to.meta.title

    next()
  }
}
</script>
