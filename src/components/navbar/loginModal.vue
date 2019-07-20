<template lang='pug'>
b-modal(
  v-model='showModal'
  size='md'
  hide-header=true
  hide-footer=true
  centered=true
  @hidden='clearInputs'
)
  b-row(class='ml-3 mr-3')
    //- Sign in text
    b-col(class='mt-4' cols='8')
      h4 Sign in

    //- Close button
    b-col(class='ml-auto text-right' cols='2')
      b-button(
        class='close-button'
        size='sm'
        variant='link'
        @click='showModal = false'
      )
        font-awesome-icon(class='c-pointer fa-2x' icon='times')

    //- Input username or email
    b-col(class='mt-2' cols='12')
      b-form-group(label='Email or username' label-for='usernameOrEmail')
        b-form-input(
          required
          id='usernameOrEmail'
          type='text'
          v-model='usernameOrEmail'
          :autocomplete='autocomplete'
        )

    //- Input password
    b-col(class='mt-2' cols='12')
      b-form-group(label='Password' label-for='password')
        b-form-input(
          required
          id='password'
          type='password'
          v-model='password'
          :autocomplete='autocomplete'
        )

    //- Remember login checkbox
    b-col(cols='12')
      b-form-checkbox(
        v-model='rememberLogin'
        name='remember-login-checkbox'
        unchecked-value=false
      ) Remember me

    //- Reset password
    b-col(class='mt-3' cols='12')
      p(class='text-center text-muted')
        u(class='c-pointer' @click='resetPasswordModalShow()')
          | Don't remember your password?

    //- Sign in button
    b-col(cols='12' class='mt-2 mb-3')
      b-btn(block variant='success' @click='login')
        | Sign in

    //- Error
    b-col(cols='12' v-if='error')
      b-alert(show variant='danger') {{ error }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { postLogin } from '@/js/api/authentication'

export default {
  data () {
    return {
      showModal: false,
      error: null,

      usernameOrEmail: null,
      password: null,
      rememberLogin: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    autocomplete () {
      if (this.rememberLogin) {
        return 'on'
      } else {
        return 'off'
      }
    }
  },
  mounted () {
    this.$root.$on('loginModalShow', () => {
      this.showModal = true
    })
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    validation () {
      if (!this.usernameOrEmail || !this.password) {
        return false
      }

      return true
    },
    login () {
      if (this.validation() === true) {
        postLogin(this.usernameOrEmail, this.password, this.rememberLogin).then(response => {
          if (response.status === 200) {
            this.showModal = false
            this.setUser(response.data.user)
            this.$router.push({ path: '/game' })
          } else {
            this.error = response.data.error
          }
        })
      }
    },
    clearInputs () {
      this.usernameOrEmail = null
      this.password = null
      this.rememberLogin = false
    },
    resetPasswordModalShow () {
      this.$root.$emit('resetPasswordModalShow')
      this.showModal = false
    }
  }
}
</script>
