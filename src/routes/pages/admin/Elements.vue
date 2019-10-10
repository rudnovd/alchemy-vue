<template>
  <section class='section-elements'>
    <b-container>
      <Table
        :data='elements.data'
        :fields='fields'
        :totalRows='totalRows'
        :loading='elements.state.isLoading && elements.state.method === "GET"'
        :error='elements.state.error'
        target='element'
        @commonButtonClick='modals.create = true'
        @editButtonClick='beforeEditElement'
        @deleteButtonClick='beforeDeleteElement'
      >
        <slot type='button'>
          <b-btn class='mb-3' variant='success' @click='beforeCreateCategory'>
            Create category
          </b-btn>
        </slot>
      </Table>

      <b-modal
        v-model='modals.create'
        title='Create new element'
        size='xl'
        hide-header-close='hide-header-close'
        ok-title='Create'
        ok-variant='success'
        cancel-variant='danger'
        :ok-disabled='elements.state.isLoading && elements.state.method === "POST"'
        :cancel-disabled='elements.state.isLoading && elements.state.method === "POST"'
        @ok='elementCreateAction'
        @hidden='afterCreateElement'
      >
        <b-row>
          <b-col cols='12' sm='12' md='12' lg='4' xl='4'>
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
                    :state='validateName(create.name, elements.data)'
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
                    v-model='create.category'
                    required='required'
                    :state='validateNull(create.category._id)'
                  >
                    <option v-for='category in categories.data' :key='category._id' :value='category'>
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
                    :state='validateName(newCategory.name, categories.data)'
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
                  @click='newCategory.active = true; create.category.name = ""; create.category._id = ""'
                >
                  <font-awesome-icon icon='plus' /> New category
                </b-btn>
              </b-col>
            </b-row>

            <b-row v-if='newCategory.active === true'>
              <b-col cols='12'>
                <b-btn class='float-right' variant='light' size='sm' @click='newCategory.active = false; newCategory.name = null'>
                  <font-awesome-icon icon='clipboard' />Choose category
                </b-btn>
              </b-col>
            </b-row>
          </b-col>

           <b-col class='mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0' cols='12' sm='12' md='12' lg='8' xl='8'>
              <ElementsList
                :elements='elements.data'
                :categories='categories.data'
                @elementClick='createElementClick'
              />
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
        cancel-variant='danger'
        :ok-disabled='elements.state.isLoading && elements.state.method === "PUT"'
        :cancel-disabled='elements.state.isLoading && elements.state.method === "PUT"'
        @ok='elementEditAction'
        @hidden='afterEditElement'
      >
        <b-row>
          <b-col cols='12' sm='12' md='12' lg='4' xl='4'>
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
                v-model='edit.category'
                required='required'
              >
                <option v-for='category in categories.data' :key='category._id' :value='{ _id: category._id, name: category.name }'>
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

          <b-col class='mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0' cols='12' sm='12' md='12' lg='8' xl='8'>
            <ElementsList
              :elements='elements.data'
              :categories='categories.data'
            />
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        v-model='modals.remove'
        size='md'
        hide-header-close='hide-header-close'
        ok-title='Delete'
        ok-variant='success'
        :ok-disabled='elements.state.isLoading && elements.state.method === "DELETE"'
        :cancel-disabled='elements.state.isLoading && elements.state.method === "DELETE"'
        cancel-variant='danger'
        hide-header='hide-header'
        @ok='elementDeleteAction'
        @hidden='afterDeleteElement'
      >
        <b-row class='text-center'>
          <b-col cols='12'>
            <h4>Delete element <strong class='text-danger'>{{ this.remove.name }}</strong>?</h4>
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        v-model='modals.createCategory'
        title='Create new category'
        size='xl'
        hide-header-close='hide-header-close'
        ok-title='Create'
        ok-variant='success'
        cancel-variant='danger'
        :ok-disabled='categories.state.isLoading && elements.state.method === "POST"'
        :cancel-disabled='categories.state.isLoading && elements.state.method === "POST"'
        @ok='createCategory'
        @hidden='afterCreateCategory'
      >
        <b-row>
          <b-col cols='12' sm='12' md='12' lg='4' xl='4'>
            <b-row>
              <b-col cols='12'>
                <b-form-group :label-cols='3' label='Name:' label-for='createCategoryName'>
                  <b-form-input
                    id='createCategoryName'
                    type='text'
                    v-model='createCategoryData.name'
                    required='required'
                    trim='trim'
                    placeholder='Elements'
                    :state='validateName(createCategoryData.name, categories.data)'
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>

          <b-col class='mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0' cols='12' sm='12' md='12' lg='8' xl='8'>
            <ElementsList
              :categories='categories.data'
              :elements='elements.data'
            />
          </b-col>
        </b-row>
      </b-modal>
    </b-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Table from '@/components/admin/Table'
