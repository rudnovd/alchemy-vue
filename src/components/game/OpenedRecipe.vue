<template lang='pug'>
b-btn(
  class='mr-2'
  :id='`popover-${ recipeName }`'
  variant='info'
) {{ recipeName }}
  b-popover(
    :target='`popover-${ recipeName }`'
    :show.sync='showPopover'
    triggers='hover'
    placement='top'
    :content='recipeName'
  )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    recipeName: String
  },
  computed: {
    ...mapGetters({
      openedRecipes: 'game/selectedCategory'
    })
  },
  data () {
    return {
      showPopover: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
