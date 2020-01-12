<template>
  <b-modal
    :visible="showModal"
    :title="textStatus"
    size="md"
    hide-footer="hide-footer"
    hide-header="hide-header"
    centered="centered"
    @hide="onClose"
  >
    <b-row v-if="!resetSuccess" class="ml-3 mr-3">
      <b-col class="mt-4 mb-3" cols="8">
        <h4>
          Reset password
        </h4>
      </b-col>

      <b-col class="ml-auto text-right" cols="2">
        <button class="close-button" @click="onClose">
          <font-awesome-icon icon="times" />
        </button>
      </b-col>

      <b-col class="mt-2" cols="12">
        <b-form-group label="Email" label-for="email">
          <b-form-input
            id="email"
            v-model="email"
            v-model.trim.lazy="$v.email.$model"
            required="required"
            type="text"
            :class="{ 'form-error': $v.email.$error, 'form-success': !$v.email.$error && email }"
          />
        </b-form-group>
      </b-col>

      <b-col class="mt-2 mb-3" cols="12">
        <b-btn block="block" variant="success" @click="resetPassword">
          Reset password
        </b-btn>
      </b-col>

      <b-col class="mt-2" cols="12">
        <b-alert v-if="error" show="show" variant="danger">
          {{ error }}
        </b-alert>
      </b-col>
    </b-row>

    <b-row v-if="resetSuccess" class="ml-3 mr-3">
      <b-col class="ml-auto text-right" cols="2">
        <b-button class="close-button" size="sm" variant="link" @click="onClose">
          <font-awesome-icon class="fa-2x" icon="times" />
        </b-button>
      </b-col>

      <b-col class="mt-4" cols="12">
        <p>
          Check your email
        </p>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import Account from '@/services/api/account'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'TheResetPasswordModal',
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      error: '',
      textStatus: '',

      email: '',
      resetSuccess: ''
    }
  },
  methods: {
    resetPassword() {
      if (this.email && !this.$v.email.$error) {
        Account.resetPassword(this.email).then(response => {
          if (response.status === 200) {
            this.resetSuccess = true
            this.clearInputs()
            this.textStatus = 'Email has been sent'
          } else if (response.status === 404) {
            this.textStatus = 'Error'
            this.error = 'There is no user registered with that email address.'
          } else {
            this.textStatus = 'Error'
            this.error = 'Try later.'
          }
        })
      }
    },
    clearInputs() {
      this.email = ''
      this.resetSuccess = ''
    },
    onClose() {
      this.$emit('close')
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
  border-color: map-get($colors, 'green');
}
</style>