import ElementsList from '@/components/admin/ElementsList'

export default {
  components: {
    Table,
    ElementsList
  },
  created () {
    this.getElements()
    this.getCategories()
    this.getRecipes()
  },
  computed: {
    ...mapGetters({
      elements: 'data/elements',
      categories: 'data/categories',
      recipes: 'data/recipes'
    }),
    totalRows () {
      return this.elements.data.length
    }
  },
  data () {
    return {
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
          label: 'First element of recipe',
          class: 'align-middle text-center',
          sortable: false
        },
        {
          key: 'recipe',
          label: 'Second element of recipe',
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

      modals: {
        create: false,
        edit: false,
        remove: false,
        createCategory: false
      },

      create: {
        name: '',
        category: {
          _id: '',
          name: ''
        }
      },

      remove: {
        _id: '',
        name: ''
      },

      edit: {
        _id: '',
        name: '',
        description: '',
        category: ''
      },

      createCategoryData: {
        name: ''
      },

      newCategory: {
        active: false,
        name: ''
      }
    }
  },
  methods: {
    ...mapActions({
      getElements: 'data/getElements',
      postElement: 'data/postElement',
      putElement: 'data/putElement',
      deleteElement: 'data/deleteElement',

      getCategories: 'data/getCategories',
      postCategory: 'data/postCategory',
      putCategory: 'data/putCategory',
      deleteCategory: 'data/deleteCategory',

      getRecipes: 'data/getRecipes',
      postRecipe: 'data/postRecipe',
      putRecipe: 'data/putRecipe',
      deleteRecipe: 'data/deleteRecipe'
    }),

    beforeCreateElement () {
      this.modals.create = true
    },
    elementCreateAction (event) {
      if (event) {
        event.preventDefault()
      }

      if (this.validateName(this.create.name, this.elements.data) === false) {
        return
      }

      if (!this.newCategory.name) {
        this.postElement(this.create).then(() => {
          this.modals.create = false
        })
      } else {
        this.postCategory(this.newCategory).then(() => {
          const filteredByNewCategory = this.categories.data.filter(category => {
            return category.name === this.newCategory.name
          })
          this.create.category._id = filteredByNewCategory[0]._id
          this.create.category.name = filteredByNewCategory[0].name

          this.postElement(this.create).then(() => {
            this.modals.create = false
          })
        })
      }
    },
    afterCreateElement () {
      this.create.name = ''
      this.create.category = ''
      this.create.categoryName = ''
      this.newCategory.name = ''
    },

    beforeEditElement (row) {
      this.modals.edit = true
      this.edit._id = row.item._id
      this.edit.name = row.item.name
      this.edit.description = row.item.description

      const filteredByCaregoryName = this.categories.data.filter(category => {
        return row.item.category === category.name
      })
      if (filteredByCaregoryName.length !== 0) {
        this.edit.category = {
          _id: filteredByCaregoryName[0]._id,
          name: filteredByCaregoryName[0].name
        }
      }
    },
    elementEditAction (event) {
      if (event) {
        event.preventDefault()
      }
      this.putElement(this.edit).then(response => {
        this.modals.edit = false
      })
    },
    afterEditElement () {
      this.edit._id = ''
      this.edit.name = ''
      this.edit.description = ''
      this.edit.categoryId = ''
    },

    beforeDeleteElement (row) {
      this.modals.remove = true
      this.remove._id = row.item._id
      this.remove.name = row.item.name
    },
    elementDeleteAction (event) {
      if (event) {
        event.preventDefault()
      }
      this.deleteElement(this.remove).then(response => {
        this.modals.remove = false
      })
    },
    afterDeleteElement () {
      this.remove._id = ''
      this.remove.name = ''
    },

    beforeCreateCategory () {
      this.modals.createCategory = true
    },
    createCategory () {
      this.postCategory(this.createCategoryData).then(response => {
        this.modals.createCategory = false
      })
    },
    afterCreateCategory () {
      this.createCategoryData.name = ''
    },

    validateName (name, object) {
      if (!name || !object) {
        return false
      }
      for (let i in object) {
        if (name === object[i].name || name === object[i].name.toLowerCase()) {
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
    },

    createElementClick (element) {
      this.create.name = element.name
    }
  }
}
</script>

<style lang="scss" scoped>
.section-elements {
  margin-top: 10px;
}
</style>
