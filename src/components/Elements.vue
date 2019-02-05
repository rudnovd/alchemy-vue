<template lang='pug'>
  .elements
    .content

      b-row(class="mb-2")
        //- Search input
        b-col.mr-auto(md="4")
          b-input-group
            b-form-input(v-model="table.search.filter" placeholder="Search")
            b-input-group-append
              b-btn(:disabled="!table.search.filter" @click="table.search.filter = ''") Clear

        //- Select records per page
        b-col(md="2")
          b-form-select(:options="table.pagination.pageOptions" v-model="table.pagination.perPage")

      //- Loading section
      b-row.justify-content-md-center.mt-3.mb-3(v-if="loading")
        b-col.loading(cols="12" md="auto")
          half-circle-spinner(:animation-duration="1000" :size="50" color="#41B460")

      //- Error section
      b-row.justify-content-md-center.mt-3.mb-3(v-if="error")
        b-col.error(cols="12" md="auto") {{ error }}

      //- Table with data
      b-table(v-if='!loading'
              show-empty
              responsive
              hover
              flex
              fixed="true"
              :items='table.data.elements'
              :fields="table.fields"
              :current-page="table.pagination.currentPage"
              :per-page="table.pagination.perPage"
              :filter="table.search.filter"
              @filtered="onFiltered"
              @row-clicked="showRowDetails")
        template(slot="row-details" slot-scope="row")
          b-card
            b-row(class="mb-2")
              b-col(sm="3" class="text-sm-right") Test

      //- Pagination for table
      b-pagination(
        align="center"
        :total-rows="table.data.elements.length"
        v-model="table.pagination.currentPage"
        :per-page="table.pagination.perPage")
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'

import { getElements } from '@/assets/js/api.js'

export default {
  name: 'Elements',
  components: {
    HalfCircleSpinner
  },
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
        },
        pagination: {
          perPage: 10,
          currentPage: 1,
          pageOptions: [5, 10, 25, 50]
        },
        search: {
          filter: null
        }
      },
      data: {
        categories: {
          categories: [],
          options: []
        }
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

      getElements().then(response => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.response.length; i++) {
            response.data.response[i]._showDetails = false
          }

          this.table.data.elements = response.data.response

          this.loading = false
        }
      })
    },
    showRowDetails (row) {
      row._showDetails = !row._showDetails
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style scoped lang="scss">

</style>
