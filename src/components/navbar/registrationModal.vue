<template lang='pug'>
b-modal#registrationModal(
  v-model='registrationModalShown'
  size='md'
  no-close-on-backdrop=true
  hide-header=true
  hide-footer=true
  centered=true
)

  //- Modal content
  b-row(class='justify-content-md-center' v-if='registrationModalShown')
    b-col(class='mt-3 text-right' cols='11')
      b-btn(variant='link' @click='registrationModalShown = false')
        font-awesome-icon(class='fa-2x' icon='times' color='black')

    b-col(cols='10')
      h4
        | Sign up

      //- Input username
      b-form-group(class='mt-4' label='Username' label-for='username')
        b-form-input#username(required type='text' v-model='username')

      //- Input username
      b-form-group(class='mt-4' label='Email' label-for='email')
        b-form-input#email(required type='text' v-model='email')

      //- Input password
      b-form-group(class='mt-4' label='Password' label-for='password')
        b-form-input#password(required type='password' v-model='password')

      b-btn.mt-4.mb-3(block variant='success' @click='registration()')
        | Sign up

      b-alert(v-if='registrationError' show variant='danger')
        | {{ registrationError }}
</template>

<script>
import { mapActions } from 'vuex'

import { postAccount } from '@/js/api/account'

export default {
  name: 'registrationModal',
  mounted () {
    this.$root.$on('registrationModalShow', () => {
      this.registrationModalShown = true
    })
  },
  data () {
    return {
      registrationModalShown: false,

      registrationError: null,

      username: null,
      email: null,
      password: null
    }
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    registration () {
      postAccount(this.username, this.email, this.password).then(response => {
        if (response.status === 200) {
          console.log('registration success')
          this.$router.push({ path: '/game' })
        }
      })
    }
  }
}
</script>
