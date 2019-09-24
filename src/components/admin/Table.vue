<template>
  <div class='data-table'>
    <b-row class='mb-3'>
      <b-col class='pr-0' cols='6' sm='6' md='4' lg='4' xl='4'>
        <b-input-group>
          <b-form-input v-model='search' placeholder='Search'/>
          <b-input-group-append>
            <b-btn :disabled='!search' @click='search = ""'>
              Clear
            </b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-col>

     <b-col class='pr-xl-0 pr-lg-0 pr-md-0 mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 text-right text-sm-right text-md-left text-lg-left text-xl-left' cols='12' sm='12' md='6' lg='6' xl='6' order='2' order-sm='2' order-md='1' order-lg='1' order-xl='1'>
        <b-btn
          class='mb-3 mr-2'
          v-if='commonButton'
          variant='success'
          @click='commonButtonClick'
        >
          Create {{ target }}
        </b-btn>

        <slot type='button'></slot>
      </b-col>

      <b-col cols='4' sm='4' md='2' lg='2' xl='2' order='1' order-sm='1' order-md='2' order-lg='2' order-xl='2' offset='2' offset-sm='2' offset-md='0' offset-lg='0' offset-xl='0'>
        <b-form-select :options='pagination.pageOptions' v-model='pagination.perPage'/>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols='12'>
        <div class='text-center'>
          <b-spinner
            v-if='loading'
            variant='success'
            style='width: 3rem; height: 3rem;'
          />
        </div>

        <b-alert class='text-center' v-if='error' show='show' variant='danger'>
          {{ error }}
        </b-alert>

        <b-table
          v-if='!loading && !error'
          show-empty='show-empty'
          responsive='responsive'
          hover='hover'
          flex='flex'
          :items='data'
          :fields='fields'
          :current-page='pagination.currentPage'
          :per-page='pagination.perPage'
          :filter='search'
        >
          <template v-slot:cell(action)='row'>
            <b-button-group size='sm'>
              <b-btn
                v-if='editButton'
                variant='warning'
                size='sm'
                @click='editButtonClick(row)'
              >
                <font-awesome-icon icon='edit'/>
              </b-btn>

              <b-btn
                v-if='deleteButton'
                variant='danger'
                size='sm'
                @click='deleteButtonClick(row)'
              >
                <font-awesome-icon icon='trash'/>
              </b-btn>
            </b-button-group>
          </template>

          <b-pagination
            align='center'
            :total-rows='totalRows'
            v-model='pagination.currentPage'
            :per-page='pagination.perPage'
          />
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      value: Array,
      default: [],
      required: false
    },
    fields: {
      value: Array,
      default: [],
      required: false
    },
    totalRows: {
      value: Number,
      default: 0,
      required: false
    },
    loading: {
      value: Boolean,
      default: false,
      required: false
    },
    error: {
      value: String,
      default: '',
      required: false
    },
    target: {
      value: String,
      default: '',
      required: true
    },
    commonButton: {
      value: Boolean,
      default: true,
      required: false
    },
    editButton: {
      value: Boolean,
      default: true,
      required: false
    },
    deleteButton: {
      value: Boolean,
      default: true,
      required: false
    }
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
