<template>
  <b-container>
    <Table
      :data='recipes'
      :fields='fields'
      :totalRows='totalRows'
      :loading='loading.recipes'
      :error='errors.recipes'
      target='recipe'
      @commonButtonClick='beforeCreateRecipe'
      @editButtonClick='beforeEditRecipe'
      @deleteButtonClick='beforeDeleteRecipe'
    />

    <b-modal
      v-model='modals.create'
      title='Create new recipe'
      size='xl'
      hide-header-close='hide-header-close'
      ok-title='Create'
      ok-variant='success'
      :ok-disabled='loading.createRecipe'
      :cancel-disabled='loading.createRecipe'
      cancel-variant='danger'
      @ok='createRecipe'
      @hidden='afterCreateRecipe'
    >
      <b-row>
        <b-col cols='12' sm='12' md='12' lg='4' xl='4'>
          <b-row>
            <b-col cols='12'>
              <b-form-group label='Result element:'>
                <multiselect
                  v-model='create.resultElement'
                  placeholder='Result element'
                  label='name'
                  deselectLabel
                  :options='elements'
                  :searchable='true'
                  :allow-empty='false'
                  :clear-on-select='false'
                  :maxHeight='280'
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class='mt-2'>
            <b-col cols='12'>
              <b-form-group label='First element:'>
                <multiselect
                  v-model='create.firstElement'
                  placeholder='First element'
                  label='name'
                  deselectLabel
                  :options='elements'
                  :searchable='true'
                  :allow-empty='false'
                  :clear-on-select='false'
                  :maxHeight='280'
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class='mt-2'>
            <b-col cols='12'>
              <b-form-group label='Second element:'>
                <multiselect
                  v-model='create.secondElement'
                  placeholder='Second element'
                  label='name'
                  deselectLabel
                  :options='elements'
                  :searchable='true'
                  :allow-empty='false'
                  :clear-on-select='false'
                  :maxHeight='280'
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols='12' sm='12' md='12' lg='8' xl='8'>
          <b-card no-body='no-body'>
            <b-tabs
              card='card'
              pills='pills'
              vertical='vertical'
              small='small'
              nav-wrapper-class='w-30'
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
                  @click='pushElement(element)'
                >
                  {{ element.name }}
                </b-btn>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>

        <b-col cols='12' v-if='errors.createRecipe'>
          <b-alert show='show' variant='danger'>
            {{ errors.createRecipe }}
          </b-alert>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      v-model='modals.edit'
      title='Edit recipe'
      size='xl'
      hide-header-close='hide-header-close'
      ok-title='Save'
      ok-variant='success'
      :ok-disabled='loading.editRecipe'
      :cancel-disabled='loading.editRecipe'
      cancel-variant='danger'
      @ok='editRecipe'
      @hidden='afterEditRecipe'
    >
      <b-row>
        <b-col cols='4'>
          <b-row>
            <b-col cols='12'>
              <b-form-group label='Result element:'>
                <multiselect
                  v-model='edit.resultElement'
                  placeholder='Result element'
                  label='name'
                  deselectLabel
                  :options='elements'
                  :searchable='true'
                  :allow-empty='false'
                  :clear-on-select='false'
                  :maxHeight='280'
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class='mt-2'>
            <b-col cols='12'>
              <b-form-group label='First element:'>
                <multiselect
                  v-model='edit.firstElement'
                  placeholder='First element'
                  label='name'
                  deselectLabel
                  :options='elements'
                  :searchable='true'
                  :allow-empty='false'
                  :clear-on-select='false'
                  :maxHeight='280'
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row class='mt-2'>
            <b-col cols='12'>
              <b-form-group label='Second element:'>
                <multiselect
                  v-model='edit.secondElement'
                  placeholder='Second element'
                  label='name'
                  deselectLabel
                  :options='elements'
                  :searchable='true'
                  :allow-empty='false'
                  :clear-on-select='false'
                  :maxHeight='280'
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols='12' sm='12' md='12' lg='8' xl='8'>
          <b-card no-body='no-body'>
            <b-tabs
              card='card'
              pills='pills'
              vertical='vertical'
              small='small'
              nav-wrapper-class='w-30'
            >
              <b-tab
                v-for='category in categories'
                :title='category.name'
                :key='category._id'
                @click='showRecipe = []'
              >
                <b-btn
                  class='mr-2 mb-2'
                  size='sm'
                  variant='outline-success'
                  v-for='element in elements'
                  :key='element._id'
                  v-if='element.category === category.name'
                  @click='showElementRecipe(element)'
                >
                  {{ element.name }}
                </b-btn>
              </b-tab>

              <b-col cols='12' v-if='showRecipe.length > 0'>
                <p class='text-muted'>
                  Recipe of {{ showRecipe[0].name }}: {{ showRecipe[1].name }} + {{ showRecipe[2].name }}
                </p>
              </b-col>
            </b-tabs>
          </b-card>

          <b-col cols='12' v-if='errors.createRecipe'>
            <b-alert show='show' variant='danger'>
              {{ errors.createRecipe }}
            </b-alert>
          </b-col>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      v-model='modals.delete'
      size='md'
      hide-header-close='hide-header-close'
      ok-title='Delete'
      ok-variant='success'
      :ok-disabled='loading.deleteRecipe'
      :cancel-disabled='loading.deleteRecipe'
      cancel-variant='danger'
      hide-header='hide-header'
      @ok='deleteRecipe'
      @hidden='afterDeleteRecipe'
    >
      <b-row class='text-center'>
        <b-col cols='12' v-if='!errors.deleteElement'>
          <h4>
            Delete recipe of
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
import { getElements } from '@/js/api/elements'

