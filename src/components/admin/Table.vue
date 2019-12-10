<template>
  <div class="data-table">
    <b-row class="mb-3">
      <b-col class="pr-0" cols="6" sm="6" md="4" lg="4" xl="4">
        <b-input-group>
          <b-form-input v-model="search" placeholder="Search" />
          <b-input-group-append>
            <b-btn :disabled="!search" @click="search = ''">
              Clear
            </b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-col>

      <b-col class="pr-md-0 mt-2 mt-md-0 text-right text-md-left" cols="12" md="6" order="2" order-md="1">
        <b-btn v-if="commonButton" class="mb-3 mr-2" variant="success" @click="$emit('commonButtonClick')">
          Create {{ target }}
        </b-btn>

        <slot type="button"></slot>
      </b-col>

      <b-col cols="4" md="2" order="1" order-md="2" offset="2" offset-md="0">
        <b-form-select v-model="pagination.perPage" :options="pagination.pageOptions" />
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <div class="text-center">
          <b-spinner v-if="loading" variant="success" style="width: 3rem; height: 3rem;" />
        </div>

        <b-alert v-if="error" class="error" show="show" variant="danger">
          {{ error }}
        </b-alert>

        <b-table
          v-if="!loading"
          show-empty="show-empty"
          responsive="responsive"
          hover="hover"
          flex="flex"
          :items="data"
          :fields="fields"
          :current-page="pagination.currentPage"
          :per-page="pagination.perPage"
          :filter="search"
        >
          <template v-slot:cell></template>

          <template v-slot:cell(action)="row">
            <b-button-group size="sm">
              <b-btn v-if="editButton" variant="warning" size="sm" @click="$emit('editButtonClick', row)">
                <font-awesome-icon icon="edit" />
              </b-btn>

              <b-btn v-if="deleteButton" variant="danger" size="sm" @click="$emit('deleteButtonClick', row)">
                <font-awesome-icon icon="trash" />
              </b-btn>
            </b-button-group>
          </template>
        </b-table>

        <b-pagination
          v-model="pagination.currentPage"
          align="center"
          :total-rows="totalRows"
          :per-page="pagination.perPage"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default: () => [],
      required: false
    },
    fields: {
      type: Array,
      default: () => [],
      required: false
    },
    totalRows: {
      type: Number,
      default: 0,
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    },
    error: {
      type: String,
      default: '',
      required: false
    },
    target: {
      type: String,
      default: '',
      required: true
    },
    commonButton: {
      type: Boolean,
      default: true,
      required: false
    },
    editButton: {
      type: Boolean,
      default: true,
      required: false
    },
    deleteButton: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      search: '',
      pagination: {
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 25, 50]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
  transition: opacity 0.3s;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>
