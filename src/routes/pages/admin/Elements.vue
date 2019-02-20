<template lang='pug'>
  b-container

    //- Search and records per page row
    b-row.mb-3

      //- Search input
      b-col(cols='4'): b-input-group
        b-form-input(v-model='data.table.search' placeholder='Search')
        b-input-group-append
          b-btn(:disabled='!data.table.search' @click='data.table.search = null') Clear

      //- Create modal button
      b-col(cols='4' sm='3' md='2' lg='2' xl='2'): b-btn.mb-3(variant='success' @click='createElementModalShow()') Create element

      //- Select records per page
      b-col(cols='4' sm='3' md='2' lg='2' xl='2' offset-md='4'): b-form-select(:options='data.table.pagination.pageOptions' v-model='data.table.pagination.perPage')

    //- Elements row
    b-row(): b-col(cols='12')

      //- Loading section
      loading-spinner(size='large' v-if='data.table.loading')

      //- Error section
      b-row.justify-content-md-center(v-if='data.table.error'): b-col.error(cols='12' md='auto')
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
        :items='data.elements'
        :fields='data.table.fields'
        :current-page='data.table.pagination.currentPage'
        :per-page='data.table.pagination.perPage'
        :filter='data.table.search')
        template(slot='action' slot-scope='actionRow')
          b-button-group(size='sm')

            //- Edit element button
            b-btn.mr-1(variant='warning' size='sm' @click='editElementModalShow(actionRow)')
              font-awesome-icon(icon='edit')

            //- Delete element button
            b-btn(variant='danger' size='sm' @click='deleteElementModalShow(actionRow)')
              font-awesome-icon(icon='trash')

      //- Pagination for table
      b-pagination(
        align='center'
        :total-rows='data.table.totalRows'
        v-model='data.table.pagination.currentPage'
        :per-page='data.table.pagination.perPage')

    //- Create element modal
    b-modal(
      title='Create new element'
      ref='createElementModal'
      size='xl'
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title='Create'
      ok-variant='success'
      cancel-variant='danger'
      @show='getCategories'
      @ok='createElement'
      @cancel='createElementModalHide')

      //- Loading section
      loading-spinner(size='large' v-if='data.create.loading')

      //- Error section
      b-row.justify-content-md-center(v-if='data.create.error'): b-col.error(cols='12' md='auto')
        b-alert(show variant='danger')
          | {{ data.create.error }}

      //- Modal content
      b-row(v-if='!data.create.loading && !data.create.error')

        b-col(md='4')

          //- Input name
          b-row(): b-col(md='12')
            b-form-group(
              horizontal
              :label-cols='3'
              label='Name:'
              label-for='createElementName')

              b-form-input#createElementName(
                required
                type='text'
                v-model='data.create.name'
                :state='validateName(data.create.name, data.elements)'
                placeholder='Fire')

          //- Select category
          b-row(): b-col(md='12')
            b-form-group(
              horizontal
              :label-cols='3'
              label='Category:'
              label-for='createElementCategory')

              b-form-select#createElementCategory(
                v-if='!data.newCategory.active'
                required
                type='text'
                v-model='data.create.categoryId'
                :state='validateNull(data.create.categoryId)')
                option(v-for='category in data.categories' :value='category._id')
                  |{{ category.name }}

              b-form-input#createElementCategory(
                v-if='data.newCategory.active'
                required
                type='text'
                v-model='data.newCategory.name'
                :state='validateName(data.newCategory.name, data.categories)'
                placeholder='Elements')

          //- New category button
          b-row(v-if='data.newCategory.active === false'): b-col(md='12')
            b-btn.float-right(variant='light' size='sm' @click='data.newCategory.active = true; data.create.categoryId = null')
              font-awesome-icon(icon='plus')
              |  New category

          b-row(v-if='data.newCategory.active === true'): b-col(md='12')
            b-btn.float-right(variant='light' size='sm' @click='data.newCategory.active = false; data.newCategory.name = null')
              font-awesome-icon(icon='clipboard')
              |  Choose category

        //- All elements list
        b-col(md='8')
          b-card(no-body)
            b-tabs(card pills vertical small nav-wrapper-class='w-25')
              b-tab(v-for='category in data.categories' :title='category.name' :key='category._id')
                b-btn.mr-2.mb-2(
                  size='sm'
                  variant='outline-success'
                  v-for='element in data.elements'
                  :key='element._id'
                  v-if='element.category === category.name'
                  @click='data.create.name = element.name')
                  |{{ element.name }}

    //- Edit element modal
    b-modal(
      title='Edit element'
      ref='editElementModal'
      size='xl'
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title='Save'
      ok-variant='success'
      cancel-variant='danger'
      @show='getCategories'
      @ok='editElement'
      @cancel='editElementModalHide')

      //- Loading section
      loading-spinner(size='large' v-if='data.edit.loading')

      //- Error section
      b-row.justify-content-md-center(v-if='data.edit.error'): b-col.error(cols='12' md='auto')
        b-alert(show variant='danger')
          | {{ data.edit.error }}

      //- Modal content
      b-row(v-if='!data.edit.loading && !data.edit.error')

        b-col(md='4')
          //- Input name
          b-form-group(:label-cols='3' horizontal label='Name:' label-for='editElementName')
            b-form-input#editElementName(required type='text' v-model='data.edit.name' :state='validateName(data.edit.name, data.elements)' placeholder='Fire')

          //- Select category
          b-form-group(:label-cols='3' horizontal  label='Category:' label-for='editCategory')
            b-form-select#editCategory(required type='text' v-model='data.edit.categoryId' :state='validateNull(data.edit.categoryId)')
              option(v-for='category in data.categories' :value='category._id')
                |{{ category.name }}

        //- All elements list
        b-col(md='8')
          b-card(no-body)
            b-tabs(card pills vertical small nav-wrapper-class='w-25')
              b-tab(v-for='category in data.categories' :title='category.name' :key='category._id')
                b-btn.mr-2.mb-2(
                  size='sm'
                  variant='outline-success'
                  v-for='element in data.elements'
                  :key='element._id'
                  v-if='element.category === category.name'
                  @click='data.edit.name = element.name')
                  | {{ element.name }}

    //- Delete element modal
    b-modal(
      size='md'
      ref='deleteElementModal'
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title='Delete'
      ok-variant='success'
      cancel-variant='danger'
      hide-header=true
      @ok='deleteElement'
      @cancel='deleteElementModalHide')

      //- Modal content
      b-row.justify-content-md-center

        b-col(cols='12' md='auto')
          h4 Delete element
            strong.text-danger  {{ data.delete.name }}
            |?
