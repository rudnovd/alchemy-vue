<template lang='pug'>
  b-row.justify-content-md-center.mb-5.mt-5
    b-col.loading(cols="12" md="auto")
      breeding-rhombus-spinner(v-if='size == "small"' :animation-duration="2000" :size="25" color="#00CB31")
      breeding-rhombus-spinner(v-if='size == "medium"' :animation-duration="2000" :size="50" color="#00CB31")
      breeding-rhombus-spinner(v-if='size == "large"' :animation-duration="2000" :size="75" color="#00CB31")
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners'

export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'medium'
    }
  },
  components: {
    BreedingRhombusSpinner
  },
  created () {
    this.size.toLowerCase()
  }
}
</script>
