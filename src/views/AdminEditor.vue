<template lang='pug'>
  .jumbotron
    CreateNewElement.mb-3
    Elements
</template>

<script>
import Elements from '@/components/Elements.vue'

import CreateNewElement from '@/components/AdminEditor/CreateNewElement.vue'

export default {
  name: 'AdminEditor',
  components: {
    Elements,
    CreateNewElement
  }
}
</script>