</template>

<script>

import { getElements, getCategories, postElement, postCategory, putElement, deleteElement } from '@/js/api.js'

export default {
  name: 'AdminEditor',
  created () {
    this.getElements()
    this.getCategories()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getElements'
  },
  data () {
    return {
      data: {
        elements: [],
        categories: [],

        table: {
          totalRows: 0,
          loading: false,
          error: null,

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

          name: null,
          categoryId: null
        },

        delete: {
          loading: false,
          error: null,

          _id: null,
          name: null
        },

        edit: {
          loading: false,
          error: null,

          _id: null,
          name: null,
          categoryId: null
        },

        newCategory: {
          active: false,
          name: null
        }
      }
    }
  },
  methods: {
    getElements () {
      this.data.table.loading = true
      getElements().then(response => {
        this.data.table.loading = false
        if (response.status === 200) {
          this.data.elements = response.data.response
          this.data.table.totalRows = this.data.elements.length // Total rows for pagination
          this.data.table.error = null
        } else {
          this.data.table.error = response.data
        }
      })
    },
    getCategories () {
      getCategories().then(response => {
        this.data.create.loading = false
        if (response.status === 200) {
          this.data.categories = response.data.response
          this.data.edit.error = null
        } else {
          this.data.create.error = response.data
          this.data.edit.error = response.data
        }
      })
    },
    onTableSearch (search) {
      this.data.table.totalRows = search.length
      this.data.table.pagination.currentPage = 1
    },

    validateNull (object) {
      if (!object) {
        return false
      } else {
        return true
      }
    },
    validateName (name, inObject) {
      if (name) {
        name = name.trim()
        for (let i in inObject) {
          if (name === inObject[i].name || name === inObject[i].name.toLowerCase()) {
            return false
          }
        }
        return true
      } else {
        return null
      }
    },

    // Create/edit/delete elements
    createElement (event) {
      if (this.validateNull(this.data.create.name) === true && this.validateName(this.data.create.name, this.data.elements) === true && this.validateNull(this.data.create.categoryId) === true) {
        this.data.create.loading = true
        postElement(this.data.create.name.trim(), this.data.create.categoryId).then(response => {
          this.data.create.loading = false
          if (response.status === 201) {
            this.getElements()
            this.createElementModalHide()
            this.data.create.error = null
          } else {
            this.data.create.error = response.data
          }
        })
      } else if (this.data.newCategory.name) {
        postCategory(this.data.newCategory.name).then(response => {
          if (response.status === 201) {
            this.data.create.categoryId = response.data.response._id
            this.createElement()
            this.data.newCategory.name = null
          } else {
            this.data.create.error = response.data
          }
        })
      } else {
        event.preventDefault()
      }
    },
    editElement (event) {
      if (this.validateName(this.data.edit.name, this.data.elements) === true) {
        this.data.edit.loading = true
        putElement(this.data.edit._id, this.data.edit.name, this.data.edit.categoryId).then(response => {
          this.data.edit.loading = false
          if (response.status === 200) {
            this.getElements()
            this.editElementModalHide()
            this.data.edit.error = null
          } else {
            this.data.edit.error = response.data
          }
        })
      } else {
        event.preventDefault()
      }
    },
    deleteElement (event) {
      this.data.delete.loading = true
      deleteElement(this.data.delete._id).then(response => {
        this.data.delete.loading = false
        if (response.status === 200) {
          this.getElements()
          this.data.delete.error = null
        } else {
          this.data.delete.error = response.data
          event.preventDefault()
        }
      })
    },

    // Show modals
    createElementModalShow () {
      this.$refs.createElementModal.show()
    },
    editElementModalShow (row) {
      this.$refs.editElementModal.show()
      this.data.edit._id = row.item._id
      this.data.edit.name = row.item.name

      for (let i = 0; i < this.data.categories.length; i++) {
        if (this.data.categories[i].name === row.item.category) {
          this.data.edit.categoryId = this.data.categories[i]._id
        }
      }
    },
    deleteElementModalShow (row) {
      this.$refs.deleteElementModal.show()
      this.data.delete._id = row.item._id
      this.data.delete.name = row.item.name
    },

    // Hide modals
    createElementModalHide () {
      this.$refs.createElementModal.hide()
      this.data.create.name = null
      this.data.create.categoryId = null
    },
    editElementModalHide () {
      this.$refs.editElementModal.hide()
      this.data.edit._id = null
      this.data.edit.name = null
      this.data.edit.categoryId = null
    },
    deleteElementModalHide () {
      this.$refs.deleteElementModal.hide()
    }
  }
}
</script>
