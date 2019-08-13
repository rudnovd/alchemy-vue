<template>
  <b-container>
    <Table
      :data='elements'
      :fields='fields'
      :totalRows='totalRows'
      :loading='loading.elements'
      :error='errors.elements'
      target='element'
      @commonButtonClick='modals.create = true'
      @editButtonClick='beforeEditElement'
      @deleteButtonClick='beforeDeleteElement'
    >
      <slot type='button'>
        <b-col cols='4' sm='3' md='2' lg='2' xl='2'>
          <b-btn class='mb-3' variant='success' @click='commonButtonClick'>
            Create category
          </b-btn>
        </b-col>
      </slot>
    </Table>

    <b-modal
      v-model='modals.create'
      title='Create new element'
      size='xl'
      hide-header-close='hide-header-close'
      ok-title='Create'
      ok-variant='success'
      :ok-disabled='loading.createElement'
      :cancel-disabled='loading.createElement'
      cancel-variant='danger'
      @ok='createElement'
      @hidden='afterCreateElement'
    >
      <b-row>
        <b-col cols='4'>
          <b-row>
            <b-col cols='12'>
              <b-form-group :label-cols='3' label='Name:' label-for='createElementName'>
                <b-form-input
                  id='createElementName'
                  type='text'
                  v-model='create.name'
                  required='required'
                  trim='trim'
                  placeholder='Fire'
                  :state='validateName(create.name, elements)'
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols='12'>
              <b-form-group :label-cols='3' label='Category:' label-for='createElementCategory'>
                <b-form-select
                  id='createElementCategory'
                  v-if='!newCategory.active'
                  type='text'
                  v-model='create.categoryId'
                  required='required'
                  :state='validateNull(create.categoryId)'
                >
                  <option
                    v-for='category in categories'
                    :key='category._id'
                    :value='category._id'
                  >
                    {{ category.name }}
                  </option>
                </b-form-select>

                <b-form-input
                  id='createElementCategory'
                  v-if='newCategory.active'
                  type='text'
                  v-model='newCategory.name'
                  required='required'
                  trim='trim'
                  placeholder='Elements'
                  :state='validateName(newCategory.name, categories)'
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if='newCategory.active === false'>
            <b-col cols='12'>
              <b-btn
                class='float-right'
                variant='light'
                size='sm'
                @click='newCategory.active = true; create.categoryId = null'
              >
                <font-awesome-icon icon='plus' />New category
              </b-btn>
            </b-col>
          </b-row>

          <b-row v-if='newCategory.active === true'>
            <b-col cols='12'>
              <b-btn
                class='float-right'
                variant='light'
                size='sm'
                @click='newCategory.active = false; newCategory.name = null'
              >
                <font-awesome-icon icon='clipboard' />Choose category
              </b-btn>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols='8'>
          <b-card no-body='no-body'>
            <b-tabs
              card='card'
              pills='pills'
              vertical='vertical'
              small='small'
              nav-wrapper-class='w-25'
            >
              <b-tab
                v-for='category in categories'
                :title='category.name'
                :key='category._id'
              >
                <b-btn
                  class='mr-2 mb-2'
                  size='sm'
                  variant='outline-success'
                  v-for='element in elements'
                  :key='element._id'
                  v-if='element.category === category.name'
                  @click='create.name = element.name'
                >
                  {{ element.name }}
                </b-btn>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>

        <b-col cols='12' v-if='errors.createElement'>
          <b-alert show='show' variant='danger'>
            {{ errors.createElement }}
          </b-alert>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      v-model='modals.edit'
      title='Edit element'
      size='xl'
      hide-header-close='hide-header-close'
      ok-title='Save'
      ok-variant='success'
      :ok-disabled='loading.editElement'
      :cancel-disabled='loading.editElement'
      cancel-variant='danger'
      @ok='editElement'
      @hidden='afterEditElement'
    >
      <b-row>
        <b-col cols='4'>
          <b-form-group :label-cols='3' label='Name:' label-for='editElementName'>
            <b-form-input
              id='editElementName'
              v-model='edit.name'
              type='text'
              required='required'
              trim='trim'
            />
          </b-form-group>

          <b-form-group :label-cols='3' label='Category:' label-for='editCategory'>
            <b-form-select
              id='editCategory'
              type='text'
              v-model='edit.categoryId'
              required='required'
            >
              <option v-for='category in categories' :key='category._id' :value='category._id'>
                {{ category.name }}
              </option>
            </b-form-select>
          </b-form-group>

          <b-form-group :label-cols='3' label='Description:' label-for='editDescription'>
            <b-form-textarea
              id='editDescription'
              v-model='edit.description'
              placeholder='Description'
              rows='3'
              required='required'
              trim='trim'
              no-resize='no-resize'
            />
          </b-form-group>
        </b-col>

        <b-col cols='8'>
          <b-card no-body='no-body'>
            <b-tabs
              card='card'
              pills='pills'
              vertical='vertical'
              small='small'
              nav-wrapper-class='w-25'
            >
              <b-tab v-for='category in categories' :title='category.name' :key='category._id'>
                <b-btn
                  class='mr-2 mb-2'
                  size='sm'
                  variant='outline-success'
                  v-for='element in elements'
                  :key='element._id'
                  v-if='element.category === category.name'
                  @click='edit.name = element.name'
                >
                  {{ element.name }}
                </b-btn>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      v-model='modals.delete'
      size='md'
      hide-header-close='hide-header-close'
      ok-title='Delete'
      ok-variant='success'
      :ok-disabled='loading.deleteElement'
      :cancel-disabled='loading.deleteElement'
      cancel-variant='danger'
      hide-header='hide-header'
      @ok='deleteElement'
      @hidden='afterDeleteElement'
    >
      <b-row class='text-center'>
        <b-col cols='12' v-if='!errors.deleteElement'>
          <h4>
            Delete element
            <strong class='text-danger'>
              {{ this.delete.name }}
            </strong>
            ?
          </h4>
        </b-col>

        <b-col cols='12' v-if='errors.deleteElement'>
          <b-alert show='show' variant='danger'>
            {{ errors.deleteElement }}
          </b-alert>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
