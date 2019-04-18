<template lang='pug'>
b-modal(
  id='loginModal'
  v-model='loginModalShown'
  size='md'
  no-close-on-backdrop=true
  hide-header=true
  hide-footer=true
  centered=true
)

  //- Modal content
  b-row(class='justify-content-md-center' v-if='loginModalShown')
    b-col(class='text-right' cols='11')
      font-awesome-icon(icon='times' color='gray' @click='loginModalShown = false')

    b-col(cols='10')
      h4
        | Sign in

      //- Input username or email
      b-form-group(class='mt-4' label='Login' label-for='usernameOrEmail')
        b-form-input(
          id='usernameOrEmail'
          required
          type='text'
          v-model='usernameOrEmail'
          :autocomplete='autocomplete'
        )

      //- Input password
      b-form-group(class='mt-4' label='Password' label-for='password')
        b-form-input(
          id='password'
          required
          type='password'
          v-model='password'
          :autocomplete='autocomplete'
        )

      //- Remember login checkbox
      b-form-checkbox(
        v-model='rememberLogin'
        name='remember-login-checkbox'
        unchecked-value=false
      ) Remember me

      p(class='text-center mt-4')
        u(class='c-pointer' @click='resetPasswordModalShow()')
          | Don't remember your password?

      b-btn(class='mt-4 mb-3' block variant='success' @click='login(usernameOrEmail, password)')
        | Sign in

      b-alert(v-if='loginError' show variant='danger')
        | {{ loginError }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { postLogin } from '@/js/api/authentication'

export default {
  name: 'loginModal',
  mounted () {
    this.$root.$on('loginModalShow', () => {
      this.loginModalShown = true
    })
  },
  data () {
    return {
      loginModalShown: false,

      loginError: null,

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
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    validation () {
      if (this.usernameOrEmail && this.password) {
        return true
      }
    },
    login () {
      if (this.validation() === true) {
        postLogin(this.usernameOrEmail, this.password, this.rememberLogin)
          .then(response => {
            if (response.status === 200) {
              this.loginModalShown = false
              this.setUser(response.data.user)
              this.$router.push({ path: '/game' })
            }
          })
          .catch(error => {
            this.loginError = error
          })
      }
    },
    resetPasswordModalShow () {
      this.$root.$emit('resetPasswordModalShow')
      this.loginModalShown = false
    }
  }
}
</script>
