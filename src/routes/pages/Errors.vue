<template>
  <section class="section-error">
    <b-container>
      <b-row>
        <b-col cols="12">
          <div class="jumbotron">
            <h1>{{ error.name }}</h1>

            <p>{{ error.text }}</p>

            <router-link to="/">
              Back to the main page
            </router-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'Errors',
  props: {
    error: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: 'Page not found',
          text: 'You may have entered the wrong address or the page was deleted.'
        }
      },
      validator(object) {
        return object.name && object.text
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-error {
  margin-top: 10px;
}
</style>
