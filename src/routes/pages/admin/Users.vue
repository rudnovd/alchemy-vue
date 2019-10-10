<template>
  <section class='section-users'>
    <b-container>
      <Table
        target='user'
        :data='users.data'
        :fields='fields'
        :totalRows='totalRows'
        :loading='users.state.isLoading'
        :error='users.state.error'
        :commonButton='false'
        :deleteButton='false'
        @editButtonClick='beforeEditUser'
      />

      <b-modal
        v-model='modals.edit'
        title='Edit user'
        size='xl'
        hide-header-close='hide-header-close'
        ok-title='Save'
        ok-variant='success'
        cancel-variant='danger'
        :ok-disabled='users.state.isLoading && users.state.method === "GET"'
        :cancel-disabled='users.state.isLoading && users.state.method === "GET"'
        @ok='userEditAction'
        @hidden='afterEditUser'
      >
        <b-row>
          <b-col cols='12' sm='12' md='12' lg='5' xl='5'>
            <b-row>
              <b-col cols='9'>
                <b-form-group :label-cols='4' label='Username:'>
                  <b-form-input type='text' readonly='readonly' v-model='user.username'/>
                </b-form-group>
              </b-col>

              <b-col cols='9'>
                <b-form-group :label-cols='4' label='Email:'>
                  <b-form-input type='text' readonly='readonly' v-model='user.email'/>
                </b-form-group>
              </b-col>

              <b-col class='pl-0' cols='3'>
                <b-btn variant='primary' @click='resetPassword = true' :disabled='resetPassword'>
                  <font-awesome-icon icon='key'/>
                </b-btn>
              </b-col>

              <b-col cols='9'>
                <b-form-group :label-cols='4' label='Created:'>
                  <b-form-input type='text' readonly='readonly' v-model='user.created'/>
                </b-form-group>
              </b-col>

              <b-col cols='9'>
                <b-form-group :label-cols='4' label='Last entered:'>
                  <b-form-input type='text' readonly='readonly' v-model='user.lastEntered'/>
                </b-form-group>
              </b-col>

              <b-col cols='9'>
                <b-form-group :label-cols='4' label='Role:'>
                  <b-button-group>
                    <b-button variant='outline-success' :class='{ "active": user.role === "User" }' @click='user.role = "User"'>User</b-button>
                    <b-button variant='outline-success' :class='{ "active": user.role === "Admin" }' @click='user.role = "Admin"'>Admin</b-button>
                  </b-button-group>
                </b-form-group>
              </b-col>

              <b-col cols='9'>
                <b-form-checkbox
                  v-model="user.isDisabled"
                  :value='true'
                  :unchecked-value='!user.isDisabled'
                >
                  Disabled
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-col>

          <b-col cols='12' sm='12' md='12' lg='7' xl='7'>
            <b-row>
              <b-col cols='12'>
                <h5>
                  Opened elements
                </h5>

                <b-progress
                  class='mb-3'
                  :value='user.elements.length'
                  :max='elements.data.length'
                  show-value='show-value'
                />
              </b-col>

              <b-col class='mt-2 mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0' cols='12'>
                <ElementsList
                  :elements='user.elements'
                  :categories='categories.data'
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-modal>
    </b-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { getAccountElements } from '@/js/api/account'

import Table from '@/components/admin/Table'
import ElementsList from '@/components/admin/ElementsList'

export default {
  components: {
    Table,
    ElementsList
  },
  mounted () {
    this.getUsers().then(() => {
      this.totalRows = this.users.data.length
    })
    this.getElements()
    this.getCategories()
  },
  computed: {
    ...mapGetters({
      elements: 'data/elements',
      categories: 'data/categories',
      users: 'data/users'
    })
  },
  data () {
    return {
      user: {
        _id: '',
        username: '',
        email: '',
        created: '',
        lastEntered: '',
        isDisabled: false,
        role: '',
        elements: []
      },

      loading: {
        userElements: false
      },

      modals: {
        edit: false
      },
      resetPassword: false,

      totalRows: 0,
      fields: [
        {
          key: 'username',
          label: 'Username',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'created',
          label: 'Created',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'lastEntered',
          label: 'Last entered',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'isDisabled',
          label: 'Disabled',
          class: 'align-middle text-center',
          sortable: true
        },
        {
          key: 'action',
          label: 'Action',
          class: 'align-middle text-center',
          sortable: false
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getUsers: 'data/getUsers',
      getElements: 'data/getElements',
      getCategories: 'data/getCategories'
    }),
    getUserElements () {
      this.loading.userElements = true
      getAccountElements(this.user._id)
        .then(response => {
          this.user.elements = response.data.elements
        })
        .finally(() => {
          this.loading.userElements = false
        })
    },

    beforeEditUser (row) {
      this.modals.edit = true
      this.user._id = row.item._id
      this.user.username = row.item.username
      this.user.email = row.item.email
      this.user.created = row.item.created
      this.user.lastEntered = row.item.lastEntered
      this.user.isDisabled = row.item.isDisabled
      this.user.role = row.item.role
      this.getUserElements()
    },
    userEditAction () {
      this.putUser(this.user).then(() => {
        this.modals.edit = false
      })
      if (this.resetPassword) {
        // putResetPassword(this.user.email).then(response => {
        // })
      }
    },
    afterEditUser () {
      this.user._id = ''
      this.user.username = ''
      this.user.email = ''
      this.user.created = ''
      this.user.lastEntered = ''
      this.user.isDisabled = false
      this.user.role = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.section-users {
  margin-top: 10px;
}
</style>