import { getCategories } from '@/js/api/categories'

import { getRecipes, postRecipe, putRecipe, deleteRecipe } from '@/js/api/recipes'

import Table from '@/components/admin/Table'

export default {
  components: {
    Table
  },
  created () {
    this.getElements()
    this.getCategories()
    this.getRecipes()
  },
  watch: {
    // call again the method if the route changes
    $route: 'getRecipes'
  },
  computed: {

  },
  data () {
    return {
      elements: [],
      categories: [],
      recipes: [],

      totalRows: 0,
      fields: [
        {
          key: 'result.name',
          label: 'Element',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'recipe[0].name',
          label: 'First element of recipe',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'recipe[1].name',
          label: 'Second element of recipe',
          class: 'align-middle text-center',
          sortable: true
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
        recipes: false,

        createRecipe: false,
        editRecipe: false,
        deleteRecipe: false
      },

      errors: {
        elements: null,
        categories: null,
        recipes: null,

        createRecipe: null,
        editRecipe: null,
        deleteRecipe: null
      },

      modals: {
        create: false,
        edit: false,
        delete: false
      },

      create: {
        resultElement: null,
        firstElement: null,
        secondElement: null
      },

      delete: {
        recipeId: null,
        name: null
      },

      edit: {
        firstElement: null,
        secondElement: null,
        resultElement: null,
        recipeId: null
      },

      showRecipe: []
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
    getRecipes () {
      this.errors.recipes = null
      this.loading.recipes = true
      getRecipes().then(response => {
        this.loading.recipes = false
        if (response.status === 200) {
          this.recipes = response.data.response
          this.totalRows = response.data.response.length // Total rows for pagination
        } else {
          this.errors.recipes = response.data
        }
      })
    },

    beforeCreateRecipe () {
      this.modals.create = true
    },
    createRecipe (event) {
      event.preventDefault()
      if (!this.create.resultElement || !this.create.firstElement || !this.create.secondElement) {
        return
      }
      this.loading.createRecipe = true
      postRecipe([this.create.firstElement._id, this.create.secondElement._id], this.create.resultElement._id).then(response => {
        this.loading.createRecipe = false
        if (response.status === 201) {
          this.modals.create = false
          this.getRecipes()
        } else {
          this.errors.createRecipe = response.data
        }
      })
    },
    afterCreateRecipe () {
      this.modals.create = false
      this.create.resultElement = null
      this.create.firstElement = null
      this.create.secondElement = null
    },

    beforeEditRecipe (row) {
      this.modals.edit = true
      this.edit.firstElement = row.item.recipe[0]
      this.edit.secondElement = row.item.recipe[1]
      this.edit.resultElement = row.item.result
      this.edit.recipeId = row.item.result._id
    },
    editRecipe (event) {
      event.preventDefault()
      this.loading.editRecipe = true
      putRecipe([this.edit.firstElement._id, this.edit.secondElement._id], this.edit.resultElement._id, this.edit.recipeId).then(response => {
        this.loading.editRecipe = false
        if (response.status === 200) {
          this.modals.edit = null
          this.getRecipes()
        } else {
          this.errors.editRecipe = response.data
        }
      })
    },
    afterEditRecipe () {
      this.modals.edit = false
      this.edit.firstElement = null
      this.edit.secondElement = null
      this.edit.resultElement = null
      this.edit.recipeId = null
    },

    beforeDeleteRecipe (row) {
      this.modals.delete = true
      this.delete.recipeId = row.item.result._id
      this.delete.name = row.item.result.name
    },
    deleteRecipe (event) {
      event.preventDefault()
      this.loading.deleteRecipe = true
      deleteRecipe(this.delete.recipeId).then(response => {
        this.loading.deleteRecipe = false
        if (response.status === 200) {
          this.modals.delete = false
          this.getRecipes()
        } else {
          this.errors.deleteRecipe = response.data
        }
      })
    },
    afterDeleteRecipe () {
      this.modals.delete = false
      this.errors.deleteRecipe = null
      this.delete.recipeId = null
    },

    pushElement (element) {
      if (!this.create.resultElement) {
        this.create.resultElement = element
      } else if (!this.create.firstElement) {
        this.create.firstElement = element
      } else if (!this.create.secondElement) {
        this.create.secondElement = element
      }
    },
    showElementRecipe (element) {
      this.showRecipe = []
      for (let i = 0; i < this.recipes.length; i++) {
        if (element._id === this.recipes[i].result._id) {
          this.showRecipe[0] = element
          this.showRecipe[1] = this.recipes[i].recipe[0]
          this.showRecipe[2] = this.recipes[i].recipe[1]
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 767px) {
  .elements-tabs {
    width: 50%;
  }
}

@media screen and (min-width: 768px) {
  .elements-tabs {
    width: 25%;
  }
}

</style>
