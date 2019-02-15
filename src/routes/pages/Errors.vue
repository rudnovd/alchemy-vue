<template lang="pug">
  b-container
    b-row: b-col(cols='12')
      .jumbotron
          h1 Страница не найдена!
</template>

<script>
export default {
  name: 'Errors',

  beforeRouteEnter (to, from, next) {
    // Set page title
    document.title = to.meta.title

    next()
  }
}
</script>
