<template>
  <section class="section-elements">
    <b-container>
      <Table
        :data="elementsData"
        :fields="fields"
        :total-rows="totalRows"
        :loading="elements.state.isLoading && elements.state.method === 'GET'"
        :error="elements.state.error"
        target="element"
        @commonButtonClick="modals.create = true"
        @editButtonClick="beforeEditElement"
        @deleteButtonClick="beforeDeleteElement"
      >
        <slot type="button">
          <b-btn class="mb-3" variant="success" @click="beforeCreateCategory">
            Create category
          </b-btn>
        </slot>
      </Table>

      <b-modal
        v-model="modals.create"
        title="Create new element"
        size="xl"
        hide-header-close="hide-header-close"
        ok-title="Create"
        ok-variant="success"
        cancel-variant="danger"
        :ok-disabled="elements.state.isLoading && elements.state.method === 'POST'"
        :cancel-disabled="elements.state.isLoading && elements.state.method === 'POST'"
        @ok="elementCreateAction"
        @hidden="afterCreateElement"
      >
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="4" xl="4">
            <b-row>
              <b-col cols="12">
                <b-form-group :label-cols="3" label="Name:" label-for="createElementName">
                  <b-form-input
                    id="createElementName"
                    v-model="create.name"
                    type="text"
                    required="required"
                    placeholder="Fire"
                    :state="isUniqueName(create.name, elements.data)"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12">
                <b-form-group :label-cols="3" label="Category:" label-for="createElementCategory">
                  <b-form-select
                    v-if="!newCategory.active"
                    id="createElementCategory"
                    v-model="create.category._id"
                    type="text"
                    required="required"
                    :options="categories.data"
                    value-field="_id"
                    text-field="name"
                    :state="!isNull(create.category._id)"
                    @change="
                      create.category.name = categories.data.filter(category => {
                        return category._id === create.category._id
                      })[0].name
                    "
                  >
                  </b-form-select>

                  <b-form-input
                    v-if="newCategory.active"
                    id="createElementCategory"
                    v-model="newCategory.name"
                    type="text"
                    required="required"
                    placeholder="Elements"
                    :state="isUniqueName(newCategory.name, categories.data)"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-btn
                  v-if="!newCategory.active"
                  class="float-right"
                  variant="light"
                  size="sm"
                  @click="
                    newCategory.active = true
                    newCategory.name = ''
                  "
                >
                  <font-awesome-icon icon="plus" /> New category
                </b-btn>

                <b-btn
                  v-if="newCategory.active"
                  class="float-right"
                  variant="light"
                  size="sm"
                  @click="
                    newCategory.active = false
                    newCategory.name = ''
                  "
                >
                  <font-awesome-icon icon="clipboard" /> Choose category
                </b-btn>
              </b-col>
            </b-row>
          </b-col>

          <b-col class="mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0" cols="12" sm="12" md="12" lg="8" xl="8">
            <ElementsList :elements="elements.data" :categories="categories.data" @elementClick="createElementClick" />
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        v-model="modals.edit"
        title="Edit element"
        size="xl"
        hide-header-close="hide-header-close"
        ok-title="Save"
        ok-variant="success"
        cancel-variant="danger"
        :ok-disabled="elements.state.isLoading && elements.state.method === 'PUT'"
        :cancel-disabled="elements.state.isLoading && elements.state.method === 'PUT'"
        @ok="elementEditAction"
        @hidden="afterEditElement"
      >
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="4" xl="4">
            <b-form-group :label-cols="3" label="Name:" label-for="editElementName">
              <b-form-input id="editElementName" v-model="edit.name" type="text" required="required" />
            </b-form-group>

            <b-form-group :label-cols="3" label="Category:" label-for="editCategory">
              <b-form-select id="editCategory" v-model="edit.category" type="text" required="required">
                <option
                  v-for="category in categories.data"
                  :key="category._id"
                  :value="{ _id: category._id, name: category.name }"
                >
                  {{ category.name }}
                </option>
              </b-form-select>
            </b-form-group>

            <b-form-group :label-cols="3" label="Description:" label-for="editDescription">
              <b-form-textarea
                id="editDescription"
                v-model="edit.description"
                placeholder="Description"
                rows="3"
                required="required"
                no-resize="no-resize"
              />
            </b-form-group>
          </b-col>

          <b-col class="mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0" cols="12" sm="12" md="12" lg="8" xl="8">
            <ElementsList :elements="elements.data" :categories="categories.data" />
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        v-model="modals.remove"
        size="md"
        hide-header-close="hide-header-close"
        ok-title="Delete"
        ok-variant="success"
        :ok-disabled="elements.state.isLoading && elements.state.method === 'DELETE'"
        :cancel-disabled="elements.state.isLoading && elements.state.method === 'DELETE'"
        cancel-variant="danger"
        hide-header="hide-header"
        @ok="elementDeleteAction"
        @hidden="afterDeleteElement"
      >
        <b-row class="text-center">
          <b-col cols="12">
            <h4>
              Delete element <strong class="text-danger">{{ remove.name }}</strong
              >?
            </h4>
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        v-model="modals.createCategory"
        title="Create new category"
        size="xl"
        hide-header-close="hide-header-close"
        ok-title="Create"
        ok-variant="success"
        cancel-variant="danger"
        :ok-disabled="categories.state.isLoading && elements.state.method === 'POST'"
        :cancel-disabled="categories.state.isLoading && elements.state.method === 'POST'"
        @ok="createCategory"
        @hidden="afterCreateCategory"
      >
        <b-row>
          <b-col cols="12" sm="12" md="12" lg="4" xl="4">
            <b-row>
              <b-col cols="12">
                <b-form-group :label-cols="3" label="Name:" label-for="createCategoryName">
                  <b-form-input
                    id="createCategoryName"
                    v-model="createCategoryData.name"
                    type="text"
                    required="required"
                    placeholder="Elements"
                    :state="isUniqueName(createCategoryData.name, categories.data)"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>

          <b-col class="mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0" cols="12" sm="12" md="12" lg="8" xl="8">
            <ElementsList :categories="categories.data" :elements="elements.data" />
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
  name: 'Elements',
  components: {
    Table,
    ElementsList
  },
  data() {
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
          key: 'recipe.firstElement.name',
          label: 'First element of recipe',
          class: 'align-middle text-center',
          sortable: false
        },
        {
          key: 'recipe.secondElement.name',
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
  computed: {
    ...mapGetters({
      elements: 'data/elements',
      categories: 'data/categories',
      recipes: 'data/recipes'
    }),
    totalRows() {
      return this.elements.data.length
    },
    elementsData() {
      return this.findRecipes()
    }
  },
  created() {
    this.getElements()
    this.getCategories()
    this.getRecipes()
  },
  methods: {
    ...mapActions({
      getElements: 'data/getElements',
      postElement: 'data/postElement',
      putElement: 'data/putElement',
      deleteElement: 'data/deleteElement',

      getCategories: 'data/getCategories',
      postCategory: 'data/postCategory',

      getRecipes: 'data/getRecipes'
    }),

    beforeCreateElement() {
      this.modals.create = true
    },
    elementCreateAction(event) {
      if (event) {
        event.preventDefault()
      }

      if (!this.isUniqueName(this.create.name, this.elements.data) || !this.create.category._id) {
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
    afterCreateElement() {
      this.create.name = ''
      this.create.category.name = ''
      this.create.category._id = ''
      this.newCategory.name = ''
    },

    beforeEditElement(row) {
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
    elementEditAction(event) {
      if (event) {
        event.preventDefault()
      }
      this.putElement(this.edit).then(response => {
        this.modals.edit = false
      })
    },
    afterEditElement() {
      this.edit._id = ''
      this.edit.name = ''
      this.edit.description = ''
      this.edit.categoryId = ''
    },

    beforeDeleteElement(row) {
      this.modals.remove = true
      this.remove._id = row.item._id
      this.remove.name = row.item.name
    },
    elementDeleteAction(event) {
      if (event) {
        event.preventDefault()
      }
      this.deleteElement(this.remove).then(response => {
        this.modals.remove = false
      })
    },
    afterDeleteElement() {
      this.remove._id = ''
      this.remove.name = ''
    },

    beforeCreateCategory() {
      this.modals.createCategory = true
    },
    createCategory() {
      this.postCategory(this.createCategoryData).then(response => {
        this.modals.createCategory = false
      })
    },
    afterCreateCategory() {
      this.createCategoryData.name = ''
    },

    isUniqueName(name, object) {
      if (!name || !object) {
        return false
      }

      const filteredByName = object.filter(singleObject => {
        return name === singleObject.name || name === singleObject.name.toLowerCase()
      })

      if (filteredByName.length > 0) {
        return false
      } else {
        return true
      }
    },
    isNull(object) {
      if (object) {
        return false
      } else {
        return true
      }
    },

    createElementClick(element) {
      this.create.name = element.name
    },

    findRecipes() {
      const foundRecipe = this.elements.data.map(element => {
        const recipe = this.recipes.data.filter(recipe => {
          return recipe.result._id === element._id
        })

        if (recipe.length > 0) {
          return {
            ...element,
            recipe: {
              firstElement: { ...recipe[0].recipe[0] },
              secondElement: { ...recipe[0].recipe[1] }
            }
          }
        } else {
          return {
            ...element,
            recipe: {
              firstElement: '',
              secondElement: ''
            }
          }
        }
      })

      return foundRecipe
    }
  }
}
</script>

<style lang="scss" scoped>
.section-elements {
  margin-top: 10px;
}
</style>
