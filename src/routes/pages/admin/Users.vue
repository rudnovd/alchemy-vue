<template>
<b-container>
  <Table
    :data='users'
    :fields='fields'
    :totalRows='totalRows'
    :loading='loading.users'
    :error='errors.users'
    target='user'
    :commonButton='false'
    :deleteButton='false'
    @editButtonClick='beforeSaveUser'
  />

  <b-modal
    v-model='modals.edit'
    title='Edit user'
    size='xl'
    hide-header-close='hide-header-close'
    ok-title='Save'
    ok-variant='success'
    :ok-disabled='loading.blockUser'
    :cancel-disabled='loading.blockUser'
    cancel-variant='danger'
    @ok='saveUser'
    @hidden='afterSaveUser'
  >
    <b-row>
      <b-col cols='5'>
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
            <b-form-group :label-cols='4' label='Disabled:'>
              <b-form-input type='text' readonly='readonly' v-model='user.isDisabled'/>
            </b-form-group>
          </b-col>

          <b-col class='pl-0' cols='3'>
            <b-btn v-if='!user.isDisabled' variant='success' @click='user.isDisabled = true'>
              <font-awesome-icon icon='user'/>
            </b-btn>

            <b-btn v-if='user.isDisabled' variant='danger' @click='user.isDisabled = false'>
              <font-awesome-icon icon='user-slash'/>
            </b-btn>
          </b-col>

          <b-col cols='9'>
            <b-form-group :label-cols='4' label='Role:'>
              <b-form-input type='text' readonly='readonly' v-model='user.role'/>
            </b-form-group>
          </b-col>

          <b-col class='pl-0' cols='3'>
            <b-btn
              v-if='user.role != "Admin"'
              variant='success'
              @click='user.role="Admin"'
            >
              <font-awesome-icon icon='arrow-up'/>
            </b-btn>

            <b-btn v-if='user.role == "User"' variant='danger' @click='user.role="User"'>
              <font-awesome-icon icon='arrow-down'/>
            </b-btn>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols='7'>
        <b-row>
          <b-col cols='12'>
            <h5>
              Opened elements
            </h5>

            <b-progress
              class='mb-3'
              :value='userElements.length'
              :max='maxElements'
              show-value='show-value'
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</b-container>
</template>

<script>
import Table from '@/components/admin/Table'

import { getUsers } from '@/js/api/users'

import { getAccountElements, putResetPassword } from '@/js/api/account'

import { getElements } from '@/js/api/elements'

export default {
  components: {
    Table
  },
  mounted () {
    this.loading.users = true
    getUsers().then(response => {
      this.loading.users = false
      if (response.status === 200) {
        this.users = response.data.response
        this.totalRows = response.data.response.length
        this.transformDate()
      } else {
        this.errors.users = response.data
      }
    })

    getElements().then(response => {
      if (response.status === 200) {
        this.maxElements = response.data.response.length
      }
    })
  },
  data () {
    return {
      users: [],
      user: {
        username: null,
        email: null,
        created: null,
        lastEntered: null,
        isDisabled: null,
        role: null
      },
      userElements: [],
      maxElements: 0,

      modals: {
        edit: false
      },

      loading: {
        users: false,
        userElements: false,
        blockUser: false,
        resetPassword: false,
        changeRole: false
      },

      errors: {
        users: null,
        userElements: null,
        blockUser: null,
        resetPassword: null,
        changeRole: null
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
    getUserElements () {
      this.loading.userElements = true
      getAccountElements(this.user._id).then(response => {
        this.loading.userElements = false
        if (response.status === 200) {
          this.userElements = response.data.elements
        } else {
          this.errors.userElements = response.data
        }
      })
    },

    transformDate () {
      for (let i = 0; i < this.users.length; i++) {
        const createdDate = new Date(this.users[i].created)
        const lastEntered = new Date(this.users[i].lastEntered)

        let day = createdDate.getDate()
        let month = createdDate.getMonth() + 1
        let hours = createdDate.getHours()
        let minutes = createdDate.getMinutes()

        if (day < 10) {
          day = `0${day}`
        }
        if (month < 10) {
          month = `0${month}`
        }
        if (hours < 10) {
          hours = `0${hours}`
        }
        if (minutes < 10) {
          minutes = `0${minutes}`
        }

        this.users[i].created = `${day}.${month}.${createdDate.getFullYear()} ${hours}:${minutes}`

        day = lastEntered.getDate()
        month = lastEntered.getMonth() + 1
        hours = lastEntered.getHours()
        minutes = lastEntered.getMinutes()

        if (day < 10) {
          day = `0${day}`
        }
        if (month < 10) {
          month = `0${month}`
        }
        if (hours < 10) {
          hours = `0${hours}`
        }
        if (minutes < 10) {
          minutes = `0${minutes}`
        }

        this.users[i].lastEntered = `${day}.${month}.${lastEntered.getFullYear()} ${hours}:${minutes}`
      }
    },

    beforeBlockUser () {
      this.user.isDisabled = true
    },
    blockUser () {

    },
    afterBlockUser () {

    },

    beforeSaveUser (row) {
      this.modals.edit = true
      this.user = row.item
      this.getUserElements()
    },
    saveUser () {
      if (this.resetPassword) {
        putResetPassword(this.user.email).then(response => {
          if (response.status === 200) {
          }
        })
      }
    },
    afterSaveUser () {
      this.modals.edit = false
      this.user = {}
    }
  }
}
</script>
