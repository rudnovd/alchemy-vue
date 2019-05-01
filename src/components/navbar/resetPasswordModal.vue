<template lang='pug'>
b-modal(
  id='resetPasswordModal'
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
      font-awesome-icon(icon='times' color='gray' @click='resetPasswordModalShown = false')

    b-col(cols='10' v-if='!resetPasswordSuccess')
      h4
        | Reset password

      //- Input username or email
      b-form-group(class='mt-4' label='Email' label-for='email')
        b-form-input(id='email' required type='text' v-model='email' v-model.trim.lazy='$v.email.$model')

      b-btn(class='mt-4 mb-3' block variant='success' @click='resetPassword()')
        | Reset

      b-alert(v-if='resetPasswordError' show variant='danger')
        | {{ resetPasswordError }}

    b-col(cols='10' v-if='resetPasswordSuccess')
      p Check your email

      b-alert(v-if='resetPasswordError' show variant='danger')
        | {{ resetPasswordError }}
</template>

<script>
import { putResetPassword } from '@/js/api/account'

import { required, email } from 'vuelidate/lib/validators'

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

      email: null
    }
  },
  methods: {
    validation () {
      if (this.email && !this.$v.email.$error) {
        return true
      }
    },
    resetPassword () {
      if (this.validation() === true) {
        putResetPassword(this.email).then(response => {
          if (response.status === 200) {
            this.resetPasswordSuccess = true
          } else if (response.status === 404) {
            this.resetPasswordError = 'There is no user registered with that email address'
          }
        })
      }
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
