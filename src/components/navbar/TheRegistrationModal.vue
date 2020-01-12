<template>
  <b-modal
    :visible="showModal"
    size="md"
    hide-header="hide-header"
    hide-footer="hide-footer"
    centered="centered"
    @hide="onClose"
  >
    <b-row class="ml-3 mr-3">
      <b-col class="mt-4 mb-3" cols="8">
        <h4>
          Sign up
        </h4>
      </b-col>

      <b-col class="ml-auto text-right" cols="2">
        <button class="close-button" @click="onClose">
          <font-awesome-icon icon="times" />
        </button>
      </b-col>

      <b-col class="mt-3" cols="12">
        <b-form-group label="Username" label-for="registrationUsername">
          <b-form-input
            id="registrationUsername"
            v-model="username"
            v-model.trim.lazy="$v.username.$model"
            required="required"
            type="text"
            autocomplete="off"
            :class="{ 'form-error': $v.username.$error, 'form-success': !$v.username.$error && username }"
          />
        </b-form-group>
      </b-col>

      <b-col class="mt-2" cols="12">
        <b-form-group label="Email" label-for="registrationEmail">
          <b-form-input
            id="registrationEmail"
            v-model="email"
            v-model.trim.lazy="$v.email.$model"
            required="required"
            type="text"
            autocomplete="off"
            :class="{ 'form-error': $v.email.$error, 'form-success': !$v.email.$error && email }"
          />
        </b-form-group>
      </b-col>

      <b-col class="mt-2" cols="12">
        <b-form-group label="Password" label-for="registrationPassword">
          <b-form-input
            id="registrationPassword"
            v-model="password"
            v-model.trim.lazy="$v.password.$model"
            required="required"
            type="password"
            autocomplete="off"
            :class="{ 'form-error': $v.password.$error, 'form-success': !$v.password.$error && password }"
          />
          <small v-show="$v.password.$error" class="error">
            password must contain at least 4 characters
          </small>
        </b-form-group>
      </b-col>

      <b-col class="mt-2 mb-3" cols="12">
        <vue-recaptcha ref="recaptcha" :sitekey="captchaKey" size="invisible" @verify="onRegister" @expired="onExpired">
          <b-btn block="block" variant="success" type="submit">
            Sign up
          </b-btn>
        </vue-recaptcha>
      </b-col>

      <b-col v-if="user.state.error" cols="12">
        <b-alert show="show" variant="danger">
          {{ user.state.error }}
        </b-alert>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'TheRegistrationModal',
  components: {
    VueRecaptcha
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',

      captchaKey: process.env.VUE_APP_RECAPTCHA_KEY
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      register: 'user/register'
    }),
    validation() {
      if (!this.username || !this.email || !this.password) return false
      if (this.$v.username.$error || this.$v.email.$error || this.$v.password.$error) return false
      return true
    },
    onRegister(recaptchaToken) {
      if (this.validation()) {
        this.register({
          email: this.email,
          username: this.username,
          password: this.password,
          recaptchaToken
        }).then(response => {
          if (!user.state.error) {
            this.clearInputs()
            this.$router.push({ path: '/game' })
          }
        })
      }
    },
    clearInputs() {
      this.email = ''
      this.username = ''
      this.password = ''
    },
    onClose() {
      this.$emit('close')
    },
    onExpired() {
      this.$refs.recaptcha.reset()
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

<style lang="scss" scoped>
.form-error {
  border-color: rgb(255, 62, 32);
}

.form-success {
  border-color: map-get($colors, 'green');
}
</style>
