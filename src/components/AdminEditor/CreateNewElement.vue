<template lang='pug'>
  #CreateNewElement
    //- Button for activate modal window
    b-btn(v-b-modal.createNewElementModal variant="success") Create element

    //- Modal window
    b-modal#createNewElementModal(
      title="Create new element"
      ref="modal"
      size="xl"
      hide-header-close=true
      no-close-on-backdrop=true
      no-close-on-esc=true
      ok-title="Create"
      ok-variant="success"
      cancel-variant="danger"
      @show="fetchData"
      @ok="postNewElement"
      @cancel="clearModalInputs")

      //- Loading section
      b-row.justify-content-md-center(v-if="loading")
        b-col.loading(cols="12" md="auto")
          half-circle-spinner(:animation-duration="1000" :size="50" color="#41B460")

      //- Error section
      b-row.justify-content-md-center(v-if="error")
        b-col.error(cols="12" md="auto") {{ error }}

      //- Modal content
      b-row(v-if="!loading")

        //- Forms
        b-col(md="4")
          form

            //- Input name
            b-form-group.mb-4#selectNameGroup(label="Name:" label-for="selectName")
              b-form-input#selectName(
                required
                type="text"
                v-model="postData.name"
                :state="nameState"
                placeholder="Fire")

            //- Select category
            b-form-group#selectCategoryGroup(label="Category:" label-for="selectCategory")
              b-form-select#selectCategory(
                required
                type="text"
                v-model="postData.categoryId"
                :options="data.categories.options"
                :state="categoryState")

        //- All elements list
        b-col(md="8")
          b-card(no-body)
            b-tabs(card pills vertical end small nav-wrapper-class="w-25")
              b-tab(:title="category.text" v-for="category in data.categories.options" :key="category.id")
                b-button.mr-2.mb-2(
                  v-for="element in data.elements"
                  :key="element.id" variant="outline-secondary"
                  v-if="element.category == category.text"
                  size="sm"
                  @click="postData.name = element.name") {{ element.name }}
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'

import { getElements, getCategories, postElement } from '@/assets/js/api.js'

export default {
  name: 'CreateNewElement',
  components: {
    HalfCircleSpinner
  },
  computed: {
    nameState () {
      if (!this.postData.name) {
        return false
      } else {
        this.postData.name = this.postData.name.trim()
        for (let i = 0; i < this.data.elements.length; i++) {
          if (this.data.elements[i].name === this.postData.name || this.data.elements[i].name.toLowerCase() === this.postData.name) {
            return false
          }
        }
        return true
      }
    },
    categoryState () {
      if (this.postData.categoryId) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      loading: false,
      error: null,

      data: {
        categories: {
          options: []
        },
        elements: []
      },

      postData: {
        categoryId: null,
        name: null
      }
    }
  },
  methods: {
    fetchData () {
      this.error = null
      this.loading = true

      getCategories().then(response => {
        if (response.status === 200) {
          for (let i = 0; i < response.data.response.length; i++) {
            this.data.categories.options.push({
              value: response.data.response[i]._id,
              text: response.data.response[i].name
            })
          }
        }
      })

      getElements().then(response => {
        if (response.status === 200) {
          this.data.elements = response.data.response
          this.loading = false
        }
      })
    },
    validateNameForm () {
      if (!this.postData.name || !this.postData.categoryId) {
        return false
      } else {
        this.postData.name = this.postData.name.trim()
        for (let i = 0; i < this.data.elements.length; i++) {
          if (this.data.elements[i].name === this.postData.name || this.data.elements[i].name.toLowerCase() === this.postData.name) {
            return false
          }
        }
        return true
      }
    },
    postNewElement (evt) {
      if (this.validateNameForm() === true) {
        postElement(this.postData.name, this.postData.categoryId).then(data => {
          this.clearModalInputs()
        })
      } else {
        evt.preventDefault()
      }
    },
    clearModalInputs () {
      this.postData.name = null
      this.postData.categoryId = null

      this.data.categories.options = []
      this.data.elements = []
    }
  }
}
</script>

<style scoped lang="scss">
</style>
