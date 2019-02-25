<template lang='pug'>
  b-container

    //- Search and records per page row
    b-row.mb-3

      //- Search input
      b-col(cols='4'): b-input-group
        b-form-input(v-model='data.table.search' placeholder='Search element')
        b-input-group-append(): b-btn(:disabled='!data.table.search' @click='data.table.search = null') Clear

      //- Open 'create recipe' modal button
      b-col(cols='4' sm='3' md='2' lg='2' xl='2'): b-btn.mb-3(variant='success' @click='createRecipeModalShow()') Create recipe

      //- Select records per page
      b-col(cols='4' sm='3' md='2' lg='2' xl='2' offset-md='4'): b-form-select(:options='data.table.pagination.pageOptions' v-model='data.table.pagination.perPage')

    //- Recipes row
    b-row(): b-col(cols='12')

      //- Loading section
      loading-spinner(size='large' v-if='data.table.loading')

      //- Error section
      b-row.justify-content-md-center(v-if='data.table.error')
        b-col.error(cols='12' md='auto')
          b-alert(show variant='danger')
            | {{ data.table.error }}

      //- Table with data
      b-table(
        v-if='!data.table.loading && !data.table.error'
        show-empty
        responsive
        hover
        flex
        fixed=false
        :items='data.recipes'
        :fields='data.table.fields'
        :current-page='data.table.pagination.currentPage'
        :per-page='data.table.pagination.perPage'
        :filter='data.table.search'
      )
        //- Recipe row
        template(slot='recipe' slot-scope='row')
          a(v-for='(value, index) in row.item.recipe')
            |  {{ value.name }}

        //- Actions row
        template(slot='action' slot-scope='actionRow')
          b-button-group(size='sm')

            //- Edit recipe button
            b-btn.mr-1(variant='warning' size='sm' @click='editRecipeModalShow(actionRow)')
              font-awesome-icon(icon='edit')

            //- Delete recipe button
            b-btn(variant='danger' size='sm' @click='deleteRecipeModalShow(actionRow)')
              font-awesome-icon(icon='trash')

      //- Pagination for table
      b-pagination(
        align='center'
        :total-rows='data.table.totalRows'
        v-model='data.table.pagination.currentPage'
        :per-page='data.table.pagination.perPage'
      )

    //- Create recipe modal
    b-modal(
      title='Create new recipe'
      ref='createRecipeModal'
      size='xl'
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title='Create'
      ok-variant='success'
      cancel-variant='danger'
      @show='createRecipeModalShow()'
      @ok='createRecipe()'
      @cancel='createRecipeModalHide()'
    )

      //- Loading section
      loading-spinner(size='large' v-if='data.create.loading')

      //- Error section
      b-row.justify-content-md-center(v-if='data.create.error')
        b-col.error(cols='12' md='auto')
          b-alert(show variant='danger')
            | {{ data.create.error }}

      //- Modal content
      b-row(v-if='!data.create.loading && !data.create.error')

        b-col(md='4')

          //- Select result element
          b-row(): b-col(md='12')
            b-form-group(label='Result element' label-for='createRecipeResult')
              v-select#createRecipeResult(
                v-model='data.create.result'
                :options='data.elements'
                label='name'
                clearSearchOnSelect=false
              )

          //- Select recipe elements
          template(v-if='data.create.dropdownsCount' v-cloak)
            b-row.mt-2(v-for='(row, index) in data.create.dropdownsCount' :key='row'): b-col(md='12')
              b-form-group(label-for='createRecipeElements')
                | Element {{ index + 1}}
                v-select#createRecipeElements.mt-1(
                  v-model='data.create.recipe[index]'
                  :options='data.elements'
                  label='name'
                  clearSearchOnSelect=false
                  @input='createRecipeCheckNewDropdown(data.create.recipe[index], index)'
                )

        //- All elements list
        b-col(md='8')
          b-card(no-body)
            b-tabs(
              card
              pills
              vertical
              small
              nav-wrapper-class='w-25'
            )
              b-tab(v-for='category in data.categories' :title='category.name' :key='category._id')
                b-btn.mr-2.mb-2(
                  size='sm'
                  variant='outline-success'
                  v-for='element in data.elements'
                  :key='element._id'
                  v-if='element.category === category.name'
                  @click='data.create.recipe.push(element)'
                )
                  | {{ element.name }}

    //- Edit recipe modal
    b-modal(
      title='Edit recipe'
      ref='editRecipeModal'
      size='xl'
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title='Save'
      ok-variant='success'
      cancel-variant='danger'
      @ok='editRecipe()'
      @cancel='editRecipeModalHide()'
    )

      //- Loading section
      loading-spinner(size='large' v-if='data.edit.loading')

      //- Error section
      b-row.justify-content-md-center(v-if='data.edit.error')
        b-col.error(cols='12' md='auto')
          b-alert(show variant='danger')
            | {{ data.edit.error }}

      //- Modal content
      b-row(v-if='!data.edit.loading && !data.edit.error')

        b-col(md='4')

          //- Select result element
          b-row(): b-col(md='12')
            b-form-group(label='Result element' label-for='editRecipeResult')
              v-select#editRecipeResult(
                v-model='data.edit.result'
                :options='data.elements'
                label='name'
                clearSearchOnSelect=false
              )

          //- Select recipe elements
          template(v-if='data.edit.dropdownsCount' v-cloak)
            b-row.mt-2(v-for='(row, index) in data.edit.dropdownsCount' :key='row'): b-col(md='12')
              b-form-group(label-for='editRecipeElements')
                | Element {{ index + 1}}
                v-select#editRecipeElements.mt-1(
                  v-model='data.edit.recipe[index]'
                  :options='data.elements'
                  label='name'
                  clearSearchOnSelect=false
                  @input='editRecipeCheckNewDropdown(data.edit.recipe[index], index)'
                )

        //- All elements list
        b-col(md='8')
          b-card(no-body)
            b-tabs(
              card
              pills
              vertical
              small
              nav-wrapper-class='w-25'
            )
              b-tab(v-for='category in data.categories' :title='category.name' :key='category._id')
                b-btn.mr-2.mb-2(
                  size='sm'
                  variant='outline-success'
                  v-for='element in data.elements'
                  :key='element._id'
                  v-if='element.category === category.name'
                  @click='data.edit.recipe.push(element)'
                ) {{ element.name }}

    //- Delete recipe modal
    b-modal(
      size='md'
      ref='deleteRecipeModal'
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title='Delete'
      ok-variant='success'
      cancel-variant='danger'
      hide-header=true
      @ok='deleteRecipe()'
      @cancel='deleteRecipeModalHide()'
    )

      //- Modal content
      b-row.justify-content-md-center

        b-col(cols='12' md='auto')
          h4 Delete recipe
            strong.text-danger  {{ data.delete.name }}
            |?
