<template lang='pug'>
  .elements
    .loading(v-if="loading") Loading...
    .error(v-if="error") {{ error }}
    .content
      b-table(responsive hover :items='table.data.elements' :fields="table.fields")
      //- b-pagination(align="center" :total-rows="table.pagination.rows" v-model="table.pagination" :per-page="2")
</template>

<script>
import axios from 'axios'

export default {
  name: 'Elements',
  data () {
    return {
      loading: false,
      error: null,

      table: {
        fields: [
          {
            key: 'category',
            sortable: true
          },
          {
            key: 'name',
            sortable: true
          }
        ],
        data: {
          elements: []
        }
        // pagination: {
        //   rows: 4,
        //   currentPage: 1
        // }
      }
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = null
      this.loading = true
      // replace `getPost` with your data fetching util / API wrapper
      const vm = this
      axios.get('/api/elements')
        .then(function (response) {
          vm.loading = false
          let d = response.data.response
          vm.table.data.elements = d
          // for (let i = 0; i <= 55; i++) {
          //   vm.table.data.elements.push(d[0])
          // }
        })
        .catch(function (error) {
          vm.error = true
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
