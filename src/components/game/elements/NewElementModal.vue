<template>
  <b-modal v-model="showModal" size="md" title="New element opened" hide-footer="hide-footer" centered="centered">
    <b-row class="new-element">
      <b-col cols="12" class="image">
        <b-img
          :src="`/images/elements/${lastOpenedElement.name}.png`"
          width="64"
          height="64"
          :alt="lastOpenedElement.name"
          @error="setBaseIcon"
        />
      </b-col>

      <b-col cols="12" class="name">
        <h3>{{ lastOpenedElement.name }}</h3>
      </b-col>

      <b-col v-if="lastOpenedElement.description" cols="12" class="description">
        <span>{{ lastOpenedElement.description }}</span>
      </b-col>

      <b-col cols="12" class="button">
        <b-btn variant="success" @click="closeModal">Continue</b-btn>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
      lastOpenedElement: 'game/lastOpenedElement'
    })
  },
  mounted() {
    this.$root.$on('newElementModalShow', () => {
      this.showModal = true
    })
  },
  methods: {
    ...mapActions({
      setLastOpenedElement: 'game/setLastOpenedElement'
    }),
    closeModal() {
      this.setLastOpenedElement({})
      this.showModal = false
    },
    setBaseIcon(event) {
      event.target.src = '/images/elements/Base.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.new-element {
  text-align: center;

  .image {
    margin-top: 20px;
    margin-bottom: 15px;
  }

  .name {
    margin-bottom: 30px;
  }
}
</style>
