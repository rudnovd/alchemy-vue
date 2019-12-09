<template>
  <b-modal v-model="showModal" size="md" hide-header="hide-header" hide-footer="hide-footer" centered="centered">
    <b-row class="ml-3 mr-3">
      <b-col class="mt-4" cols="8">
        <h4>
          Sign up
        </h4>
      </b-col>

      <b-col class="ml-auto text-right" cols="2">
        <button class="close-button" @click="showModal = false">
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
          <p v-show="$v.password.$error" class="error">
            password must contain at least 4 characters
          </p>
        </b-form-group>
      </b-col>

      <b-col class="mt-2 mb-3" cols="12">
        <b-btn block="block" variant="success" @click="registration">
          Sign up
        </b-btn>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import User from '@/services/api/user'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      showModal: false,

      email: '',
      username: '',
      password: ''
    }
  },
  mounted() {
    this.$root.$on('registrationModalShow', () => {
      this.showModal = true
    })
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),
    validation() {
      if (!this.username || !this.email || !this.password) {
        return false
      }

      if (this.$v.username.$error || this.$v.email.$error || this.$v.password.$error) {
        return false
      }

      return true
    },
    registration() {
      if (this.validation() === true) {
        User.register(this.email, this.username, this.password).then(response => {
          if (response.status === 200) {
            this.showModal = false
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
.error {
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: rgb(255, 62, 32);
}

.form-error {
  border-color: rgb(255, 62, 32);
}

.form-success {
  border-color: map-get($colors, 'alchemy-green');
}

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
