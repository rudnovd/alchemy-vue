<template>
  <b-modal
    v-model='showModal'
    :title='textStatus'
    size='md'
    hide-footer='hide-footer'
    centered='centered'
  >
    <b-row class='ml-3 mr-3' v-if='!resetSuccess'>
      <b-col class='mt-4' cols='8'>
        <h4>
          Reset password
        </h4>
      </b-col>

      <b-col class='ml-auto text-right' cols='2'>
        <b-button class='close-button' size='sm' variant='link' @click='showModal = false'>
          <font-awesome-icon class='c-pointer fa-2x' icon='times'/>
        </b-button>
      </b-col>

      <b-col class='mt-2' cols='12'>
        <b-form-group label='Email' label-for='email'>
          <b-form-input
            required='required'
            id='email'
            type='text'
            v-model='email'
            v-model.trim.lazy='$v.email.$model'
            :class='{ "form-error": $v.email.$error, "form-success": !$v.email.$error && this.email}'
          />
        </b-form-group>
      </b-col>

      <b-col class='mt-2 mb-3' cols='12'>
        <b-btn block='block' variant='success' @click='resetPassword'>
          Reset password
        </b-btn>
      </b-col>

      <b-col class='mt-2' cols='12'>
        <b-alert v-if='error' show='show' variant='danger'>
          {{ error }}
        </b-alert>
      </b-col>
    </b-row>

    <b-row class='ml-3 mr-3' v-if='resetSuccess'>
      <b-col class='ml-auto text-right' cols='2'>
        <b-button
          class='close-button'
          size='sm'
          variant='link'
          @click='showModal = false; resetSuccess = false'
        >
          <font-awesome-icon class='c-pointer fa-2x' icon='times'/>
        </b-button>
      </b-col>

      <b-col class='mt-4' cols='12'>
        <p>
          Check your email
        </p>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { putResetPassword } from '@/js/api/account'

import { required, email } from 'vuelidate/lib/validators'

export default {
  mounted () {
    this.$root.$on('resetPasswordModalShow', () => {
      this.showModal = true
    })
  },
  data () {
    return {
      showModal: false,
      error: null,
      textStatus: '',

      email: null,
      resetSuccess: null
    }
  },
  methods: {
    validation () {
      if (!this.email) {
        return false
      }

      if (this.$v.email.$error) {
        return false
      }

      return true
    },
    resetPassword () {
      if (this.validation() === true) {
        putResetPassword(this.email).then(response => {
          if (response.status === 200) {
            this.resetSuccess = true
            this.clearInputs()
            this.textStatus = 'Email has been sent'
          } else if (response.status === 404) {
            this.textStatus = 'Error'
            this.error = 'There is no user registered with that email address.'
          } else {
            this.textStatus = 'Error'
            this.error = 'Try later.'
          }
        })
      }
    },
    clearInputs () {
      this.email = null
      this.resetSuccess = null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>

<style lang='scss' scoped>
.error {
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: rgb(255, 62, 32);
}

.form-error {
  border-color: rgb(255, 62, 32);
}

.form-success {
  border-color: color('alchemy-green');
}
</style>
