<template>
  <b-container>
    <b-navbar-brand to='/'>
      <img src='@/assets/logo.svg' heigth='50px' width='50px'/>Home
    </b-navbar-brand>

    <b-btn
      class='nav-button opened-recipes-button ml-auto'
      id='opened-recipes-button'
      v-if='$route.path === "/game"'
      title='Recipes'
    >
      <font-awesome-icon class='nav-icon' icon='scroll' @click='openedRecipesModalShow'/>
    </b-btn>

    <b-navbar-nav>
      <b-btn
        class='text-white'
        v-if='!user.isLoggedIn && !loadingLogin'
        variant='link'
        @click='loginModalShow'
      >
        Sign in
      </b-btn>

      <b-btn
        class='text-white'
        v-if='!user.isLoggedIn && !loadingLogin'
        variant='link'
        @click='registrationModalShow'
      >
        Sign up
      </b-btn>

      <b-nav-item-dropdown v-if='user.isLoggedIn' :text='user.username' left='left'>
        <b-dropdown-item to='/game'>
          Game
        </b-dropdown-item>

        <template v-if='user.isLoggedIn && user.role === "Admin"'>
          <b-dropdown-divider/>

          <b-dropdown-item to='/admin/dashboard'>
            Dashboard
          </b-dropdown-item>

          <b-dropdown-item to='/admin/elements'>
            Elements
          </b-dropdown-item>

          <b-dropdown-item to='/admin/recipes'>
            Recipes
          </b-dropdown-item>

          <b-dropdown-item to='/admin/users'>
            Users
          </b-dropdown-item>
        </template>

        <b-dropdown-divider />

        <b-dropdown-item v-if='user.isLoggedIn' @click='logout()'>
          Logout
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <LoginModal />
    <RegistrationModal />
    <ResetPasswordModal />
    <OpenedRecipesModal />
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoginModal from '@/components/navbar/LoginModal.vue'

import RegistrationModal from '@/components/navbar/RegistrationModal.vue'

import ResetPasswordModal from '@/components/navbar/ResetPasswordModal.vue'

import OpenedRecipesModal from '@/components/game/recipes/OpenedRecipesModal.vue'

import { getLogin, getLogout } from '@/js/api/authentication'

export default {
  components: {
    LoginModal,
    RegistrationModal,
    ResetPasswordModal,
    OpenedRecipesModal
  },
  created () {
    if (!this.isLoggedIn) {
      this.loadingLogin = true
      getLogin().then(response => {
        this.loadingLogin = false
        if (response.data.user) {
          this.setUser(response.data.user)
        }
      })
    }
  },
  data () {
    return {
      loadingLogin: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      deleteUser: 'user/deleteUser',
      setUser: 'user/setUser'
    }),
    logout () {
      getLogout().then(response => {
        if (response.status === 200 || response.status === 304) {
          this.clearUser()
          this.$router.push({ path: '/' })
        }
      })
    },
    loginModalShow () {
      this.$root.$emit('loginModalShow')
    },
    registrationModalShow () {
      this.$root.$emit('registrationModalShow')
    },
    openedRecipesModalShow () {
      this.$root.$emit('openedRecipesModalShow')
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

.nav-button {
  color: white;
  background: none;
  border: none;
  padding: 0;
  width: 40px;
  height: 40px;
}

.nav-icon {
  width: 80% !important;
  height: 80%;
}

.opened-recipes-button {
  margin-right: 50px;
}

.navbar-nav .dropdown-menu {
  position: absolute;
}
</style>
