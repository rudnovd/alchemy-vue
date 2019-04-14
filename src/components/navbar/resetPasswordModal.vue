<template lang='pug'>
b-modal#resetPasswordModal(
  v-model='resetPasswordModalShown'
  size='md'
  no-close-on-backdrop=true
  hide-header=true
  hide-footer=true
  centered=true
)

  //- Modal content
  b-row(class='justify-content-md-center' v-if='resetPasswordModalShown')
    b-col(class='mt-3 text-right' cols='11')
      b-btn(variant='link' @click='resetPasswordModalShown = false')
        font-awesome-icon(class='fa-2x' icon='times' color='black')

    b-col(cols='10' v-if='!resetPasswordSuccess')
      h4
        | Reset password

      //- Input username or email
      b-form-group(class='mt-4' label='Email' label-for='usernameOrEmail')
        b-form-input#usernameOrEmail(required type='text' v-model='usernameOrEmail')

      b-btn.mt-4.mb-3(block variant='success' @click='resetPassword(usernameOrEmail)')
        | Reset

      b-alert(v-if='resetPasswordError' show variant='danger')
        | {{ resetPasswordError }}

    b-col(cols='10' v-if='resetPasswordSuccess')
      p Check your email

      b-alert(v-if='resetPasswordError' show variant='danger')
        | {{ resetPasswordError }}
</template>

<script>
import { postResetPassword } from '@/js/api/account'

export default {
  name: 'resetPasswordModal',
  mounted () {
    this.$root.$on('resetPasswordModalShow', () => {
      this.resetPasswordModalShown = true
    })
  },
  data () {
    return {
      resetPasswordModalShown: false,

      resetPasswordSuccess: null,
      resetPasswordError: null,

      usernameOrEmail: null
    }
  },
  methods: {
    resetPassword (usernameOrEmail, password) {
      postResetPassword(usernameOrEmail).then(response => {
        if (response.status === 200) {
          this.resetPasswordSuccess = true
        } else {
          this.resetPasswordError = true
        }
      })
    }
  }
}
</script>
