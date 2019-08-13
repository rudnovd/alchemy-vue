<template>
  <div class='data-table'>
    <b-row class='mb-3'>
      <b-col cols='4'>
        <b-input-group>
          <b-form-input v-model='search' placeholder='Search'/>
          <b-input-group-append>
            <b-btn :disabled='!search' @click='search = null'>
              Clear
            </b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-col>

     <b-col cols='4' sm='3' md='2' lg='2' xl='2'>
        <b-btn
          class='mb-3'
          v-if='commonButton'
          variant='success'
          @click='commonButtonClick'
        >
          Create {{ target }}
        </b-btn>
      </b-col>

      <slot type='button'></slot>

      <b-col cols='4' sm='3' md='2' lg='2' xl='2' offset-md='4'>
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
          v-if='!loading &amp;&amp; !error'
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
          <template slot='action' slot-scope='actionRow'>
            <b-button-group size='sm'>
              <b-btn
                class='mr-1'
                v-if='editButton'
                variant='warning'
                size='sm'
                @click='editButtonClick(actionRow)'
              >
                <font-awesome-icon icon='edit'/>
              </b-btn>

              <b-btn
                v-if='deleteButton'
                variant='danger'
                size='sm'
                @click='deleteButtonClick(actionRow)'
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
      default: []
    },
    fields: {
      value: Array,
      default: []
    },
    totalRows: {
      value: Number,
      default: 0
    },
    loading: {
      value: Boolean,
      default: false
    },
    error: String,
    target: {
      value: String,
      default: ''
    },
    commonButton: {
      value: Boolean,
      default: true
    },
    editButton: {
      value: Boolean,
      default: true
    },
    deleteButton: {
      value: Boolean,
      default: true
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
