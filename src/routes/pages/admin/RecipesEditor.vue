<template lang='pug'>
  b-container
    b-row: b-col(cols='12')
      .jumbotron
        h1 AdminRecipesEditor
</template>

<script>
export default {
  name: 'AdminRecipesEditor',

  beforeRouteEnter (to, from, next) {
    // Set page title
    document.title = to.meta.title

    next()
  }
}
</script>
