<template>
  <b-modal v-model="showModal" size="md" hide-header="hide-header" hide-footer="hide-footer" centered="centered">
    <b-row class="ml-3 mr-3">
      <b-col class="mt-4" cols="8">
        <h4>
          Sign in
        </h4>
      </b-col>

      <b-col class="ml-auto text-right" cols="2">
        <button class="close-button" @click="showModal = false">
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
            :autocomplete="autocomplete"
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
            :autocomplete="autocomplete"
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
        <p class="text-center text-muted">
          <u @click="resetPasswordModalShow()">
            Don't remember your password?
          </u>
        </p>
      </b-col>

      <b-col class="mt-2 mb-3" cols="12">
        <b-btn block="block" variant="success" @click="login">
          Sign in
        </b-btn>
      </b-col>

      <b-col v-if="error" cols="12">
        <b-alert show="show" variant="danger">
          {{ error }}
        </b-alert>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import User from '@/services/api/user'

export default {
  name: 'TheLoginModal',
  data() {
    return {
      showModal: false,
      error: '',

      usernameOrEmail: '',
      password: '',
      rememberLogin: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    autocomplete() {
      if (this.rememberLogin) {
        return 'on'
      } else {
        return 'off'
      }
    }
  },
  mounted() {
    this.$root.$on('loginModalShow', () => {
      this.showModal = true
    })
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    validation() {
      if (!this.usernameOrEmail || !this.password) {
        return false
      }

      return true
    },
    login() {
      if (this.validation() === true) {
        User.login(this.usernameOrEmail, this.password, this.rememberLogin).then(response => {
          if (response.status === 200) {
            this.showModal = false
            this.setUser(response.data.user)
            this.clearInputs()
            this.$router.push({ path: '/game' })
          } else {
            this.error = response.data.error
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
      this.$root.$emit('resetPasswordModalShow')
      this.showModal = false
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
</style>