import { getElements, postElement, putElement, deleteElement } from '@/js/api/elements'

import { getCategories, postCategory } from '@/js/api/categories'

import Table from '@/components/admin/Table'

export default {
  components: {
    Table
  },
  created () {
    this.getElements()
    this.getCategories()
  },
  watch: {
    // call again the method if the route changes
    $route: 'getElements'
  },
  data () {
    return {
      elements: [],
      categories: [],

      totalRows: 0,
      fields: [
        {
          key: 'category',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'name',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'recipe',
          label: 'Recipe',
          class: 'align-middle text-center',
          sortable: false
        },
        {
          key: 'description',
          label: 'Description',
          class: 'align-middle text-center',
          sortable: false
        },
        {
          key: 'action',
          label: 'Action',
          class: 'align-middle text-center',
          sortable: false
        }
      ],

      loading: {
        elements: false,
        categories: false,

        createElement: false,
        editElement: false,
        deleteElement: false
      },

      errors: {
        elements: null,
        categories: null,

        createElement: null,
        editElement: null,
        deleteElement: null
      },

      modals: {
        create: false,
        edit: false,
        delete: false
      },

      create: {
        name: null,
        categoryId: null
      },

      delete: {
        _id: null,
        name: null
      },

      edit: {
        _id: null,
        name: null,
        description: null,
        categoryId: null
      },

      newCategory: {
        active: false,
        name: null
      }
    }
  },
  methods: {
    getElements () {
      this.errors.elements = null
      this.loading.elements = true
      getElements().then(response => {
        this.loading.elements = false
        if (response.status === 200) {
          this.elements = response.data.response
          this.totalRows = response.data.response.length // Total rows for pagination
        } else {
          this.data.table.error = response.data
        }
      })
    },
    getCategories () {
      this.errors.categories = null
      this.loading.categories = true
      getCategories().then(response => {
        this.loading.categories = false
        if (response.status === 200) {
          this.categories = response.data.response
        } else {
          this.errors.categories = response.data
        }
      })
    },

    beforeCreateElement () {
      this.modals.create = true
    },
    createElement (event) {
      if (event) {
        event.preventDefault()
      }

      if (this.validateName(this.create.name, this.elements) === false) {
        return
      }

      this.loading.createElement = true
      if (!this.newCategory.name) {
        postElement(this.create.name, this.create.categoryId).then(response => {
          this.loading.createElement = false
          if (response.status === 201) {
            this.modals.create = false
            this.getElements()
            this.getCategories()
          } else {
            this.errors.createElement = response.data
          }
        })
      } else {
        postCategory(this.newCategory.name).then(response => {
          this.loading.createElement = false
          if (response.status === 201) {
            this.create.categoryId = response.data.response._id
            this.newCategory.name = null
            this.createElement()
          } else {
            this.errors.createElement = response.data
          }
        })
      }
    },
    afterCreateElement () {
      this.modals.create = false
      this.create.name = null
      this.create.categoryId = null
    },

    beforeEditElement (row) {
      this.modals.edit = true
      this.edit._id = row.item._id
      this.edit.name = row.item.name
      this.edit.description = row.item.description

      for (let i = 0; i < this.categories.length; i++) {
        if (row.item.category === this.categories[i].name) {
          this.edit.categoryId = this.categories[i]._id
        }
      }
    },
    editElement (event) {
      event.preventDefault()
      this.loading.editElement = true
      putElement(this.edit._id, this.edit.name, this.edit.description, this.edit.categoryId).then(response => {
        this.loading.editElement = false
        if (response.status === 200) {
          this.modals.edit = null
          this.getElements()
        } else {
          this.errors.editElement = response.data
        }
      })
    },
    afterEditElement () {
      this.modals.edit = false
      this.edit._id = null
      this.edit.name = null
      this.edit.description = null
      this.edit.categoryId = null
    },

    beforeDeleteElement (row) {
      this.modals.delete = true
      this.delete._id = row.item._id
      this.delete.name = row.item.name
    },
    deleteElement (event) {
      event.preventDefault()
      this.loading.deleteElement = true
      deleteElement(this.delete._id).then(response => {
        this.loading.deleteElement = false
        if (response.status === 200) {
          this.modals.delete = false
          this.getElements()
        } else {
          this.errors.deleteElement = response.data
        }
      })
    },
    afterDeleteElement () {
      this.modals.delete = false
      this.errors.deleteElement = null
      this.delete._id = null
      this.delete.name = null
    },

    validateName (name, inObject) {
      if (!name || !inObject) {
        return null
      }

      for (let i in inObject) {
        if (name === inObject[i].name || name === inObject[i].name.toLowerCase()) {
          return false
        }
      }
      return true
    },
    validateNull (object) {
      if (object) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
