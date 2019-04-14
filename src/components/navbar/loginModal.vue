<template lang='pug'>
b-modal#loginModal(
  v-model='loginModalShown'
  size='md'
  no-close-on-backdrop=true
  hide-header=true
  hide-footer=true
  centered=true
)

  //- Modal content
  b-row(class='justify-content-md-center' v-if='loginModalShown')
    b-col(class='mt-3 text-right' cols='11')
      b-btn(variant='link' @click='loginModalShown = false')
        font-awesome-icon(class='fa-2x' icon='times' color='black')

    b-col(cols='10')
      h4
        | Sign in

      //- Input username or email
      b-form-group(class='mt-4' label='Login' label-for='usernameOrEmail')
        b-form-input#usernameOrEmail(required type='text' v-model='usernameOrEmail')

      //- Input password
      b-form-group(class='mt-4' label='Password' label-for='password')
        b-form-input#password(required type='password' v-model='password')

      p(class='text-center')
        u(class='c-pointer' @click='resetPasswordModalShow()')
          | Don't remember your password?

      b-btn.mt-4.mb-3(block variant='success' @click='login(usernameOrEmail, password)')
        | Sign in

      b-alert(v-if='loginError' show variant='danger')
        | {{ loginError }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import axios from 'axios'

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
      password: null
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    })
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    login (usernameOrEmail, password) {
      try {
        axios.post('/api/login', {
          email: usernameOrEmail,
          password
        })
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
      } catch (error) {
        console.log(error)
      }
    },
    resetPasswordModalShow () {
      this.$root.$emit('resetPasswordModalShow')
      this.loginModalShown = false
    }
  }
}
</script>
