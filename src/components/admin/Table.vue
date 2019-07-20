<template lang='pug'>
div(class='data-table')
  b-row(class='mb-3')
    //- Search input
    b-col(cols='4')
      b-input-group
        b-form-input(v-model='search' placeholder='Search')
        b-input-group-append
          b-btn(:disabled='!search' @click='search = null')
            | Clear

    //- Create element modal button
    b-col(cols='4' sm='3' md='2' lg='2' xl='2')
      b-btn(class='mb-3' variant='success' @click='commonButtonClick')
        | Create {{ target }}

    //- Select records per page
    b-col(cols='4' sm='3' md='2' lg='2' xl='2' offset-md='4')
      b-form-select(:options='pagination.pageOptions' v-model='pagination.perPage')

  b-row
    b-col(cols='12')
      //- Loading section
      loading-spinner(size='large' v-if='loading')

      //- Error section
      b-row(class='justify-content-md-center' v-if='error')
        b-col(class='error' cols='12' md='auto')
          b-alert(show variant='danger')
            | {{ error }}

      //- Table with data
      b-table(
        v-if='!loading && !error'
        show-empty
        responsive
        hover
        flex
        fixed=false
        :items='data'
        :fields='fields'
        :current-page='pagination.currentPage'
        :per-page='pagination.perPage'
        :filter='search'
      )
        template(slot='action' slot-scope='actionRow')
          b-button-group(size='sm')
            //- Edit element button
            b-btn(class='mr-1' variant='warning' size='sm' @click='editButtonClick(actionRow)')
              font-awesome-icon(icon='edit')

            //- Delete element button
            b-btn(variant='danger' size='sm' @click='deleteButtonClick(actionRow)')
              font-awesome-icon(icon='trash')

        //- Pagination for table
        b-pagination(
          align='center'
          :total-rows='totalRows'
          v-model='pagination.currentPage'
          :per-page='pagination.perPage'
        )
</template>

<script>
export default {
  props: {
    data: Array,
    fields: Array,
    totalRows: Number,
    loading: Boolean,
    error: String,
    target: String
  },
  data () {
    return {
      search: null,

      pagination: {
        perPage: 10,
        currentPage: 1,
        pageOptions: [5, 10, 25, 50]
      }
    }
  },
  methods: {
    commonButtonClick () {
      this.$emit('commonButtonClick')
    },
    editButtonClick (actionRow) {
      this.$emit('editButtonClick', actionRow)
    },
    deleteButtonClick (actionRow) {
      this.$emit('deleteButtonClick', actionRow)
    }
  }
}
</script>
