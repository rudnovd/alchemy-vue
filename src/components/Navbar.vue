<template lang='pug'>
  b-container
    b-navbar-brand(to='/') Home

    b-navbar-toggle(class='ml-auto' target='nav_collapse')

    b-collapse(id='#nav_collapse' is-nav)
      b-navbar-nav(class='ml-auto')
        b-btn(
          class='text-white'
          v-if='!isLoggedIn'
          variant='link'
          @click='loginModalShow'
        ) Sign in

        b-btn(
          class='text-white'
          v-if='!isLoggedIn'
          variant='link'
          @click='registrationModalShow'
        ) Sign up

        b-nav-item-dropdown(v-if='isLoggedIn' :text='username' right)
          b-dropdown-item(to='/game') Game

          template(v-if='isLoggedIn && isAdmin')
            b-dropdown-divider
            b-dropdown-item(to='/admin/dashboard') Dashboard
            b-dropdown-item(to='/admin/elements') Elements
            b-dropdown-item(to='/admin/recipes') Recipes
            b-dropdown-item(to='/admin/users') Users

          b-dropdown-divider
          b-dropdown-item(v-if='!isLoggedIn' @click='loginModalShow()') Log in
          b-dropdown-item(v-if='isLoggedIn' @click='logout()') Logout

    LoginModal
    RegistrationModal
    ResetPasswordModal
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoginModal from '@/components/navbar/LoginModal.vue'

import RegistrationModal from '@/components/navbar/RegistrationModal.vue'

import ResetPasswordModal from '@/components/navbar/ResetPasswordModal.vue'

import { getLogout } from '@/js/api/authentication'

export default {
  components: {
    LoginModal,
    RegistrationModal,
    ResetPasswordModal
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isAdmin: 'user/isAdmin',
      username: 'user/username'
    })
  },
  methods: {
    ...mapActions({
      clearUser: 'user/clearUser'
    }),
    logout () {
      getLogout().then(response => {
        if (response.status === 200 || response.status === 304) {
          this.$router.push({ path: '/' })
          this.clearUser()
        }
      })
    },
    loginModalShow () {
      this.$root.$emit('loginModalShow')
    },
    registrationModalShow () {
      this.$root.$emit('registrationModalShow')
    }
  }
}
</script>

<style lang='scss'>
.navbar {
  min-height: 5vh;
  background: #222;
  color: #9d9d9d;

  .navbar-nav.ml-auto {
    a.dropdown-item {
      color: color('dark');
    }
    a.router-link-active {
      color: color('alchemy-green');
      background: rgb(230, 230, 230);
      font-weight: bold;
    }
  }
}
</style>
