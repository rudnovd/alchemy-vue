<template>
  <b-modal
    v-model='showModal'
    size='md'
    hide-header='hide-header'
    hide-footer='hide-footer'
    centered='centered'
  >
    <b-row class='ml-3 mr-3'>
      <b-col class='mt-4' cols='8'>
        <h4>
          Sign up
        </h4>
      </b-col>

      <b-col class='ml-auto text-right' cols='2'>
        <b-button class='close-button' size='sm' variant='link' @click='showModal = false'>
          <font-awesome-icon class='c-pointer fa-2x' icon='times'/>
        </b-button>
      </b-col>

      <b-col class='mt-3' cols='12'>
        <b-form-group label='Username' label-for='username'>
          <b-form-input
            required='required'
            id='username'
            type='text'
            v-model='username'
            v-model.trim.lazy='$v.username.$model'
            :class='{ "form-error": $v.username.$error, "form-success": !$v.username.$error && this.username}'
          />
        </b-form-group>
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

      <b-col class='mt-2' cols='12'>
        <b-form-group label='Password' label-for='password'>
          <b-form-input
            required='required'
            id='password'
            type='password'
            v-model='password'
            v-model.trim.lazy='$v.password.$model'
            :class='{ "form-error": $v.password.$error, "form-success": !$v.password.$error && this.password}'
          />
          <p class='error' v-show='$v.password.$error'>
            password must contain at least 4 characters
          </p>
        </b-form-group>
      </b-col>

      <b-col class='mt-2 mb-3' cols='12'>
        <b-btn block='block' variant='success' @click='registration'>
          Sign up
        </b-btn>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'

import { postAccount } from '@/js/api/account'

import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  mounted () {
    this.$root.$on('registrationModalShow', () => {
      this.showModal = true
    })
  },
  data () {
    return {
      showModal: false,

      email: null,
      username: null,
      password: null
    }
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    validation () {
      if (!this.username || !this.email || !this.password) {
        return false
      }

      if (this.$v.username.$error || this.$v.email.$error || this.$v.password.$error) {
        return false
      }

      return true
    },
    registration () {
      if (this.validation() === true) {
        postAccount(this.email, this.username, this.password).then(response => {
          if (response.status === 200) {
            this.showModal = false
            this.clearInputs()
            this.$router.push({ path: '/game' })
          }
        })
      }
    },
    clearInputs () {
      this.email = null
      this.username = null
      this.password = null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(4)
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
  border-color: map-get($colors, 'alchemy-green');
}
</style>
