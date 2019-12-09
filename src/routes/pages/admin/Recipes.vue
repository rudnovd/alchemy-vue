<template>
  <section class="section-recipes">
    <b-container>
      <Table
        :data="recipes.data"
        :fields="fields"
        :total-rows="totalRows"
        :loading="recipes.state.isLoading && recipes.state.method === 'GET'"
        :error="recipes.state.error.error"
        target="recipe"
        @commonButtonClick="beforeCreateRecipe"
        @editButtonClick="beforeEditRecipe"
        @deleteButtonClick="beforeDeleteRecipe"
      />

      <b-modal
        v-model="modals.create"
        title="Create new recipe"
        size="xl"
        hide-header-close="hide-header-close"
        ok-title="Create"
        ok-variant="success"
        cancel-variant="danger"
        :ok-disabled="recipes.state.isLoading"
        :cancel-disabled="recipes.state.isLoading"
        @ok="recipeCreateAction"
        @hidden="afterCreateRecipe"
      >
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="4" xl="4">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Result element:">
                  <multiselect
                    v-model="create.result"
                    placeholder="Result element"
                    label="name"
                    deselect-label
                    :options="elements.data"
                    :searchable="true"
                    :allow-empty="false"
                    :clear-on-select="false"
                    :max-height="280"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="12">
                <b-form-group label="First element:">
                  <multiselect
                    v-model="create.firstElement"
                    placeholder="First element"
                    label="name"
                    deselect-label
                    :options="elements.data"
                    :searchable="true"
                    :allow-empty="false"
                    :clear-on-select="false"
                    :max-height="280"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="12">
                <b-form-group label="Second element:">
                  <multiselect
                    v-model="create.secondElement"
                    placeholder="Second element"
                    label="name"
                    deselect-label
                    :options="elements.data"
                    :searchable="true"
                    :allow-empty="false"
                    :clear-on-select="false"
                    :max-height="280"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>

          <b-col class="mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0" cols="12" sm="12" md="12" lg="8" xl="8">
            <ElementsList :elements="elements.data" :categories="categories.data" @elementClick="pushElement" />
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        v-model="modals.edit"
        title="Edit recipe"
        size="xl"
        hide-header-close="hide-header-close"
        ok-title="Save"
        ok-variant="success"
        cancel-variant="danger"
        :ok-disabled="recipes.state.isLoading && recipes.state.method === 'PUT'"
        :cancel-disabled="recipes.state.isLoading && recipes.state.method === 'PUT'"
        @ok="recipeEditAction"
        @hidden="afterEditRecipe"
      >
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="4" xl="4">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Result element:">
                  <multiselect
                    v-model="edit.result"
                    placeholder="Result element"
                    label="name"
                    deselect-label
                    :options="elements.data"
                    :searchable="true"
                    :allow-empty="false"
                    :clear-on-select="false"
                    :max-height="280"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="12">
                <b-form-group label="First element:">
                  <multiselect
                    v-model="edit.firstElement"
                    placeholder="First element"
                    label="name"
                    deselect-label
                    :options="elements.data"
                    :searchable="true"
                    :allow-empty="false"
                    :clear-on-select="false"
                    :max-height="280"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="12">
                <b-form-group label="Second element:">
                  <multiselect
                    v-model="edit.secondElement"
                    placeholder="Second element"
                    label="name"
                    deselect-label
                    :options="elements.data"
                    :searchable="true"
                    :allow-empty="false"
                    :clear-on-select="false"
                    :max-height="280"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>

          <b-col class="mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0" cols="12" sm="12" md="12" lg="8" xl="8">
            <ElementsList :elements="elements.data" :categories="categories.data" @elementClick="showElementRecipe">
              <div>
                <span v-if="showRecipe.length > 0" class="text-muted">
                  Recipe of {{ showRecipe[0].name }}: {{ showRecipe[1].name }} + {{ showRecipe[2].name }}
                </span>
              </div>
            </ElementsList>
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        v-model="modals.delete"
        size="md"
        hide-header-close="hide-header-close"
        ok-title="Delete"
        ok-variant="success"
        cancel-variant="danger"
        hide-header="hide-header"
        :ok-disabled="recipes.state.isLoading && recipes.state.method === 'DELETE'"
        :cancel-disabled="recipes.state.isLoading && recipes.state.method === 'DELETE'"
        @ok="recipeDeleteAction"
        @hidden="afterDeleteRecipe"
      >
        <b-row class="text-center">
          <b-col cols="12">
            <h4>
              Delete recipe of <strong class="text-danger">{{ this.delete.name }}</strong
              >?
            </h4>
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
  name: 'Recipes',
  components: {
    Table,
    ElementsList
  },
  data() {
    return {
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
      modals: {
        create: false,
        edit: false,
        delete: false
      },

      create: {
        result: '',
        firstElement: '',
        secondElement: ''
      },

      delete: {
        _id: '',
        name: ''
      },

      edit: {
        firstElement: '',
        secondElement: '',
        result: '',
        _id: ''
      },

      showRecipe: []
    }
  },
  computed: {
    ...mapGetters({
      elements: 'data/elements',
      categories: 'data/categories',
      recipes: 'data/recipes'
    }),
    totalRows() {
      return this.recipes.data.length
    }
  },
  created() {
    this.getElement()
    this.getCategories()
    this.getRecipes()
  },
  methods: {
    ...mapActions({
      getElement: 'data/getElements',

      getCategories: 'data/getCategories',
      postCategory: 'data/postCategory',
      putCategory: 'data/putCategory',
      deleteCategory: 'data/deleteCategory',

      getRecipes: 'data/getRecipes',
      postRecipe: 'data/postRecipe',
      putRecipe: 'data/putRecipe',
      deleteRecipe: 'data/deleteRecipe'
    }),
    beforeCreateRecipe() {
      this.modals.create = true
    },
    recipeCreateAction(event) {
      if (event) {
        event.preventDefault()
      }
      if (!this.create.result._id || !this.create.firstElement._id || !this.create.secondElement._id) {
        return
      }

      this.postRecipe(this.create).then(() => {
        this.modals.create = false
      })
    },
    afterCreateRecipe() {
      this.create.result = ''
      this.create.firstElement = ''
      this.create.secondElement = ''
    },

    beforeEditRecipe(row) {
      this.modals.edit = true
      this.edit.firstElement = row.item.recipe[0]
      this.edit.secondElement = row.item.recipe[1]
      this.edit.result = row.item.result
      this.edit._id = row.item._id
    },
    recipeEditAction(event) {
      if (event) {
        event.preventDefault()
      }

      this.putRecipe(this.edit).then(() => {
        this.modals.edit = false
      })
    },
    afterEditRecipe() {
      this.edit.firstElement = ''
      this.edit.secondElement = ''
      this.edit.result = ''
      this.edit._id = ''
    },

    beforeDeleteRecipe(row) {
      this.modals.delete = true
      this.delete._id = row.item._id
      this.delete.name = row.item.result.name
    },
    recipeDeleteAction(event) {
      if (event) {
        event.preventDefault()
      }

      this.deleteRecipe(this.delete).then(() => {
        this.modals.delete = false
      })
    },
    afterDeleteRecipe() {
      this.delete._id = ''
    },

    pushElement(element) {
      if (!this.create.result) {
        this.create.result = element
      } else if (!this.create.firstElement) {
        this.create.firstElement = element
      } else if (!this.create.secondElement) {
        this.create.secondElement = element
      }
    },
    showElementRecipe(element) {
      this.showRecipe = []
      this.recipes.data.forEach(recipe => {
        if (recipe.result._id === element._id) {
          this.showRecipe[0] = element
          this.showRecipe[1] = recipe.recipe[0]
          this.showRecipe[2] = recipe.recipe[1]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section-recipes {
  margin-top: 10px;
}

@media screen and (min-width: map-get($grid-breakpoints, 'md')) {
  .elements-tabs {
    width: 25%;
  }
}

@media screen and (max-width: map-get($grid-breakpoints, 'md')) {
  .elements-tabs {
    width: 50%;
  }
}
</style>
