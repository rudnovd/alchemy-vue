<template lang="pug">
  b-container

    //- Search and records per page row
    b-row.mb-3

      //- Search input
      b-col(cols='4')
        b-input-group
          b-form-input(v-model='table.search.filter' placeholder='Search')
          b-input-group-append
            b-btn(:disabled='!table.search.filter' @click='table.search.filter = ""') Clear

      //- Create modal button
      b-col(cols='4' sm='3' md='2' lg='2' xl='2')
        b-btn.mb-3(variant='success' @click='$refs.createNewElementModal.show()') Create element

      //- Select records per page
      b-col(cols='4' sm='3' md='2' lg='2' xl='2' offset-md='4')
        b-form-select(:options='table.pagination.pageOptions' v-model='table.pagination.perPage')

    //- Elements row
    b-row: b-col(cols='12')

      //- Loading section
      loading-spinner(size='large' v-if='loading')

      //- Table with data
      b-table(
        v-if='!loading'
        show-empty
        responsive
        hover
        flex
        fixed=false
        :items='elements'
        :fields='table.fields'
        :current-page='table.pagination.currentPage'
        :per-page='table.pagination.perPage'
        :filter='table.search.filter')
        template(slot='action' slot-scope='actionRow')
          b-button-group(size="sm")

            //- Edit element button
            b-btn.mr-1(variant='warning' size='sm' @click='editElementShowModal(actionRow)')
              font-awesome-icon(icon='edit')

            //- Delete element button
            b-btn(variant='danger' size='sm' @click='deleteElementShowModal(actionRow)')
              font-awesome-icon(icon='trash')

      //- Pagination for table
      b-pagination(
        align='center'
        :total-rows='table.totalRows'
        v-model='table.pagination.currentPage'
        :per-page='table.pagination.perPage')

    //- Create element modal
    b-modal(
      title='Create new element'
      ref='createNewElementModal'
      size='xl'
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title='Create'
      ok-variant='success'
      cancel-variant='danger'
      @show='createElementFetchData'
      @ok='createElementCreate'
      @cancel='createElementClearModal')

      //- Loading section
      loading-spinner(size='large' v-if='loading')

      //- Error section
      b-row.justify-content-md-center(v-if='createElement.error')
        b-col.error(cols='12' md='auto') {{ error }}

      //- Modal content
      b-row(v-if='!createElement.loading')

        //- Forms
        b-col(md='4')
          form

            //- Input name
            b-form-group(
              horizontal
              :label-cols="3"
              label="Name:"
              label-for="selectName")

              b-form-input#selectName(
                required
                type='text'
                v-model='createElement.post.name'
                :state='createElementNameState'
                placeholder='Fire')

            //- Select category
            b-form-group(
              horizontal
              :label-cols="3"
              label="Category:"
              label-for="selectCategory")
              b-form-select#selectCategory(
                required
                type='text'
                v-model='createElement.post.categoryId'
                :options='createElement.categories'
                :state='createElementCategoryState')

        //- All elements list
        b-col(md='8')
          b-card(no-body)
            b-tabs(card pills vertical small nav-wrapper-class='w-25')
              b-tab(:title='category.text' v-for='category in createElement.categories' :key='category.id')
                b-btn.mr-2.mb-2(
                  size="sm"
                  variant="outline-success"
                  v-for='element in elements'
                  :key='element.id'
                  v-if='element.category == category.text'
                  @click='createElement.post.name = element.name')
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
      @ok='deleteElementDelete'
      @cancel='deleteElementCloseModal')

      //- Modal content
      b-row.justify-content-md-center

        b-col(cols='12' md='auto')
          h4 Delete element
            strong.text-danger  {{ deleteElement.delete.name }}
            |?

    //- Edit element modal
    b-modal(
      title="Edit element"
      ref="editElementModal"
      size="xl"
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title="Save"
      ok-variant="success"
      cancel-variant="danger"
      @show='editElementFetchData'
      @ok="editElementEdit"
      @cancel="editElementCloseModal")

      //- Loading section
      loading-spinner(size='large' v-if='loading')

      //- Error section
      b-row.justify-content-md-center(v-if="editElement.error")
        b-col.error(cols="12" md="auto") {{ editElement.error }}

      //- Modal content
      b-row(v-if="!editElement.loading")

        //- Forms
        b-col(md="4")
          form

            //- Input name
            b-form-group(:label-cols="3" horizontal label="Name:" label-for="editName")
              b-form-input#editName(required type='text' v-model='editElement.edit.name' :state='editElementNameState' placeholder='Fire')

            //- Select category
            b-form-group(:label-cols="3" horizontal  label="Category:" label-for="editCategory")
              b-form-select#editCategory(required type='text' v-model='editElement.edit.activeCategory' :state='editElementCategoryState')
                option(v-for='category in editElement.categories'

                  :value='category.value') {{ editElement }}

        //- All elements list
        b-col(md='8')
          b-card(no-body)
            b-tabs(card pills vertical small nav-wrapper-class='w-25')
              b-tab(:title='category.text' v-for='category in editElement.categories' :key='category.id')
                b-btn.mr-2.mb-2(
                  size="sm"
                  variant="outline-success"
                  v-for='element in elements'
                  :key='element.id'
                  v-if='element.category == category.text'
                  @click='editElement.edit.name = element.name')
                  | {{ element.name }}
