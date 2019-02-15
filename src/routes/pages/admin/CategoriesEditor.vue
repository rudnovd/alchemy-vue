<template lang='pug'>
  b-container
    b-row: b-col(cols='12')
      .jumbotron
        h1 AdminCategoriesEditor
</template>

<script>
export default {
  name: 'AdminCategoriesEditor',

  beforeRouteEnter (to, from, next) {
    // Set page title
    document.title = to.meta.title

    next()
  }
}
</script>