</template>

<script>

import { getElements, getCategories, getRecipes, postRecipe, putRecipe, deleteRecipe } from '@/js/api.js'

export default {
  name: 'Recipes',
  created () {
    this.getRecipes()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getRecipes'
  },
  data () {
    return {
      data: {
        elements: [],
        categories: [],
        recipes: [],

        table: {
          totalRows: 0,
          loading: false,
          error: null,

          fields: [
            {
              key: 'result.name',
              label: 'Element',
              class: 'align-middle text-center',
              sortable: true
            },
            {
              key: 'recipe',
              label: 'Recipe',
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
          pagination: {
            perPage: 10,
            currentPage: 1,
            pageOptions: [5, 10, 25, 50]
          },
          search: null
        },

        create: {
          loading: false,
          error: null,

          dropdownsCount: 2,

          recipe: [],
          result: null

        },

        delete: {
          loading: false,
          error: null,

          recipeId: null,
          name: null
        },

        edit: {
          loading: false,
          error: null,

          dropdownsCount: 2,

          recipeId: null,
          recipe: [],
          result: null
        }

      }
    }
  },
  methods: {
    // Get elements, categories, recipes
    getElements () {
      this.data.table.loading = true
      getElements().then(response => {
        this.data.table.loading = false
        if (response.status === 200) {
          this.data.elements = response.data.response
          this.data.create.error = null
          this.data.edit.error = null
        } else {
          this.data.create.error = response.data
          this.data.edit.error = response.data
        }
      })
    },
    getCategories () {
      getCategories().then(response => {
        this.data.create.loading = false
        if (response.status === 200) {
          this.data.categories = response.data.response
          this.data.create.error = null
          this.data.edit.error = null
        } else {
          this.data.create.error = response.data
          this.data.edit.error = response.data
        }
      })
    },
    getRecipes () {
      this.data.table.loading = true
      getRecipes().then(response => {
        this.data.table.loading = false
        if (response.status === 200) {
          this.data.recipes = response.data.response
          this.data.table.totalRows = this.data.recipes.length // Total rows for pagination
          this.data.table.error = null
        } else {
          this.data.table.error = response.data
        }
      })
    },

    // Search
    onTableSearch (search) {
      this.data.table.totalRows = search.length
      this.data.table.pagination.currentPage = 1
    },

    // Check for new dropdowns in modals
    createRecipeCheckNewDropdown (data, index) {
      if (data && index === this.data.create.dropdownsCount - 1) {
        this.data.create.dropdownsCount++
      } else if (!data && index !== this.data.create.dropdownsCount - 1) {
        this.data.create.recipe = this.data.create.recipe.filter(x => x)
        this.data.create.dropdownsCount--
      }
    },
    editRecipeCheckNewDropdown (data, index) {
      if (data && index === this.data.edit.dropdownsCount - 1) {
        this.data.edit.dropdownsCount++
      } else if (!data && index !== this.data.edit.dropdownsCount - 1) {
        this.data.edit.recipe = this.data.edit.recipe.filter(x => x)
        this.data.edit.dropdownsCount--
      }
    },

    // Create/edit/delete recipes
    createRecipe (event) {
      if (this.data.create.result && this.data.create.recipe) {
        let recipeArray = []
        for (let i = 0; i < this.data.create.recipe.length; i++) {
          recipeArray.push(this.data.create.recipe[i]._id)
        }

        this.data.create.loading = true
        postRecipe(recipeArray, this.data.create.result._id).then(response => {
          this.data.create.loading = false
          if (response.status === 201) {
            this.getRecipes()
            this.createRecipeModalHide()
            this.data.create.error = null
          } else {
            this.data.create.error = response.data
          }
        })
      } else {
        event.preventDefault()
      }
    },
    editRecipe (event) {
      if (this.data.edit.recipeId && this.data.edit.result && this.data.edit.recipe) {
        let recipeArray = []
        for (let i = 0; i < this.data.edit.recipe.length; i++) {
          recipeArray.push(this.data.edit.recipe[i]._id)
        }

        this.data.edit.loading = true
        putRecipe(recipeArray, this.data.edit.result._id, this.data.edit.recipeId).then(response => {
          this.data.edit.loading = false
          if (response.status === 200) {
            this.getRecipes()
            this.editRecipeModalHide()
            this.data.edit.error = null
          } else {
            this.data.edit.error = response.data
          }
        })
      } else {
        event.preventDefault()
      }
    },
    deleteRecipe (event) {
      this.data.delete.loading = true
      deleteRecipe(this.data.delete.recipeId).then(response => {
        this.data.delete.loading = false
        if (response.status === 200) {
          this.getRecipes()
          this.data.delete.error = null
        } else {
          this.data.delete.error = response.data
        }
      })
    },

    // Show modals
    createRecipeModalShow () {
      this.$refs.createRecipeModal.show()

      this.getElements()
      this.getCategories()
    },
    editRecipeModalShow (row) {
      this.data.edit.recipeId = row.item._id
      this.data.edit.recipe = row.item.recipe
      this.data.edit.result = row.item.result
      this.data.edit.dropdownsCount = row.item.recipe.length

      this.$refs.editRecipeModal.show()

      this.getElements()
      this.getCategories()
    },
    deleteRecipeModalShow (row) {
      this.$refs.deleteRecipeModal.show()

      this.data.delete.recipeId = row.item._id
      this.data.delete.name = row.item.result.name
    },

    // Hide modals
    createRecipeModalHide () {
      this.$refs.createRecipeModal.hide()

      this.data.create.recipe = []
      this.data.create.result = null
      this.data.create.dropdownsCount = 2
    },
    editRecipeModalHide () {
      this.$refs.editRecipeModal.hide()
    },
    deleteRecipeModalHide () {
      this.$refs.deleteRecipeModal.hide()
    }
  }
}
</script>
