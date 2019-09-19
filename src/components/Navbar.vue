<template>
  <b-container>
    <b-navbar-brand to='/'>
      <img src='@/assets/logo.svg' heigth='50px' width='50px'/>Home
    </b-navbar-brand>

    <button class='icon opened-recipes-button ml-auto' v-if='user.isLoggedIn && $route.path === "/game"'>
      <font-awesome-icon
        id='opened-recipes-button'
        title='Recipes'
        icon='scroll'
        @click='openedRecipesModalShow'
      />
    </button>

    <button class='icon' v-if='user.isLoggedIn && $route.path === "/game"'>
      <font-awesome-icon
        v-if='!fullscreenEnabled'
        title='Enable fullscreen'
        icon='expand-arrows-alt'
        @click='enableFullscreen'
      />
      <font-awesome-icon
        v-if='fullscreenEnabled'
        title='Disable fullscreen'
        icon='compress-arrows-alt'
        @click='disableFullScreen'
      />
    </button>

    <b-navbar-nav>
      <b-btn
        class='text-white'
        v-if='!user.isLoggedIn && !user.state.isLoading'
        variant='link'
        @click='loginModalShow'
      >
        Sign in
      </b-btn>

      <b-btn
        class='text-white'
        v-if='!user.isLoggedIn && !user.state.isLoading'
        variant='link'
        @click='registrationModalShow'
      >
        Sign up
      </b-btn>

      <b-nav-item-dropdown v-if='user.isLoggedIn && !user.state.isLoading' :text='user.username' left='left'>
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

export default {
  components: {
    LoginModal,
    RegistrationModal,
    ResetPasswordModal,
    OpenedRecipesModal
  },
  created () {
    if (!this.user.isLoggedIn) {
      this.getLogin()
    }
  },
  data () {
    return {
      fullscreenEnabled: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      getLogout: 'user/getLogout',
      getLogin: 'user/getLogin'
    }),
    logout () {
      this.getLogout().then(() => {
        this.$router.push({ path: '/' })
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
    },
    enableFullscreen () {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        document.documentElement.webkitRequestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen()
      }
      this.fullscreenEnabled = true
    },
    disableFullScreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      this.fullscreenEnabled = false
    }
  }
}
</script>

<style lang='scss'>
@media screen and (max-width: 767px) {
  .navbar {
    height: 30px !important;
  }
}

.navbar {
  height: 56px;
  background: rgb(33, 33, 33);
  color: rgb(157, 157, 157);
  margin-bottom: 10px;

  .navbar-nav.ml-auto {
    a.dropdown-item {
      color: black;
    }
    a.router-link-active {
      color: ap-get($colors, 'alchemy-green');
      background: rgb(230, 230, 230);
      font-weight: bold;
    }
  }

  .icon {
    color: white;
    width: 50px;
    height: 40px;
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin-right: 10px;
  }
}

.navbar-nav .dropdown-menu {
  position: absolute;
}
</style>