</template>

<script>

import { getElements, getCategories, postElement, deleteElement, putElement } from '@/js/api.js'

export default {
  name: 'AdminEditor',
  created () {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    createElementNameState () {
      if (!this.createElement.post.name) {
        return false
      } else {
        this.createElement.post.name.trim()

        for (let i = 0; i < this.elements.length; i++) {
          if (this.elements[i].name === this.createElement.post.name || this.elements[i].name.toLowerCase() === this.createElement.post.name) {
            return false
          }
        }
        return true
      }
    },
    createElementCategoryState () {
      if (this.createElement.post.categoryId) {
        return true
      } else {
        return false
      }
    },

    editElementNameState () {
      if (!this.editElement.edit.name) {
        return false
      } else {
        this.editElement.edit.name.trim()

        for (let i = 0; i < this.elements.length; i++) {
          if (this.elements[i].name === this.editElement.edit.name || this.elements[i].name.toLowerCase() === this.editElement.edit.name) {
            return false
          }
        }
        return true
      }
    },

    editElementCategoryState () {
      if (this.editElement.edit.activeCategory) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      loading: true,
      error: null,

      elements: [],

      table: {
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
        pagination: {
          perPage: 10,
          currentPage: 1,
          pageOptions: [5, 10, 25, 50]
        },
        search: {
          filter: null
        }
      },

      post: {
        categoryId: null,
        name: null
      },

      createElement: {
        loading: true,
        error: null,

        categories: [],

        post: {
          name: null,
          categoryId: null
        }
      },

      deleteElement: {
        loading: true,
        error: null,

        delete: {
          _id: null,
          name: null
        }
      },

      editElement: {
        loading: true,
        error: null,

        categories: [],

        edit: {
          _id: null,
          name: null,

          activeCategory: null
        }
      }
    }
  },
  methods: {
    fetchData () {
      getElements().then(response => {
        if (response.status === 200) {
          this.elements = response.data.response

          this.table.totalRows = this.elements.length

          this.loading = false
        }
      })
    },
    onTableSearch (filteredItems) {
      this.table.totalRows = filteredItems.length
      this.table.pagination.currentPage = 1
    },

    // Create element methods
    createElementFetchData () {
      getCategories().then(response => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.response.length; i++) {
            this.createElement.categories.push({
              value: response.data.response[i]._id,
              text: response.data.response[i].name
            })
          }
          this.createElement.loading = false
        }
      })
    },
    createElementCreate (event) {
      if (this.createElementNameState === true && this.createElementCategoryState === true) {
        this.createElement.post.name = this.createElement.post.name.trim()

        postElement(this.createElement.post.name, this.createElement.post.categoryId).then(response => {
          if (response.status === 201) {
            this.fetchData()

            this.createElementClearModal()
          }
        })
      } else {
        event.preventDefault()
      }
    },
    createElementClearModal () {
      this.createElement.categories = []

      this.createElement.post.name = null
      this.createElement.post.categoryId = null
    },

    // Delete element methods
    deleteElementDelete () {
      deleteElement(this.deleteElement.delete._id).then(response => {
        if (response.status === 200) {
          this.fetchData()
        } else {
          event.preventDefault()
        }
      })
    },
    deleteElementShowModal (row) {
      this.deleteElement.delete._id = row.item._id
      this.deleteElement.delete.name = row.item.name
      this.$refs.deleteElementModal.show()
    },
    deleteElementCloseModal () {
      this.$refs.deleteElementModal.hide()
    },

    // Edit element methods
    editElementFetchData () {
      getCategories().then(response => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.response.length; i++) {
            this.editElement.categories.push({
              value: response.data.response[i]._id,
              text: response.data.response[i].name
            })
          }
          this.editElement.loading = false
        }
      })
    },
    editElementEdit (event) {
      if (this.editElementNameState === true) {
        putElement(this.editElement.edit._id, this.editElement.edit.name).then(response => {
          if (response.status === 201) {
            this.fetchData()

            this.editElementCloseModal()
          }
        })
      } else {
        event.preventDefault()
      }
    },
    editElementShowModal (row) {
      this.editElement.edit._id = row.item._id
      this.editElement.edit.name = row.item.name

      // this.editElementFetchData()

      console.log(this.editElement.categories)
      
      for (let i = 0; i < this.editElement.categories.length; i++) {
        console.log('a', this.editElement.categories[i].text)
        if (row.item.category === this.editElement.categories[i].text) {
          this.editElement.edit.activeCategory = { value: this.editElement.categories[i].value, text: this.editElement.categories[i].text }
          break
        }
      }
      // console.log(this.editElement)

      this.$refs.editElementModal.show()
    },
    editElementCloseModal () {
      this.editElement.categories = []

      this.editElement.edit._id = null
      this.editElement.edit.name = null

      this.$refs.editElementModal.hide()
    }
  }
}
</script>
