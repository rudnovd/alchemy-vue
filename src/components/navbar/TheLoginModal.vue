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
        <h4>Sign in</h4>
      </b-col>

      <b-col class="ml-auto text-right" cols="2">
        <button class="close-button" @click="onClose">
          <font-awesome-icon icon="times" />
        </button>
      </b-col>

      <b-col class="mt-2" cols="12">
        <b-form-group label="Email or username" label-for="usernameOrEmail">
          <b-form-input
            id="usernameOrEmail"
            v-model="usernameOrEmail"
            required="required"
            type="text"
            autocomplete="off"
            @keyup.enter="login"
          />
        </b-form-group>
      </b-col>

      <b-col class="mt-2" cols="12">
        <b-form-group label="Password" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            required="required"
            type="password"
            autocomplete="off"
            @keyup.enter="login"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-form-checkbox v-model="rememberLogin" name="remember-login-checkbox">
          Remember me
        </b-form-checkbox>
      </b-col>

      <b-col class="mt-3" cols="12">
        <p class="dont-remember-password" @click="resetPasswordModalShow">
          Don't remember your password?
        </p>
      </b-col>

      <b-col class="mt-2 mb-3" cols="12">
        <b-btn block="block" variant="success" @click="onLogin">
          Sign in
        </b-btn>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheLoginModal',
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      usernameOrEmail: '',
      password: '',
      rememberLogin: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      login: 'user/login'
    }),
    onLogin() {
      if (this.usernameOrEmail && this.password) {
        this.login({
          usernameOrEmail: this.usernameOrEmail,
          password: this.password,
          rememberLogin: this.rememberLogin
        }).then(() => {
          if (!this.user.state.error) {
            this.onClose()
            this.clearInputs()
            this.$router.push({ path: '/game' })
          }
        })
      }
    },
    clearInputs() {
      this.usernameOrEmail = ''
      this.password = ''
      this.rememberLogin = false
    },
    resetPasswordModalShow() {
      this.$emit('openAnotherModal')
      this.onClose()
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.close-button {
  background: none;
  border: none;
  outline: none;
  color: black;
  font-size: 1.3em;

  &:hover {
    opacity: 0.8;
  }
}

.dont-remember-password {
  text-align: center;
  color: #6c757d;
  cursor: pointer;
  text-decoration: underline;
}
</style>
