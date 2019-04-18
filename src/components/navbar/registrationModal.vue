<template lang='pug'>
b-modal(
  id='registrationModal'
  v-model='registrationModalShown'
  size='md'
  no-close-on-backdrop=true
  hide-header=true
  hide-footer=true
  centered=true
)

  //- Modal content
  b-row(class='justify-content-md-center' v-if='registrationModalShown')
    b-col(class='text-right' cols='11')
      font-awesome-icon(icon='times' color='gray' @click='registrationModalShown = false')

    b-col(cols='10')
      h4
        | Sign up

      //- Input username
      b-form-group(class='mt-4' label='Username' label-for='username')
        b-form-input(id='username' required type='text' v-model='username')

      //- Input username
      b-form-group(class='mt-4' label='Email' label-for='email')
        b-form-input(
          id='email'
          required
          type='text'
          v-model='email'
          v-model.trim.lazy='$v.email.$model'
          :class="{ 'form-group--error': $v.email.$error, 'form-group--success': $v.email.email && this.email}"
        )

      //- Input password
      b-form-group(class='mt-4' label='Password' label-for='password')
        b-form-input(
          id='password'
          required
          type='password'
          v-model='password'
          v-model.trim.lazy='$v.password.$model'
          :class="{ 'form-group--error': $v.password.$error, 'form-group--success': !$v.password.$error && this.password}"
        )

      b-btn(class='mt-4 mb-3' block variant='success' @click='registration()')
        | Sign up

      b-alert(v-if='registrationError' show variant='danger')
        | {{ registrationError }}
</template>

<script>
import { mapActions } from 'vuex'

import { postAccount } from '@/js/api/account'

import { required, email, minLength } from 'vuelidate/lib/validators'

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
      if (!this.$v.email.$error && this.email && !this.$v.password.$error && this.password) {
        return true
      }
    },
    registration () {
      if (this.validation() === true) {
        postAccount(this.email, this.username, this.password).then(response => {
          if (response.status === 200) {
            console.log('registration success')
            this.$router.push({ path: '/game' })
          }
        })
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: #ff3e20
}

.form-group--error {
  border-color: #ff3e20
}

.form-group--success {
  border-color: color('alchemy-green');
}
</style>
