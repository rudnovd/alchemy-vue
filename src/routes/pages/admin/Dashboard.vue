<template>
  <section class="section-dashboard">
    <section v-if="stats.state.isLoading" class="loading-section">
      <b-spinner variant="success" class="loading-spinner" />
    </section>

    <section v-if="stats.state.error && !stats.state.isLoading" class="error-section">
      <span>{{ stats.state.error.data }}</span>
    </section>

    <b-container v-show="!stats.state.error && !stats.state.isLoading">
      <b-row class="border-bottom">
        <b-col class="text-center border-bottom mb-2" cols="12">
          <h3>Users</h3>
        </b-col>

        <b-col class="mt-3 mt-lg-0" cols="12" sm="12" md="6" lg="4" xl="4">
          <b-card bg-variant="primary" text-variant="white">
            <b-row>
              <b-col class="text-center" cols="4" sm="4" md="4" lg="4" xl="4">
                <font-awesome-icon class="fa-4x" icon="user" />
              </b-col>

              <b-col cols="8" sm="8" md="8" lg="8" xl="8">
                <h4>Count:</h4>
                <h4>{{ stats.data.usersCount }}</h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-col class="mt-3 mt-lg-0" cols="12" sm="12" md="6" lg="4" xl="4">
          <b-card bg-variant="success" text-variant="white">
            <b-row>
              <b-col class="text-center" cols="4" sm="4" md="4" lg="4" xl="4">
                <font-awesome-icon class="fa-4x" icon="smile" />
              </b-col>
              <b-col cols="8" sm="8" md="8" lg="8" xl="8">
                <h4>Active:</h4>
                <h4>{{ stats.data.activeUsersCount }}</h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-col class="mt-3 mt-lg-0 mb-2" cols="12" sm="12" md="6" lg="4" xl="4">
          <b-card bg-variant="danger" text-variant="white">
            <b-row>
              <b-col class="text-center" cols="4" sm="4" md="4" lg="4" xl="4">
                <font-awesome-icon class="fa-4x" icon="user-slash" />
              </b-col>

              <b-col cols="8" sm="8" md="8" lg="8" xl="8">
                <h4>Banned:</h4>
                <h4>{{ stats.data.bannedUsersCount }}</h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="border-bottom mt-5">
        <b-col class="text-center border-bottom mb-2" cols="12">
          <h3>Elements</h3>
        </b-col>

        <b-col class="mt-3 mt-lg-0" cols="12" sm="12" md="6" lg="4" xl="4">
          <b-card bg-variant="primary" text-variant="white">
            <b-row>
              <b-col class="text-center" cols="4" sm="4" md="4" lg="4" xl="4">
                <font-awesome-icon class="fa-4x" icon="fire" />
              </b-col>

              <b-col cols="8" sm="8" md="8" lg="8" xl="8">
                <h4>Count:</h4>
                <h4>{{ stats.data.elementsCount }}</h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-col class="mt-3 mt-lg-0 mb-2" cols="12" sm="12" md="6" lg="4" xl="4">
          <b-card bg-variant="danger" text-variant="white">
            <b-row>
              <b-col class="text-center" cols="4" sm="4" md="4" lg="4" xl="4">
                <font-awesome-icon class="fa-4x" icon="eye-slash" />
              </b-col>
              <b-col cols="8" sm="8" md="8" lg="8" xl="8">
                <h4>Undiscovered:</h4>
                <h4>{{ stats.data.undiscoveredElementsCount }}</h4>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      stats: 'data/stats'
    })
  },
  mounted() {
    this.getStats()
  },
  methods: {
    ...mapActions({
      getStats: 'data/getStats'
    })
  }
}
</script>

<style lang="scss" scoped>
.section-dashboard {
  height: 100%;
  padding-top: 10px;
}
</style>
